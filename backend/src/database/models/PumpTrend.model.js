// backend/src/database/models/PumpTrend.model.js

export default {
    address: String,
    symbol: String,
    chain: String,
    price: Number,
    volume24h: Number,
    liquidity: Number,
    buys: Number,
    sells: Number,
    priceChange1h: Number,
    hypeScore: Number,
    timestamp: Number
};
