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

  // 🧠 SIGNAL INTELLIGENCE (basic, AI later)
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

  // 🧠 Stored text (for DB + X)
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
  const alert = await Alert.create({
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

  // 🐦 X = ULTRA ONLY (unchanged)
  if (tier === 'ULTRA_WHALE') {
    await postToX(text);
  }

  // 📣 TELEGRAM = MEGA + ULTRA (FINAL FORMATION)
  if (tier === 'MEGA_WHALE' || tier === 'ULTRA_WHALE') {
    const alertUrl = `https://cryptechking.vercel.app/alerts/${alert._id}`;

    const coinTag = `#${whale.symbol?.toUpperCase()}`;
    const chainTag = `#${whale.blockchain?.toUpperCase()}`;

    // ❌ no hashtag for unknown wallet
    const fromLabel =
      whale.from && whale.from !== 'unknown'
        ? whale.from.includes('#') ? whale.from : whale.from
        : 'unknown wallet';

    const toLabel =
      whale.to && whale.to !== 'unknown'
        ? whale.to.includes('#') ? whale.to : `#${whale.to}`
        : 'unknown wallet';

    const tgMessage = `
${tier === 'ULTRA_WHALE'
  ? '🔥🔥🔥 <b>ULTRA WHALE ALERT</b> 🔥🔥🔥'
  : '🚨🚨 <b>MEGA WHALE ALERT</b> 🚨🚨'}

🐳 <b>${whale.amountToken?.toLocaleString() || '—'} ${coinTag}</b>
💰 <b>$${Number(whale.amountUSD).toLocaleString()} USD</b>

➡️ <b>From:</b> ${fromLabel}
➡️ <b>To:</b> ${toLabel}

🔗 <b>Chain:</b> ${chainTag}
${tier === 'ULTRA_WHALE' ? '⚠️ <b>Market-moving transfer detected</b>\n' : ''}
👑 <b>CrypTechKing Alpha</b>
🌐 <a href="${alertUrl}">View full details</a>
`.trim();

    console.log('📣 Sending Telegram alert');
    await postToTelegram(tgMessage);
  }
}
