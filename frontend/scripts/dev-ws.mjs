import { WebSocketServer } from 'ws';

const PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : 5180;

let wss;
try {
  wss = new WebSocketServer({ port: PORT, host: '127.0.0.1' });
} catch (e) {
  console.error(`[dev-ws] Failed to bind on port ${PORT}:`, e?.code || e);
  process.exit(1);
}

const symbols = [
  'NVDA', 'AAPL', 'TSLA', 'XOM', 'META', 'JPM', 'WMT', 'MA', 'ABBV', 'KO',
  'BABA', 'NKE', 'AMD', 'QCOM', 'INTC', 'HON', 'BA'
];

wss.on('listening', () => {
  console.log(`[dev-ws] Listening on ws://localhost:${PORT}`);
});

wss.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`[dev-ws] Port ${PORT} in use. Either stop the other process or run with WS_PORT=<free-port>.`);
  } else {
    console.error('[dev-ws] Server error:', err);
  }
});

wss.on('connection', (ws) => {
  console.log('[dev-ws] client connected');
  const interval = setInterval(() => {
    const id = symbols[Math.floor(Math.random() * symbols.length)];
    const data = { id, exchange: 'NASDAQ', price: Math.random() * 100 };
    try {
      ws.send(JSON.stringify(data));
    } catch {
      clearInterval(interval);
      try { ws.close(); } catch {}
    }
  }, 400);

  ws.on('close', () => clearInterval(interval));
  ws.on('error', () => {
    clearInterval(interval);
    try { ws.close(); } catch {}
  });
});

process.on('SIGINT', () => {
  try { wss.close(); } catch {}
  process.exit(0);
});
