# Hostinger VPS Deployment

This project is a Vite React frontend and an Express API backend.

## Runtime

- Use Node.js 22.12.0 or newer. The repo includes `.nvmrc`.
- Serve `frontend/dist` with Nginx.
- Run the backend with PM2 on `127.0.0.1:5000` or another internal port.
- Keep `.env` files on the VPS only. Do not commit real credentials.

## Frontend

Use a same-origin API path when Nginx proxies `/api` to the backend:

```bash
cd frontend
cp .env.example .env
npm ci
npm run build
```

`frontend/.env`:

```bash
VITE_API_BASE_URL=/api
```

## Backend

```bash
cd backend
cp .env.example .env
npm ci --omit=dev
npm test
npm run seed:admin
```

Set these production values in `backend/.env`:

```bash
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-domain.com,https://www.your-domain.com
PAYSTACK_CALLBACK_URL=https://your-domain.com/payment/verify
ADMIN_COOKIE_NAME=reena_admin_token
```

## PM2

Run this from the repository root after installing dependencies:

```bash
pm2 start deployment/pm2/ecosystem.config.cjs
pm2 save
pm2 startup
```

## Nginx

Copy `deployment/nginx/site.conf.example` to your Nginx sites directory, replace the domain and root path, then enable it. The config includes SPA fallback routing and `/api` reverse proxying.

After enabling HTTPS, confirm:

```bash
curl https://your-domain.com/api/health
```
