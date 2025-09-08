# Frontend scaffolded with Vite

## The solution goes here (in the [frontend/src](frontend/src) folder)

## Deploy to Vercel

- Root Directory: set to `frontend` when creating the Vercel project.
- Framework Preset: Other (Vite detected automatically).
- Build Command: `npm run build` (or `yarn build`).
- Output Directory: `dist`.
- API Routes: available under `frontend/api/*` after deploy (e.g. `/api/stocks`).

### Environment variables

- `VITE_API_URL`: Leave empty for same-origin requests (works on Vercel and with `vercel dev`). Only set if pointing to a custom backend.
- `VITE_WS_URL` (optional): URL of a WebSocket server (e.g. `wss://your-socket-host.example.com`). If not set, the app defaults to same-origin `/api/ws` in production. Locally, `vercel dev` serves `/api/ws` too.

See `.env.example` for a template.
