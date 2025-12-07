// backend/src/database/models/SmartWallet.model.js

export default {
    wallet: String,
    totalTrades: Number,
    profitableTrades: Number,
    winRate: Number,      // %
    avgScore: Number,
    labels: [String],     // ["whale", "sniper"]
    lastUpdated: Number
};
