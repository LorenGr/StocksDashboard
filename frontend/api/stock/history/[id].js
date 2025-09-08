import delay from '../../_lib/delayPromise.js';
import mulberry32 from '../../_lib/mulberry32.js';

function randomNumberFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // convert to 32-bit integer
  }
  return hash;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method Not Allowed');
  }

  const { id } = req.query;
  await delay(Math.random() * 2500 + 100);

  const generator = mulberry32(randomNumberFromString(String(id).toLowerCase()));
  let currDate = new Date();
  currDate.setSeconds(0);

  const history = [...new Array(40)].map((_, i) => ({
    time: currDate - 60 * 1000 * i,
    price: Number((generator() * 10).toFixed(3)),
  }));

  res.status(200).json({ symbol: id ?? null, history });
}
