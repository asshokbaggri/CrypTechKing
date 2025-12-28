// backend/src/utils/formatTweet.js

export function formatWhaleTweet(event, tier = 'WHALE') {
  const {
    symbol,
    amountUSD,
    amountToken,
    blockchain,
    from,
    to
  } = event;

  let emoji = "🐳";
  let hook = "Whale activity detected.";

  if (tier === 'MEGA_WHALE') {
    emoji = "🚨🐳";
    hook = "Institutions are positioning 👀";
  }

  if (tier === 'ULTRA_WHALE') {
    emoji = "🔥🐳";
    hook = "This can move markets 👀";
  }

  const chainEmojiMap = {
    tron: "🟢",
    ethereum: "🟣",
    bitcoin: "🟠",
    ripple: "🔵"
  };

  const chainEmoji =
    chainEmojiMap[blockchain?.toLowerCase()] || "🔵";

  const usdPretty = `$${(amountUSD / 1_000_000).toFixed(1)}M`;
  const tokenPretty = amountToken
    ? `${Number(amountToken).toLocaleString()} ${symbol.toUpperCase()}`
    : null;

  return `
${emoji} ${tier.replace('_', ' ')} ALERT

${tokenPretty ? `${tokenPretty} (${usdPretty})` : usdPretty}
moved on ${blockchain?.toUpperCase()} ${chainEmoji}

From: ${from || 'unknown'}
To: ${to || 'unknown'}

${hook}

#Crypto #WhaleAlert #${symbol?.toUpperCase()}
`.trim();
}
