// services/whale.service.js
import WhaleTx from "../models/WhaleTx.model.js";

export async function processWhaleTx(data) {
  const exists = await WhaleTx.findOne({ hash: data.hash });
  if (exists) return;

  await WhaleTx.create({
    chain: data.chain,
    hash: data.hash,
    from: data.from,
    to: data.to,
    value: data.value,
    timestamp: new Date(),
  });

  console.log(
    `🐳 ${data.chain} Whale: ${data.value} → ${data.to?.slice(0, 6)}`
  );
}
