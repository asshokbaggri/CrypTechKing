export function formatWhaleTweet(event, tier = 'WHALE') {
  const { symbol, amountUSD, blockchain } = event;

  let hook = "Whale activity detected.";
  let emoji = "🐳";

  if (tier === 'MEGA_WHALE') {
    hook = "Institutions are positioning 👀";
    emoji = "🚨🐳";
  }

  if (tier === 'ULTRA_WHALE') {
    hook = "This can move markets 👀";
    emoji = "🔥🐳";
  }

  const chainEmojiMap = {
    tron: "🟢",
    ethereum: "🟣",
    bitcoin: "🟠"
  };

  const chainEmoji = chainEmojiMap[blockchain?.toLowerCase()] || "🔵";
  const amountPretty = `$${(amountUSD / 1_000_000).toFixed(1)}M`;

  return `
${emoji} ${symbol?.toUpperCase()} whale transfer detected

${amountPretty} moved on ${blockchain?.toUpperCase()} ${chainEmoji}

${hook}

#Crypto #WhaleAlert
`.trim();
}
