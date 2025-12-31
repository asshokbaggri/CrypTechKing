/**
 * Whale Alert formatter (Single Source of Truth)
 *
 * Rules:
 * - NEVER crash if data missing
 * - ONE heading only (no repeat)
 * - Whale-alert inspired format
 * - Backend-only (DB + X + reuse everywhere)
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

  // --------------------
  // 🧠 SAFE NORMALIZATION
  // --------------------
  const safeSymbol = symbol ? symbol.toUpperCase() : 'TOKEN';
  const safeChain = blockchain ? blockchain.toUpperCase() : 'BLOCKCHAIN';

  const normalizeWallet = (v) => {
    if (!v) return 'unknown wallet';
    if (typeof v === 'string' && v.toLowerCase() === 'unknown')
      return 'unknown wallet';
    return v;
  };

  const safeFrom = normalizeWallet(from);
  const safeTo = normalizeWallet(to);

  // --------------------
  // 🐳 TIER CONFIG
  // --------------------
  let heading = '🐳 WHALE ALERT';
  let hook = 'Whale activity detected.';

  if (tier === 'MEGA_WHALE') {
    heading = '🚨 MEGA WHALE ALERT';
    hook = 'Institutions are positioning 👀';
  }

  if (tier === 'ULTRA_WHALE') {
    heading = '🔥 ULTRA WHALE ALERT';
    hook = 'This can move markets 👀';
  }

  // --------------------
  // 🔗 CHAIN EMOJI
  // --------------------
  const chainEmojiMap = {
    tron: '🟢',
    ethereum: '🟣',
    bitcoin: '🟠',
    ripple: '🔵'
  };

  const chainEmoji =
    chainEmojiMap[blockchain?.toLowerCase()] || '🔵';

  // --------------------
  // 💰 VALUE FORMAT
  // --------------------
  const usdPretty =
    typeof amountUSD === 'number'
      ? `$${(amountUSD / 1_000_000).toFixed(1)}M`
      : '';

  const tokenPretty =
    typeof amountToken === 'number'
      ? `${Number(amountToken).toLocaleString()} ${safeSymbol}`
      : safeSymbol;

  // --------------------
  // 🧾 FINAL MESSAGE
  // --------------------
  return `
${heading}

${tokenPretty} (${usdPretty})
moved on ${safeChain} ${chainEmoji}

From: ${safeFrom}
To: ${safeTo}

${hook}

#Crypto #WhaleAlert #${safeSymbol}
`.trim();
}
