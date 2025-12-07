// backend/src/database/models/SmartMoneyTx.model.js

export default {
    chain: String,
    hash: String,
    wallet: String,
    token: String,
    tokenSymbol: String,
    tokenName: String,
    amount: Number,
    usdValue: Number,
    type: String,        // buy | sell | transfer
    score: Number,
    label: String,       // smart whale | sniper | early buyer
    timestamp: Number
};
