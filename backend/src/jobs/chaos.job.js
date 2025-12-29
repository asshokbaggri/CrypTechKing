import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';
import postToTelegram from '../services/telegram.service.js';
import { formatWhaleTweet } from '../utils/formatTweet.js';
import { canPostWhale } from '../utils/whaleMemory.js';
import Alert from '../models/Alert.js';

const MIN_WHALE_USD = 10_000_000;
const ULTRA_WHALE_USD = 50_000_000;

export default async function runChaosJob() {
  const whale = await checkWhales();

  if (!whale) {
    console.log('ℹ️ No significant whale activity');
    return;
  }

  if (whale.amountUSD < MIN_WHALE_USD) {
    console.log('🪙 Whale below threshold ignored');
    return;
  }

  const permission = canPostWhale(whale);
  if (!permission.ok) {
    console.log(`⛔ Skip whale: ${permission.reason}`);
    return;
  }

  // 🧠 Tier detection (DO NOT MOVE)
  let tier = 'WHALE';
  if (whale.amountUSD >= ULTRA_WHALE_USD) tier = 'ULTRA_WHALE';
  else if (whale.amountUSD >= 25_000_000) tier = 'MEGA_WHALE';

  console.log(`🐳 Approved ${tier}:`, whale);

  // 🧠 SIGNAL INTELLIGENCE
  const isExchange = (label) =>
    typeof label === 'string' &&
    label.toLowerCase().includes('exchange');

  let signal = 'UNKNOWN_FLOW';
  let flowType = 'UNKNOWN';
  let signalStrength = 10;

  if (!isExchange(whale.from) && isExchange(whale.to)) {
    signal = 'EXCHANGE_INFLOW';
    flowType = 'WALLET_TO_EXCHANGE';
    signalStrength = 70;
  } else if (isExchange(whale.from) && !isExchange(whale.to)) {
    signal = 'ACCUMULATION';
    flowType = 'EXCHANGE_TO_WALLET';
    signalStrength = 80;
  } else if (isExchange(whale.from) && isExchange(whale.to)) {
    signal = 'EXCHANGE_TO_EXCHANGE';
    flowType = 'EXCHANGE_TO_EXCHANGE';
    signalStrength = 30;
  }

  if (tier === 'ULTRA_WHALE') {
    signalStrength = Math.min(signalStrength + 15, 100);
  }

  console.log(`🧠 Signal detected: ${signal} (${signalStrength}%)`);

  // 🧠 Format text (stored + X)
  let text = formatWhaleTweet(whale, tier);

  if (tier === 'MEGA_WHALE') {
    text =
      `🚨🚨 MEGA WHALE ALERT 🚨🚨\n\n` +
      text +
      `\n\n👀 Institutions don’t move silently.`;
  }

  if (tier === 'ULTRA_WHALE') {
    text =
      `🔥🔥 ULTRA WHALE ALERT 🔥🔥\n\n` +
      text +
      `\n\n🚀 Market-moving transfer detected.`;
  }

  // 💾 SAVE TO DB
  await Alert.create({
    type: whale.type || 'WHALE_TRANSFER',

    coin: whale.symbol?.toUpperCase(),
    usd: whale.amountUSD,
    tier,

    text,

    blockchain: whale.blockchain,
    from: whale.from,
    to: whale.to,
    txid: whale.txid,

    amountToken: whale.amountToken ?? null,
    tokenSymbol: whale.tokenSymbol ?? whale.symbol,

    signal,
    flowType,
    signalStrength
  });

  console.log('💾 Alert saved with signal intelligence');

  // 🐦 X = ULTRA ONLY
  if (tier === 'ULTRA_WHALE') {
    await postToX(text);
  }

  // 📣 TELEGRAM = MEGA + ULTRA (HTML SAFE)
  if (tier === 'MEGA_WHALE' || tier === 'ULTRA_WHALE') {
    console.log('📣 Telegram trigger hit for tier:', tier);

    const tgMessage = `
🚨 <b>${tier.replace('_', ' ')}</b>

<b>${whale.symbol?.toUpperCase()}</b> whale transfer detected

💰 <b>Value:</b> $${Number(whale.amountUSD).toLocaleString()}

🔗 <b>Chain:</b> ${whale.blockchain}
📍 <b>From:</b> ${whale.from}
📍 <b>To:</b> ${whale.to}

📊 <b>Signal:</b> ${signal} (${signalStrength}%)
`.trim();

    await postToTelegram(tgMessage);
  }
}
