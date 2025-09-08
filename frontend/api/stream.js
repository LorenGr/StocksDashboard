// Edge SSE endpoint for live price updates fallback
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const symbols = [
        'NVDA', 'AAPL', 'TSLA', 'XOM', 'META', 'JPM', 'WMT', 'MA', 'ABBV', 'KO',
        'BABA', 'NKE', 'AMD', 'QCOM', 'INTC', 'HON', 'BA'
      ];

      const send = (event, data) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send('open', { ok: true });

      const interval = setInterval(() => {
        const id = symbols[Math.floor(Math.random() * symbols.length)];
        const data = { id, exchange: 'NASDAQ', price: Math.random() * 100 };
        try {
          send('price', data);
        } catch (e) {
          clearInterval(interval);
          try { controller.close(); } catch {}
        }
      }, 400);

      const abort = () => {
        clearInterval(interval);
        try { controller.close(); } catch {}
      };

      // Close when client disconnects
      try {
        req.signal.addEventListener('abort', abort);
      } catch {}
    },
    cancel() {}
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    }
  });
}

