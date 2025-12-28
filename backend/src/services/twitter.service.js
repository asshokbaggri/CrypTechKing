import { TwitterApi } from 'twitter-api-v2';
import XPost from '../models/XPost.js';

// 🔐 FEATURE FLAG
const X_ENABLED = process.env.X_ENABLED === 'true';

// ⏳ 1 hour cooldown
const COOLDOWN_MS = 60 * 60 * 1000;

// 🐦 Init client ONLY if enabled
const client = X_ENABLED
  ? new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_SECRET,
    })
  : null;

export default async function postToX(text) {
  // 🚫 HARD STOP if disabled
  if (!X_ENABLED) {
    console.log('🔕 X posting disabled via env flag');
    return;
  }

  try {
    const record = await XPost.findOne();
    const now = Date.now();

    // ⏳ Cooldown check (DB based)
    if (record && now - record.lastPostedAt.getTime() < COOLDOWN_MS) {
      console.log('⏳ X cooldown active (DB) — skipping tweet');
      return;
    }

    // 🐦 Post tweet
    await client.v2.tweet(text);
    console.log('🐦 X tweet posted successfully');

    // 💾 Save cooldown timestamp
    if (record) {
      record.lastPostedAt = new Date();
      await record.save();
    } else {
      await XPost.create({ lastPostedAt: new Date() });
    }

  } catch (err) {
    // 🛑 Handle rate-limit cleanly
    if (err?.data?.status === 429) {
      console.error('⛔ X rate limit hit — skipping without retry');
      return;
    }

    console.error(
      '❌ X post error:',
      err?.data?.detail || err?.data || err.message
    );
  }
}
