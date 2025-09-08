// Vite exposes variables prefixed with VITE_
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/__dev_api' : '');

// WebSocket URL resolution order:
// 1) Explicit env VITE_WS_URL
// 2) If running at localhost:3000 (vercel dev) → ws://localhost:3000/api/ws
// 3) If plain Vite dev → ws://localhost:5180 (separate dev WS server)
// 4) Else same-origin /api/ws
let inferredWs = '';
if (typeof window !== 'undefined') {
  const isVercelDev = window.location.host.includes('localhost:3000');
  const isLocalhost = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(window.location.host);
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  if (isVercelDev) {
    inferredWs = 'ws://localhost:3000/api/ws';
  } else if (import.meta.env.DEV && isLocalhost) {
    inferredWs = 'ws://localhost:5180';
  } else {
    inferredWs = `${proto}://${window.location.host}/api/ws`;
  }
}

const WS_URL = import.meta.env.VITE_WS_URL || inferredWs;

export { API_BASE, WS_URL };
