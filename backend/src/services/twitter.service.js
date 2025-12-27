import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

export default async function postToX(text) {
  try {
    await client.v2.tweet(text);
    console.log('🐦 Tweet posted successfully');
  } catch (err) {
    console.error('❌ X post error:', err.message);
  }
}
