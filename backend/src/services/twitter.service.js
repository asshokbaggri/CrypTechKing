import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

let lastPostTime = 0;
const COOLDOWN_MS = 60 * 60 * 1000; // ⏳ 1 hour

export default async function postToX(text) {
  const now = Date.now();

  if (now - lastPostTime < COOLDOWN_MS) {
    console.log('⏳ X cooldown active — skipping tweet');
    return;
  }

  try {
    await client.v2.tweet(text);
    lastPostTime = Date.now();
    console.log('🐦 X ULTRA tweet posted');
  } catch (err) {
    console.error('❌ X post error:', err?.data || err.message);
    lastPostTime = Date.now(); // fail-safe
  }
}
