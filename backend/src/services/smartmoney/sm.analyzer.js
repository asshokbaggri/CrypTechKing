// backend/src/services/smartmoney/sm.analyzer.js

import { parseSmartMoneyTx } from "./smartmoney.parser.js";
import { getSmartWallet, updateSmartWallet } from "../../database/queries/smartmoney.query.js";

// --------------------------------------------------------
// 🔥 LABEL GENERATOR: classifies wallet personality type
// --------------------------------------------------------
function generateWalletLabel(walletStats, usdValue, action) {

    const labels = [];

    // High value trades = whale
    if (usdValue > 100_000) labels.push("whale");

    // Many quick trades = sniper
    if (walletStats.totalTrades > 20 && walletStats.avgScore > 70) {
        labels.push("sniper");
    }

    // New token buys = early buyer
    if (action === "buy" && usdValue > 5_000) {
        labels.push("early-buyer");
    }

    // Repeated buys of same token = conviction
    if (walletStats.avgScore > 65 && walletStats.winRate > 55) {
        labels.push("momentum-trader");
    }

    if (!labels.length) labels.push("smart-money");

    return labels;
}

// --------------------------------------------------------
// 🔥 SCORE ENGINE (Behaviour + USD Value + Action)
// --------------------------------------------------------
function calculateScore(walletStats, usdValue, action) {

    let score = 50; // base

    // Wallet consistency
    if (walletStats.avgScore > 65) score += 10;
    if (walletStats.winRate > 50) score += 10;

    // Big buys rewarded more
    if (usdValue > 20_000) score += 10;
    if (usdValue > 100_000) score += 20;

    // Buy signals > Sell signals
    if (action === "buy") score += 10;
    if (action === "sell") score -= 10;

    // Boundaries
    if (score < 1) score = 1;
    if (score > 100) score = 100;

    return score;
}

// --------------------------------------------------------
// 🔥 SMART MONEY ANALYZER (MAIN ENGINE)
// --------------------------------------------------------
export async function analyzeSmartMoneyTx(chain, txHash, httpUrl) {

    // STEP 1 — parse TX to understand amounts, token, USD value, action
    const parsed = await parseSmartMoneyTx(chain, txHash, httpUrl);
    if (!parsed) return;

    const {
        wallet,
        usdValue,
        action
    } = parsed;

    // STEP 2 — get wallet stats
    let walletStats = await getSmartWallet(wallet);

    if (!walletStats) {
        walletStats = {
            wallet,
            totalTrades: 0,
            profitableTrades: 0,
            winRate: 0,
            avgScore: 50,
            labels: [],
            lastUpdated: 0
        };
    }

    // STEP 3 — new Smart Score calculation
    const score = calculateScore(walletStats, usdValue, action);

    // STEP 4 — label calculation
    const labels = generateWalletLabel(walletStats, usdValue, action);

    // STEP 5 — update wallet stats
    const newStats = {
        totalTrades: walletStats.totalTrades + 1,
        avgScore: (walletStats.avgScore + score) / 2,
        winRate:
            walletStats.totalTrades === 0
                ? 50
                : (walletStats.profitableTrades / walletStats.totalTrades) * 100,
        labels,
        lastUpdated: Date.now()
    };

    await updateSmartWallet(wallet, newStats);

    // STEP 6 — return enriched parsed TX
    return {
        ...parsed,
        score,
        labels
    };
}
