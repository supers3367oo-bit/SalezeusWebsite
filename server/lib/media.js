import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { UPLOADS_DIR, ensureDirs } from './store.js'

const DATA_URL_RE = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/

function extForMime(mime) {
  switch (mime) {
    case 'image/jpeg':
      return '.jpg'
    case 'image/png':
      return '.png'
    case 'image/webp':
      return '.webp'
    case 'image/gif':
      return '.gif'
    case 'image/svg+xml':
      return '.svg'
    default:
      return '.bin'
  }
}

function persistDataUrl(dataUrl) {
  const match = DATA_URL_RE.exec(dataUrl)
  if (!match) return dataUrl
  ensureDirs()
  const mime = match[1]
  const buffer = Buffer.from(match[2], 'base64')
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${extForMime(mime)}`
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer)
  return `/uploads/${filename}`
}

/** Walk content tree and replace data:image URLs with /uploads/... files */
export function materializeDataUrls(value) {
  if (typeof value === 'string') {
    if (value.startsWith('data:image/')) return persistDataUrl(value)
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item) => materializeDataUrls(item))
  }
  if (value && typeof value === 'object') {
    const out = {}
    for (const [key, child] of Object.entries(value)) {
      out[key] = materializeDataUrls(child)
    }
    return out
  }
  return value
}
