import { store } from '@/store';
import pricesSlice from '@/store/pricesSlice';
import { WS_URL } from '@/config';

let socket: WebSocket | null = null;
let eventSource: EventSource | null = null;
let reconnectTimer: number | null = null;
let reconnectDelay = 3000;
const MAX_DELAY = 30000;

const connect = () => {
  // Attempt WebSocket first; if it fails in production (e.g., platform blocks WS),
  // fall back to SSE at /api/stream

  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    console.debug('WebSocket already active; skipping new connection');
    return;
  }

  if (!WS_URL) {
    console.warn('WS_URL not set; trying SSE fallback.');
    startSSE();
    return;
  }

  console.log('CONNECTION STARTING...', WS_URL);
  const ws = new WebSocket(WS_URL);
  socket = ws;

  ws.onopen = function () {
    reconnectDelay = 3000; // reset backoff on success
    console.log('WebSocket connected');
  };

  ws.onmessage = function (e) {
    // console.log('Message:', e.data);
    const data = JSON.parse(e.data);
    store.dispatch(
      pricesSlice.actions.updatePrice({
        id: data.id as string,
        price: data.price
      })
    );
  };

  ws.onclose = function (e) {
    console.log(`Socket closed (${e.code}). Reconnecting in ${Math.floor(reconnectDelay / 1000)}s`, e.reason);
    socket = null;
    // On repeated failures, switch to SSE
    if (!eventSource) {
      console.log('Falling back to SSE at /api/stream');
      startSSE();
    }
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      reconnectDelay = Math.min(reconnectDelay * 2, MAX_DELAY);
      connect();
    }, reconnectDelay) as unknown as number;
  };

  ws.onerror = function (err) {
    console.error('Socket encountered error: closing socket', err);
    try {
      ws.close();
    } catch {}
  };
};

function startSSE() {
  if (eventSource) return;
  try {
    const url = (typeof window !== 'undefined')
      ? `${window.location.protocol}//${window.location.host}/api/stream`
      : '/api/stream';
    const es = new EventSource(url);
    eventSource = es;
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (!data || typeof data !== 'object') return;
        store.dispatch(
          pricesSlice.actions.updatePrice({
            id: data.id as string,
            price: data.price
          })
        );
      } catch {}
    };
    es.addEventListener('price', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        store.dispatch(
          pricesSlice.actions.updatePrice({
            id: data.id as string,
            price: data.price
          })
        );
      } catch {}
    });
    es.onerror = () => {
      console.warn('SSE connection error. Retrying…');
      try { es.close(); } catch {}
      eventSource = null;
      setTimeout(startSSE, 3000);
    };
  } catch (e) {
    console.warn('Failed to start SSE fallback:', e);
  }
}

export default connect;
