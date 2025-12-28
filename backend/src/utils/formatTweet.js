// backend/src/utils/formatTweet.js

/**
 * Phase 6.1 rules:
 * - Text must NEVER crash if data missing
 * - Token amount optional
 * - From / To optional
 * - Backend-only (used for DB + X)
 */

export function formatWhaleTweet(event, tier = 'WHALE') {
  const {
    symbol,
    amountUSD,
    amountToken,
    blockchain,
    from,
    to
  } = event || {};

  // 🧠 Safety defaults
  const safeSymbol = symbol ? symbol.toUpperCase() : 'TOKEN';
  const safeChain = blockchain ? blockchain.toUpperCase() : 'BLOCKCHAIN';
  const safeFrom = from || 'unknown';
  const safeTo = to || 'unknown';

  let emoji = '🐳';
  let hook = 'Whale activity detected.';

  if (tier === 'MEGA_WHALE') {
    emoji = '🚨🐳';
    hook = 'Institutions are positioning 👀';
  }

  if (tier === 'ULTRA_WHALE') {
    emoji = '🔥🐳';
    hook = 'This can move markets 👀';
  }

  const chainEmojiMap = {
    tron: '🟢',
    ethereum: '🟣',
    bitcoin: '🟠',
    ripple: '🔵'
  };

  const chainEmoji =
    chainEmojiMap[blockchain?.toLowerCase()] || '🔵';

  // 💰 USD formatting (safe)
  const usdPretty =
    typeof amountUSD === 'number'
      ? `$${(amountUSD / 1_000_000).toFixed(1)}M`
      : '';

  // 🪙 Token formatting (optional, safe)
  const tokenPretty =
    typeof amountToken === 'number'
      ? `${Number(amountToken).toLocaleString()} ${safeSymbol}`
      : null;

  return `
${emoji} ${tier.replace('_', ' ')} ALERT

${tokenPretty ? `${tokenPretty} (${usdPretty})` : usdPretty}
moved on ${safeChain} ${chainEmoji}

From: ${safeFrom}
To: ${safeTo}

${hook}

#Crypto #WhaleAlert #${safeSymbol}
`.trim();
}
