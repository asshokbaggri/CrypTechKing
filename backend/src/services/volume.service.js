import axios from 'axios';

export default async function checkVolumeSpike(symbol = 'BTCUSDT') {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=15m&limit=20`;
  const { data } = await axios.get(url);

  const volumes = data.map(c => Number(c[5]));
  const last = volumes[volumes.length - 1];
  const avg = volumes.slice(0, -1).reduce((a,b)=>a+b,0) / (volumes.length - 1);

  if (last > avg * Number(process.env.VOLUME_MULTIPLIER)) {
    return {
      type: 'VOLUME_SPIKE',
      symbol,
      last,
      avg
    };
  }

  return null;
}
