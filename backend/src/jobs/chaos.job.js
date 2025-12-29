import checkWhales from '../services/whale.service.js';
import postToX from '../services/twitter.service.js';
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

  // ❌ HARD FILTER
  if (whale.amountUSD < MIN_WHALE_USD) {
    console.log('🪙 Whale below threshold ignored');
    return;
  }

  // 🛡️ Anti-spam memory
  const permission = canPostWhale(whale);
  if (!permission.ok) {
    console.log(`⛔ Skip whale: ${permission.reason}`);
    return;
  }

  // 🧠 Tier detection
  let tier = 'WHALE';
  if (whale.amountUSD >= ULTRA_WHALE_USD) tier = 'ULTRA_WHALE';
  else if (whale.amountUSD >= 25_000_000) tier = 'MEGA_WHALE';

  console.log(`🐳 Approved ${tier}:`, whale);

  // 🧠 SIGNAL INTELLIGENCE (Phase 7.1)
  const isExchange = (label) =>
    typeof label === 'string' &&
    label.toLowerCase().includes('exchange');

  let signal = 'UNKNOWN_FLOW';
  let flowType = 'UNKNOWN';
  let signalStrength = 10;

  // Wallet ➝ Exchange (Sell pressure)
  if (!isExchange(whale.from) && isExchange(whale.to)) {
    signal = 'EXCHANGE_INFLOW';
    flowType = 'WALLET_TO_EXCHANGE';
    signalStrength = 70;
  }

  // Exchange ➝ Wallet (Accumulation)
  else if (isExchange(whale.from) && !isExchange(whale.to)) {
    signal = 'ACCUMULATION';
    flowType = 'EXCHANGE_TO_WALLET';
    signalStrength = 80;
  }

  // Exchange ➝ Exchange (Noise)
  else if (isExchange(whale.from) && isExchange(whale.to)) {
    signal = 'EXCHANGE_TO_EXCHANGE';
    flowType = 'EXCHANGE_TO_EXCHANGE';
    signalStrength = 30;
  }

  // Boost confidence for ULTRA whales
  if (tier === 'ULTRA_WHALE') {
    signalStrength = Math.min(signalStrength + 15, 100);
  }

  console.log(
    `🧠 Signal detected: ${signal} (${signalStrength}%)`
  );

  // 🧠 Format stored text (UI-safe)
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

  // 💾 SAVE TO DB (Phase 7.1)
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

    // 🧠 Signal intelligence
    signal,
    flowType,
    signalStrength
  });

  console.log('💾 Alert saved with signal intelligence');

  // 🐦 Phase 7.2 — SMART X POSTING
  const shouldPostToX =
    tier === 'ULTRA_WHALE' &&
    signal === 'ACCUMULATION' &&
    signalStrength >= 80;

  if (shouldPostToX) {
    console.log(
      `🐦 X POST APPROVED → ${signal} (${signalStrength}%)`
    );
    await postToX(text);
  } else {
    console.log(
      `🛑 X skipped → tier=${tier}, signal=${signal}, strength=${signalStrength}%`
    );
  }
