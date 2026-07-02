import * as THREE from 'three'

export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lng + 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

export function createArcCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  lift = 0.22
): THREE.Vector3[] {
  const startN = start.clone().normalize()
  const endN = end.clone().normalize()
  const mid = startN.clone().add(endN).normalize()
  const elevation = 1 + lift * start.distanceTo(end) / radius
  const midPoint = mid.multiplyScalar(radius * elevation)

  const curve = new THREE.CatmullRomCurve3(
    [start.clone(), midPoint, end.clone()],
    false,
    'catmullrom',
    0.5
  )

  return curve.getPoints(72)
}

export function projectToScreen(
  position: THREE.Vector3,
  camera: THREE.Camera,
  width: number,
  height: number
): { x: number; y: number; visible: boolean } {
  const projected = position.clone().project(camera)
  return {
    x: (projected.x * 0.5 + 0.5) * width,
    y: (-projected.y * 0.5 + 0.5) * height,
    visible: projected.z < 1,
  }
}
