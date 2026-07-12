/** Max edge length after resize — keeps retina quality without huge payloads */
const MAX_DIMENSION = 1920
/** JPEG/WebP quality — high visual fidelity */
const OUTPUT_QUALITY = 0.82
/** Skip compression for tiny files already under this size */
const SKIP_IF_UNDER_BYTES = 280 * 1024

const RASTER_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp'])

function readFileAsDataUrlRaw(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to decode image'))
    img.src = src
  })
}

function canvasToDataUrl(
  canvas: HTMLCanvasElement,
  mime: string,
  quality: number,
): string {
  try {
    return canvas.toDataURL(mime, quality)
  } catch {
    return canvas.toDataURL('image/jpeg', quality)
  }
}

/**
 * Compress / resize an image file client-side before sending to the CMS.
 * SVG / GIF are kept as-is (vector / animation).
 * Raster images are capped at MAX_DIMENSION on the long edge and encoded as
 * WebP (or JPEG fallback) at high quality.
 */
export async function compressImageFile(file: File): Promise<string> {
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return readFileAsDataUrlRaw(file)
  }

  if (!RASTER_TYPES.has(file.type) && !file.type.startsWith('image/')) {
    return readFileAsDataUrlRaw(file)
  }

  const originalDataUrl = await readFileAsDataUrlRaw(file)

  // Already small enough and not enormous dimensions — still normalize large dims
  const img = await loadImage(originalDataUrl)
  const { naturalWidth: width, naturalHeight: height } = img
  if (!width || !height) return originalDataUrl

  const longest = Math.max(width, height)
  const needsResize = longest > MAX_DIMENSION
  const needsCompress = file.size > SKIP_IF_UNDER_BYTES || needsResize

  if (!needsCompress && file.type === 'image/webp') {
    return originalDataUrl
  }

  const scale = needsResize ? MAX_DIMENSION / longest : 1
  const targetW = Math.max(1, Math.round(width * scale))
  const targetH = Math.max(1, Math.round(height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')
  if (!ctx) return originalDataUrl

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, targetW, targetH)

  // Prefer WebP; fall back to JPEG if unsupported
  let output = canvasToDataUrl(canvas, 'image/webp', OUTPUT_QUALITY)
  if (!output.startsWith('data:image/webp')) {
    output = canvasToDataUrl(canvas, 'image/jpeg', OUTPUT_QUALITY)
  }

  // If compression somehow grew the payload, keep the better of the two when no resize
  if (!needsResize && output.length >= originalDataUrl.length) {
    return originalDataUrl
  }

  return output
}

/** @deprecated Prefer compressImageFile — kept for callers that only need a raw read */
export async function readFileAsDataUrl(file: File): Promise<string> {
  return compressImageFile(file)
}
