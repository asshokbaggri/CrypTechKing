// backend/src/services/pump/pump.score.js

export const calculateHypeScore = ({ volume, liquidity, priceChange, buys, sells }) => {
    
    // Normalize factors
    const volScore = Math.min(volume / 50000, 40);      // max 40 points
    const liqScore = Math.min(liquidity / 20000, 20);   // max 20 points
    const priceScore = Math.min(priceChange * 2, 20);   // max 20 points

    const buyPressure = buys / (sells + 1);
    const buyScore = Math.min(buyPressure * 10, 20);    // max 20 points

    // Total hype score (100 max)
    const finalScore = volScore + liqScore + priceScore + buyScore;

    return Math.min(Math.round(finalScore), 100);
};
