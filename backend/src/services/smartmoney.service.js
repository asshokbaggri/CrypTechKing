import WhaleTx from "../models/WhaleTx.model.js";

const getSmartMoneyStats = async () => {
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const txs = await WhaleTx.find({
    timestamp: { $gte: last24h },
  });

  let buy = 0;
  let sell = 0;
  const wallets = new Set();

  txs.forEach((tx) => {
    wallets.add(tx.from);
    wallets.add(tx.to);
    tx.type === "BUY" ? buy++ : sell++;
  });

  return {
    buyers: buy,
    sellers: sell,
    active: wallets.size,
    volume24h: txs.reduce((a, b) => a + Number(b.amount || 0), 0),
  };
};

export default {
  getSmartMoneyStats,
};
