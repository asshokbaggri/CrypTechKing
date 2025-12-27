export function formatWhaleTweet(event) {
  const {
    symbol,
    amountUSD,
    blockchain,
    from,
    to
  } = event;

  const amt = amountUSD;
  let hook = "";
  let emoji = "🐳";

  if (amt >= 10_000_000) {
    hook = "Something big is loading 👀";
    emoji = "🚨🐳";
  } else if (amt >= 5_000_000) {
    hook = "Whales are positioning.";
    emoji = "🐋";
  } else {
    hook = "Smart money warming up.";
    emoji = "🐳";
  }

  const chainEmojiMap = {
    tron: "🟢",
    ethereum: "🟣",
    bitcoin: "🟠"
  };

  const chainEmoji = chainEmojiMap[blockchain?.toLowerCase()] || "🔵";

  const amountPretty = `$${(amt / 1_000_000).toFixed(1)}M`;

  const hashtags = ["#Crypto", "#WhaleAlert"];
  if (symbol) hashtags.push(`#${symbol.toUpperCase()}`);

  const tweet = `
${emoji} ${symbol?.toUpperCase() || "TOKEN"} whale transfer detected

${amountPretty} moved on ${blockchain?.toUpperCase()} ${chainEmoji}

${hook}

${hashtags.slice(0, 2).join(" ")}
`.trim();

  return tweet;
}
