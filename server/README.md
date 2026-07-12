# Salezeus CMS Server

Node.js API that stores all admin dashboard content and serves it to the public website.

## What it stores

- Team
- Services
- Projects
- Insights / articles
- Contact (email, WhatsApp, offices)
- Page copy (bilingual i18n strings)
- Site images / assets
- Home visibility flags (`showOnHome`)

Uploaded images (including data-URL uploads from the admin) are written under `server/uploads/` and referenced as `/uploads/...`.

## Setup

```bash
# from repo root
npm run server:install
cp server/.env.example server/.env
```

## Run

Terminal 1 — API:

```bash
npm run dev:server
```

Terminal 2 — Vite frontend:

```bash
npm run dev
```

Vite proxies `/api` and `/uploads` to `http://localhost:8787`.

## Auth

Credentials come from `server/.env` (never commit the real password):

```env
ADMIN_EMAIL=admin@salezeus.com
ADMIN_PASSWORD=your-strong-password
```

Copy from `.env.example` and set a strong password before running the server.

## Main endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/health` | no | Health check |
| GET | `/api/public/content` | no | Full content for the website |
| POST | `/api/admin/auth/login` | no | Login → bearer token |
| GET | `/api/admin/auth/me` | yes | Current admin |
| GET | `/api/admin/content` | yes | Load dashboard content |
| PUT | `/api/admin/content` | yes | Save dashboard content |
| POST | `/api/admin/content/seed` | yes | First-time seed from admin |
| POST | `/api/admin/content/reset` | yes | Reset to seed payload |
| POST | `/api/admin/uploads` | yes | Multipart image upload |

Content file: `server/data/content.json` (created after first login/save).

## Flow

1. Start the server.
2. Open `/admin/login` and sign in.
3. First load seeds content from the site defaults into `content.json`.
4. Edit in the dashboard and click **Save**.
5. The public site refreshes from `/api/public/content`.
