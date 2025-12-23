export default async function analyzeWithAI(event) {
  return {
    text: `🚨 CrypTechKing Alert

$${event.coin} whale moved $${(event.amountUSD/1e6).toFixed(1)}M to ${event.to}.

This isn’t random.
Market tension is rising 👀`
  };
}
