// Edge WebSocket endpoint for live price updates on Vercel
// Declare Edge runtime here to avoid needing per-project vercel.json runtime mapping
export const config = { runtime: 'edge' };

export default function handler(req) {
  const upgrade = req.headers.get('upgrade') || '';
  if (upgrade.toLowerCase() !== 'websocket') {
    return new Response('Expected WebSocket', { status: 426 });
  }

  const { 0: client, 1: server } = new WebSocketPair();
  server.accept();

  const symbols = [
    'NVDA', 'AAPL', 'TSLA', 'XOM', 'META', 'JPM', 'WMT', 'MA', 'ABBV', 'KO',
    'BABA', 'NKE', 'AMD', 'QCOM', 'INTC', 'HON', 'BA'
  ];

  const delay = 400;
  let timer = setInterval(() => {
    const id = symbols[Math.floor(Math.random() * symbols.length)];
    const data = {
      id,
      exchange: 'NASDAQ',
      price: Math.random() * 100
    };
    try {
      server.send(JSON.stringify(data));
    } catch (err) {
      clearInterval(timer);
      try { server.close(); } catch {}
    }
  }, delay);

  const cleanup = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  server.addEventListener('close', cleanup);
  server.addEventListener('error', cleanup);

  return new Response(null, { status: 101, webSocket: client });
}
