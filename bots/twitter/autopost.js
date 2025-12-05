// bots/twitter/autopost.js

import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
    appKey: "PASTE_API_KEY",
    appSecret: "PASTE_API_SECRET",
    accessToken: "PASTE_ACCESS_TOKEN",
    accessSecret: "PASTE_ACCESS_SECRET"
});

export async function tweetWhale(tx) {
    const message = `
🐋 Whale Alert  
Chain: ${tx.chain}  
Amount: $${tx.usdValue.toLocaleString()}  
From: ${tx.fromLabel}  
To: ${tx.toLabel}  
Hash: ${tx.hash.slice(0, 12)}...
#WhaleAlert #Crypto
    `;

    await client.v2.tweet(message);
    console.log("Tweeted Whale Alert");
}

export async function tweetPump(coin) {
    const message = `
🚀 Pump Alert  
Token: ${coin.symbol}  
Hype Score: ${coin.hypeScore}  
Price: $${coin.price}  
Liquidity: $${coin.liquidity.toLocaleString()}  
#Crypto #MemeCoins
    `;

    await client.v2.tweet(message);
    console.log("Tweeted Pump Alert");
}
