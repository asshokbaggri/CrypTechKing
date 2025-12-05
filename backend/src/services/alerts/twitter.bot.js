import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
});

export async function tweetWhale(tx) {
    const msg = `🐋 Whale Alert  
$${tx.usdValue.toLocaleString()} moved  
${tx.fromLabel} → ${tx.toLabel}`;

    await client.v2.tweet(msg);
}

export async function tweetPump(data) {
    const msg = `🚀 Pump Alert  
Token: ${data.symbol}  
Hype Score: ${data.hypeScore}`;

    await client.v2.tweet(msg);
}
