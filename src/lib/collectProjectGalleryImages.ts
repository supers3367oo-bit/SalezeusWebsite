import type { ProjectDetail, ProjectVisual, ProjectWork } from '../types/projectDetail'

function addVisual(images: ProjectVisual[], seen: Set<string>, visual?: ProjectVisual) {
  if (!visual) return
  const key = `${visual.src}|${visual.alt}`
  if (seen.has(key)) return
  seen.add(key)
  images.push(visual)
}

function collectFromWork(images: ProjectVisual[], seen: Set<string>, work: ProjectWork) {
  switch (work.type) {
    case 'branding':
      addVisual(images, seen, work.primaryLogo)
      work.logoVariants.forEach((v) => addVisual(images, seen, v))
      work.stationery.forEach((v) => addVisual(images, seen, v))
      addVisual(images, seen, work.inContext)
      break
    case 'marketing':
      addVisual(images, seen, work.heroVisual)
      work.assets.forEach((v) => addVisual(images, seen, v))
      break
    case 'social':
      addVisual(images, seen, work.profilePreview)
      work.feedGrid.forEach((v) => addVisual(images, seen, v))
      work.postFormats.forEach((v) => addVisual(images, seen, v))
      break
    case 'web':
      addVisual(images, seen, work.homepage)
      addVisual(images, seen, work.responsivePair.desktop)
      addVisual(images, seen, work.responsivePair.mobile)
      work.keyPages.forEach((v) => addVisual(images, seen, v))
      break
    case 'apps':
      addVisual(images, seen, work.heroScreen)
      work.keyScreens.forEach((v) => addVisual(images, seen, v))
      break
    case 'consulting':
      break
  }
}

export function collectProjectGalleryImages(project: ProjectDetail): ProjectVisual[] {
  const images: ProjectVisual[] = []
  const seen = new Set<string>()

  addVisual(images, seen, {
    src: project.heroImage,
    alt: `${project.client} project hero`,
    aspect: '16/9',
  })

  collectFromWork(images, seen, project.work)
  return images
}

export function isPortraitVisual(visual: ProjectVisual) {
  return visual.aspect === '9/16' || visual.aspect === '4/5'
}
