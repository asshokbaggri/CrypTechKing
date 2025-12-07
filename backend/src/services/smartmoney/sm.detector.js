// backend/src/services/smartmoney/sm.detector.js
// Detect trending Smart Money patterns

export function detectMomentum(previousTx, currentTx) {
    if (!previousTx) return false;

    // If same wallet buys twice in 60 sec → momentum buy
    const diff = currentTx.timestamp - previousTx.timestamp;
    if (diff < 60000) return true;

    return false;
}
