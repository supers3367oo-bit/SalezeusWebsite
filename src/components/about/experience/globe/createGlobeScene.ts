import * as THREE from 'three'
import { CITY_MARKERS, REGIONS, type RegionMarker } from './locations'
import { createArcCurve, latLngToVector3, projectToScreen } from './geo'

const BLUE = 0x3258a4
const GOLD = 0xf0b80d

export type GlobeSceneState = {
  arcProgress: number
  globeScale: number
  cameraZ: number
  brightness: number
  markersOpacity: number
}

export type HoverPayload = {
  marker: RegionMarker
  screen: { x: number; y: number }
} | null

type CreateGlobeOptions = {
  lowPower: boolean
  reduceMotion: boolean
}

type HoverListener = (payload: HoverPayload) => void

export type GlobeSceneController = {
  dispose: () => void
  resize: () => void
  setState: (partial: Partial<GlobeSceneState>) => void
  setMouse: (nx: number, ny: number) => void
  setPaused: (paused: boolean) => void
  subscribeHover: (listener: HoverListener) => () => void
}

const DEFAULT_STATE: GlobeSceneState = {
  arcProgress: 0,
  globeScale: 0.8,
  cameraZ: 4.2,
  brightness: 0,
  markersOpacity: 0,
}

export function createGlobeScene(
  canvas: HTMLCanvasElement,
  options: CreateGlobeOptions
): GlobeSceneController {
  const { lowPower, reduceMotion } = options
  const segments = lowPower ? 24 : 40

  const state: GlobeSceneState = { ...DEFAULT_STATE }
  let paused = false
  let mouseX = 0
  let mouseY = 0
  let targetRotX = 0
  let targetRotY = 0
  let currentRotX = 0
  let currentRotY = 0
  let animationId = 0
  let hoveredRegion: RegionMarker | null = null
  const hoverListeners = new Set<HoverListener>()

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !lowPower,
    alpha: true,
    powerPreference: lowPower ? 'low-power' : 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.75))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(0, 0.15, DEFAULT_STATE.cameraZ)

  const globeGroup = new THREE.Group()
  scene.add(globeGroup)

  const autoRotateGroup = new THREE.Group()
  globeGroup.add(autoRotateGroup)

  const radius = 1.35

  const globeGeo = new THREE.SphereGeometry(radius, segments, segments)
  const globeMat = new THREE.MeshPhongMaterial({
    color: 0x0c0e14,
    emissive: 0x050608,
    emissiveIntensity: 0.4,
    shininess: 18,
    transparent: true,
    opacity: 0.95,
  })
  const globe = new THREE.Mesh(globeGeo, globeMat)
  autoRotateGroup.add(globe)

  const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(radius * 1.002, 18, 12))
  const wireMat = new THREE.LineBasicMaterial({
    color: 0x3258a4,
    transparent: true,
    opacity: 0.06,
  })
  const wireframe = new THREE.LineSegments(wireGeo, wireMat)
  autoRotateGroup.add(wireframe)

  const atmosphereGeo = new THREE.SphereGeometry(radius * 1.04, segments, segments)
  const atmosphereMat = new THREE.MeshBasicMaterial({
    color: BLUE,
    transparent: true,
    opacity: 0.04,
    side: THREE.BackSide,
  })
  const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat)
  autoRotateGroup.add(atmosphere)

  const starCount = lowPower ? 140 : 380
  const starPositions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    const r = 6 + Math.random() * 4
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    starPositions[i * 3 + 2] = r * Math.cos(phi)
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: lowPower ? 0.015 : 0.022,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  })
  const stars = new THREE.Points(starGeo, starMat)
  scene.add(stars)

  const ambient = new THREE.AmbientLight(0x404060, 0.55)
  scene.add(ambient)
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.65)
  keyLight.position.set(4, 2, 5)
  scene.add(keyLight)
  const rimLight = new THREE.PointLight(BLUE, 0.9, 20)
  rimLight.position.set(-3, 1, 2)
  scene.add(rimLight)
  const goldLight = new THREE.PointLight(GOLD, 0.45, 20)
  goldLight.position.set(3, -1, -2)
  scene.add(goldLight)

  type MarkerGroup = {
    region: RegionMarker
    group: THREE.Group
    pulse: THREE.Mesh
    hitArea: THREE.Mesh
  }

  const markerGroups: MarkerGroup[] = []
  const cityMeshes: THREE.Mesh[] = []

  REGIONS.forEach((region) => {
    const pos = latLngToVector3(region.lat, region.lng, radius * 1.008)
    const group = new THREE.Group()
    group.position.copy(pos)
    group.lookAt(pos.clone().multiplyScalar(2))

    const color = region.accent === 'blue' ? BLUE : GOLD
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 10, 10),
      new THREE.MeshBasicMaterial({ color })
    )
    core.position.z = 0.02
    group.add(core)

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 10, 10),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35,
      })
    )
    glow.position.z = 0.015
    group.add(glow)

    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.05, 0.075, 24),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
      })
    )
    pulse.position.z = 0.01
    group.add(pulse)

    const hitArea = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 8, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    )
    hitArea.userData.regionId = region.id
    group.add(hitArea)

    autoRotateGroup.add(group)
    markerGroups.push({ region, group, pulse, hitArea })
  })

  CITY_MARKERS.forEach((city) => {
    const pos = latLngToVector3(city.lat, city.lng, radius * 1.004)
    const parent = REGIONS.find((r) => r.id === city.parent)
    const color = parent?.accent === 'gold' ? GOLD : BLUE
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 6, 6),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 })
    )
    dot.position.copy(pos)
    dot.userData.regionId = city.parent
    autoRotateGroup.add(dot)
    cityMeshes.push(dot)
  })

  const turkeyPos = latLngToVector3(REGIONS[0].lat, REGIONS[0].lng, radius * 1.008)
  const syriaPos = latLngToVector3(REGIONS[1].lat, REGIONS[1].lng, radius * 1.008)
  const arcPoints = createArcCurve(turkeyPos, syriaPos, radius, 0.28)
  const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints)
  const arcMat = new THREE.LineBasicMaterial({
    color: BLUE,
    transparent: true,
    opacity: 0.85,
  })
  const arcLine = new THREE.Line(arcGeo, arcMat)
  autoRotateGroup.add(arcLine)

  const arcGlowGeo = new THREE.BufferGeometry().setFromPoints(arcPoints)
  const arcGlowMat = new THREE.LineBasicMaterial({
    color: GOLD,
    transparent: true,
    opacity: 0.25,
  })
  const arcGlow = new THREE.Line(arcGlowGeo, arcGlowMat)
  arcGlow.scale.setScalar(1.002)
  autoRotateGroup.add(arcGlow)

  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const notifyHover = (payload: HoverPayload) => {
    hoverListeners.forEach((fn) => fn(payload))
  }

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return
    const width = parent.clientWidth
    const height = parent.clientHeight
    if (width === 0 || height === 0) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const clock = new THREE.Clock()
  let pulsePhase = 0

  const render = () => {
    animationId = requestAnimationFrame(render)
    const elapsed = clock.getDelta()
    pulsePhase += elapsed

    if (!reduceMotion && !paused) {
      autoRotateGroup.rotation.y += elapsed * 0.12
    }

    targetRotX = mouseY * 0.18
    targetRotY = mouseX * 0.22
    const lerp = reduceMotion ? 1 : 0.04
    currentRotX += (targetRotX - currentRotX) * lerp
    currentRotY += (targetRotY - currentRotY) * lerp
    globeGroup.rotation.x = currentRotX
    globeGroup.rotation.y = currentRotY

    globeGroup.scale.setScalar(state.globeScale)
    camera.position.z = state.cameraZ

    const bright = state.brightness
    globeMat.opacity = 0.55 + bright * 0.4
    wireMat.opacity = 0.03 + bright * 0.06
    atmosphereMat.opacity = 0.02 + bright * 0.05
    starMat.opacity = 0.25 + bright * 0.35
    ambient.intensity = 0.35 + bright * 0.35
    keyLight.intensity = 0.4 + bright * 0.4

    markerGroups.forEach(({ group, pulse }, i) => {
      const scale = 1 + Math.sin(pulsePhase * 2.2 + i * 1.4) * 0.2
      pulse.scale.setScalar(scale)
      group.visible = state.markersOpacity > 0.01
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          if (child.geometry instanceof THREE.RingGeometry) {
            child.material.opacity = 0.2 + state.markersOpacity * 0.35
          } else if (child.geometry instanceof THREE.SphereGeometry && child.material.opacity > 0) {
            child.material.opacity = 0.3 + state.markersOpacity * 0.7
          }
        }
      })
    })

    cityMeshes.forEach((dot) => {
      dot.visible = state.markersOpacity > 0.2
      const mat = dot.material as THREE.MeshBasicMaterial
      mat.opacity = state.markersOpacity * 0.75
    })

    const visibleCount = Math.floor(arcPoints.length * state.arcProgress)
    if (visibleCount > 1) {
      const partial = arcPoints.slice(0, visibleCount)
      arcLine.geometry.dispose()
      arcLine.geometry = new THREE.BufferGeometry().setFromPoints(partial)
      arcGlow.geometry.dispose()
      arcGlow.geometry = new THREE.BufferGeometry().setFromPoints(partial)
      arcLine.visible = true
      arcGlow.visible = true
      arcMat.opacity = state.arcProgress * 0.85
      arcGlowMat.opacity = state.arcProgress * 0.3
    } else {
      arcLine.visible = false
      arcGlow.visible = false
    }

    if (!lowPower && !reduceMotion) {
      stars.rotation.y += elapsed * 0.008
    }

    renderer.render(scene, camera)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (lowPower) return
    const rect = canvas.getBoundingClientRect()
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    mouseX = pointer.x
    mouseY = pointer.y

    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(
      markerGroups.map((m) => m.hitArea),
      false
    )

    if (hits.length > 0) {
      const regionId = hits[0].object.userData.regionId as string
      const region = REGIONS.find((r) => r.id === regionId) ?? null
      if (region && region.id !== hoveredRegion?.id) {
        hoveredRegion = region
        const worldPos = new THREE.Vector3()
        markerGroups.find((m) => m.region.id === region.id)!.group.getWorldPosition(worldPos)
        const screen = projectToScreen(
          worldPos,
          camera,
          canvas.clientWidth,
          canvas.clientHeight
        )
        if (screen.visible) {
          notifyHover({ marker: region, screen: { x: screen.x, y: screen.y } })
        }
      }
    } else if (hoveredRegion) {
      hoveredRegion = null
      notifyHover(null)
    }
  }

  const onPointerLeave = () => {
    mouseX = 0
    mouseY = 0
    if (hoveredRegion) {
      hoveredRegion = null
      notifyHover(null)
    }
  }

  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerleave', onPointerLeave)

  resize()
  render()

  return {
    dispose: () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      renderer.dispose()
      globeGeo.dispose()
      globeMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      atmosphereGeo.dispose()
      atmosphereMat.dispose()
      starGeo.dispose()
      starMat.dispose()
      arcGeo.dispose()
      arcMat.dispose()
      arcGlowGeo.dispose()
      arcGlowMat.dispose()
    },
    resize,
    setState: (partial) => {
      Object.assign(state, partial)
    },
    setMouse: (nx, ny) => {
      mouseX = nx
      mouseY = ny
    },
    setPaused: (value) => {
      paused = value
    },
    subscribeHover: (listener) => {
      hoverListeners.add(listener)
      return () => hoverListeners.delete(listener)
    },
  }
}
