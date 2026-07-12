import './env.js'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import {
  ensureDirs,
  loadContent,
  saveContent,
  contentExists,
  UPLOADS_DIR,
  DATA_DIR,
  ROOT_DIR,
} from './lib/store.js'
import { createToken, requireAuth, verifyCredentials } from './lib/auth.js'
import { materializeDataUrls } from './lib/media.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 8787)
const HOST = process.env.HOST || '0.0.0.0'

ensureDirs()

const app = express()
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
app.use(express.json({ limit: '60mb' }))
app.use('/uploads', express.static(UPLOADS_DIR))

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.bin'
      const safeExt = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'].includes(ext)
        ? ext
        : '.bin'
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${safeExt}`)
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image uploads are allowed'))
  },
})

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'salezeus-cms',
    contentReady: contentExists(),
    dataDir: DATA_DIR,
  })
})

/** Public: full CMS payload for the marketing site */
app.get('/api/public/content', (_req, res) => {
  const content = loadContent()
  if (!content) {
    res.status(404).json({ error: 'Content not seeded yet' })
    return
  }
  res.json(content)
})

app.post('/api/admin/auth/login', (req, res) => {
  const email = String(req.body?.email || '')
  const password = String(req.body?.password || '')
  if (!verifyCredentials(email, password)) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }
  const token = createToken(email.trim().toLowerCase())
  res.json({ token, email: email.trim().toLowerCase() })
})

app.get('/api/admin/auth/me', requireAuth, (req, res) => {
  res.json({ email: req.adminEmail })
})

app.get('/api/admin/content', requireAuth, (_req, res) => {
  const content = loadContent()
  if (!content) {
    res.status(404).json({ error: 'Content not seeded yet', empty: true })
    return
  }
  res.json(content)
})

app.put('/api/admin/content', requireAuth, (req, res) => {
  try {
    const incoming = req.body
    if (!incoming || typeof incoming !== 'object') {
      res.status(400).json({ error: 'Invalid content body' })
      return
    }
    const materialized = materializeDataUrls(incoming)
    const saved = saveContent(materialized)
    res.json(saved)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to save content' })
  }
})

/** First-time bootstrap: accept seed from the admin frontend */
app.post('/api/admin/content/seed', requireAuth, (req, res) => {
  try {
    if (contentExists() && !req.body?.force) {
      res.status(409).json({ error: 'Content already exists. Pass force:true to overwrite.' })
      return
    }
    const materialized = materializeDataUrls(req.body?.content ?? req.body)
    const saved = saveContent(materialized)
    res.json(saved)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to seed content' })
  }
})

app.post('/api/admin/content/reset', requireAuth, (req, res) => {
  try {
    const seed = req.body?.content
    if (!seed || typeof seed !== 'object') {
      res.status(400).json({
        error: 'Reset requires a seed content body from the admin client',
      })
      return
    }
    const materialized = materializeDataUrls(seed)
    const saved = saveContent(materialized)
    res.json(saved)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to reset content' })
  }
})

app.post('/api/admin/uploads', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' })
    return
  }
  res.json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
    size: req.file.size,
    mime: req.file.mimetype,
  })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(400).json({ error: err.message || 'Request failed' })
})

/** Production: serve Vite build (React SPA) from the same Node process */
const DIST_DIR = path.resolve(ROOT_DIR, '..', 'dist')
const serveSpa =
  process.env.SERVE_SPA === '1' ||
  process.env.NODE_ENV === 'production' ||
  fs.existsSync(DIST_DIR)

if (serveSpa && fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, { index: false }))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      next()
      return
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
}

app.listen(PORT, HOST, () => {
  console.log(`Salezeus CMS API listening on http://localhost:${PORT}`)
  console.log(`Uploads: ${UPLOADS_DIR}`)
  console.log(`Data:    ${DATA_DIR}`)
  if (serveSpa && fs.existsSync(DIST_DIR)) {
    console.log(`SPA:     ${DIST_DIR}`)
  }
})
