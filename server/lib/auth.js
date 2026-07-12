const tokens = new Map()

function requiredEnv(name) {
  const value = process.env[name]
  if (!value || !String(value).trim()) {
    throw new Error(
      `[auth] Missing ${name}. Set it in server/.env (see server/.env.example).`,
    )
  }
  return String(value).trim()
}

const ADMIN_EMAIL = requiredEnv('ADMIN_EMAIL').toLowerCase()
const ADMIN_PASSWORD = requiredEnv('ADMIN_PASSWORD')

if (ADMIN_PASSWORD === 'salezeus2026' || ADMIN_PASSWORD === 'change-me-to-a-strong-password') {
  console.warn(
    '[auth] WARNING: ADMIN_PASSWORD is still a placeholder. Change it in server/.env before production.',
  )
}

export function verifyCredentials(email, password) {
  return (
    String(email || '').trim().toLowerCase() === ADMIN_EMAIL &&
    String(password || '') === ADMIN_PASSWORD
  )
}

export function createToken(email) {
  const token = `sz_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
  tokens.set(token, { email, createdAt: Date.now() })
  return token
}

export function revokeToken(token) {
  tokens.delete(token)
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const session = token ? tokens.get(token) : null
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  req.adminEmail = session.email
  req.adminToken = token
  next()
}
