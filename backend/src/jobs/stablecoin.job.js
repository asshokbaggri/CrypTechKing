import fetchStablecoinTransfers from '../services/stablecoin.service.js';

export default async function runStablecoinJob() {
  const transfers = await fetchStablecoinTransfers();

  if (!transfers.length) {
    console.log('ℹ️ No stablecoin transfers found');
    return;
  }

  for (const tx of transfers) {
    console.log(
      `🪙 ${tx.token} | ${tx.amount} | ${tx.from} → ${tx.to}`
    );
  }
}
