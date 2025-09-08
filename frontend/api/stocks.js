import stocks from './_data/stocksData.js';
import delay from './_lib/delayPromise.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method Not Allowed');
  }
  await delay(Math.random() * 500);
  res.status(200).json(stocks);
}
