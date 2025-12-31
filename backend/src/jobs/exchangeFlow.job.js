// backend/src/jobs/exchangeFlow.job.js

import { Alchemy, Network } from 'alchemy-sdk';
import Alert from '../models/Alert.js';
import { classifyWallet } from '../utils/walletClassifier.js';
import { detectSignal } from '../utils/signalEngine.js';
import postToTelegram from '../services/telegram.service.js'; // ✅ ADD

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
});

const MIN_USD = 10_000_000;

export default async function runExchangeFlowJob() {
  console.log('🧠 Exchange Flow Scan running...');

  const transfers = await alchemy.core.getAssetTransfers({
    fromBlock: 'latest',
    toBlock: 'latest',
    category: ['erc20'],
    withMetadata: true,
    excludeZeroValue: true
  });

  for (const tx of transfers.transfers) {
    const amountUSD = Number(tx.value);
    if (amountUSD < MIN_USD) continue;

    const fromType = classifyWallet(tx.from);
    const toType = classifyWallet(tx.to);

    const signalData = detectSignal(fromType, toType);
    if (!signalData) continue; // ❌ Exchange → Exchange ignored

    const tier =
      amountUSD >= 50_000_000
        ? 'ULTRA_WHALE'
        : amountUSD >= 25_000_000
        ? 'MEGA_WHALE'
        : 'WHALE';

    const text = `
${tier.replace('_', ' ')} ALERT

${tx.value.toLocaleString()} ${tx.asset} ($${(amountUSD / 1_000_000).toFixed(1)}M)
${fromType} → ${toType}

Signal: ${signalData.signal}
Confidence: ${signalData.strength}%

#Crypto #WhaleAlert #${tx.asset}
`.trim();

    // 💾 SAVE DB
    const alert = await Alert.create({
      type: 'EXCHANGE_FLOW',
      coin: tx.asset,
      usd: amountUSD,
      amountToken: tx.value,
      blockchain: 'ethereum',
      from: fromType,
      to: toType,
      tier,
      text,
      signal: signalData.signal,
      flowType: signalData.flowType,
      signalStrength: signalData.strength
    });

    console.log(
      `✅ ${signalData.signal} | ${tx.asset} $${amountUSD.toLocaleString()}`
    );

    // 📣 TELEGRAM (ONLY MEGA + ULTRA)
    if (tier === 'MEGA_WHALE' || tier === 'ULTRA_WHALE') {
      const tgMessage = `
<b>${tier.replace('_', ' ')}</b>

<b>${tx.asset}</b> ${signalData.signal.replace('_', ' ')}

💰 <b>Value:</b> $${amountUSD.toLocaleString()}
🔁 <b>Flow:</b> ${fromType} → ${toType}
📊 <b>Confidence:</b> ${signalData.strength}%

#${tx.asset} #WhaleAlert
`.trim();

      await postToTelegram(tgMessage);
    }
  }
}
