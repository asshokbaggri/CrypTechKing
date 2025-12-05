// backend/src/database/models/WhaleTx.model.js

export default {
    chain: String,
    hash: String,
    from: String,
    to: String,
    fromLabel: String,
    toLabel: String,
    amountEth: Number,
    usdValue: Number,
    source: String,
    timestamp: Number
};
