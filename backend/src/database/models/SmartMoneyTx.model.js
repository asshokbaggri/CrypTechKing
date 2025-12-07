// backend/src/database/models/SmartMoneyTx.model.js

export default {
    chain: String,            // ETH, BNB, POLYGON
    hash: String,
    wallet: String,           // trader wallet
    tokenIn: String,          // e.g. WETH
    tokenOut: String,         // token bought
    amountIn: Number,
    amountOut: Number,
    usdValue: Number,
    label: String,            // whale, sniper...
    score: Number,            // 0–100
    action: String,           // buy, sell, swap
    tokenAddress: String,
    timestamp: Number,
    source: String            // "smartmoney"
};
