// backend/src/services/twitter.service.js

import { TwitterApi } from 'twitter-api-v2';
import XPost from '../models/XPost.js';

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

export default async function postToX(text) {
  try {
    const record = await XPost.findOne();

    const now = Date.now();

    // ⏳ Cooldown check
    if (record && now - record.lastPostedAt.getTime() < COOLDOWN_MS) {
      console.log('⏳ X cooldown active (DB) — skipping tweet');
      return;
    }

    // 🐦 Post tweet
    await client.v2.tweet(text);
    console.log('🐦 X ULTRA tweet posted');

    // 💾 Save / update cooldown timestamp
    if (record) {
      record.lastPostedAt = new Date();
      await record.save();
    } else {
      await XPost.create({ lastPostedAt: new Date() });
    }

  } catch (err) {
    console.error(
      '❌ X post error:',
      err?.data?.detail || err?.data || err.message
    );
  }
}
