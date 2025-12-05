// backend/src/services/whale/whale.parser.js

import EXCHANGES from "../../config/exchanges.json" assert { type: "json" };
import { saveWhaleTx } from "../../database/queries/whales.query.js";

// ADD THESE:
import { sendTelegramWhaleAlert } from "../../../bots/telegram/whale.alert.js";
import { tweetWhale } from "../../../bots/twitter/autopost.js";

export const parseWhaleTx = async (chain, tx, source) => {
    try {
        if (!tx || !tx.value) return;

        const amountEth = Number(tx.value) / 1e18;
        const usdValue = amountEth * 3000;

        if (usdValue < 100000) return;

        const fromLabel = labelAddress(tx.from);
        const toLabel = labelAddress(tx.to);

        const whaleData = {
            chain,
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            fromLabel,
            toLabel,
            amountEth,
            usdValue,
            source,
            timestamp: Date.now()
        };

        // Save in DB
        await saveWhaleTx(whaleData);

        // 🔥 Bot Alerts HERE
        await sendTelegramWhaleAlert(whaleData);
        await tweetWhale(whaleData);

        console.log("🐋 Whale TX:", whaleData);

    } catch (err) {
        console.log("Parser Error:", err);
    }
};

const labelAddress = (address) => {
    if (!address) return "Unknown";

    if (EXCHANGES[address.toLowerCase()]) {
        return EXCHANGES[address.toLowerCase()];
    }
    return "Whale Wallet";
};
