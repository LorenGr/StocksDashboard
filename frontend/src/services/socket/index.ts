import { store } from '@/store';
import pricesSlice from '@/store/pricesSlice';
import { WS_URL } from '@/config';

let socket: WebSocket | null = null;
let reconnectTimer: number | null = null;
let reconnectDelay = 3000;
const MAX_DELAY = 30000;

const connect = () => {
  if (!WS_URL) {
    console.warn('WS_URL not set; live updates disabled.');
    return;
  }

  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    console.debug('WebSocket already active; skipping new connection');
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

export default connect;
