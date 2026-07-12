import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT_DIR = path.resolve(__dirname, '..')
export const DATA_DIR = path.join(ROOT_DIR, 'data')
export const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads')
export const CONTENT_FILE = path.join(DATA_DIR, 'content.json')

export function ensureDirs() {
  for (const dir of [DATA_DIR, UPLOADS_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  }
}

export function contentExists() {
  return fs.existsSync(CONTENT_FILE)
}

export function loadContent() {
  if (!contentExists()) return null
  const raw = fs.readFileSync(CONTENT_FILE, 'utf8')
  return JSON.parse(raw)
}

export function saveContent(content) {
  ensureDirs()
  const payload = {
    ...content,
    updatedAt: new Date().toISOString(),
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(payload, null, 2), 'utf8')
  return payload
}
