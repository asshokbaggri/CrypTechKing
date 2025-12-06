// backend/src/services/whale/whale.listener.js

import Web3 from "web3";
import { parseWhaleTx } from "./whale.parser.js";
import CHAINS from "../../config/chains.js";

export class WhaleListener {
    constructor() {
        this.interval = 15 * 1000; // poll every 15 sec
        this.web3 = new Web3(CHAINS.ETH.HTTP);
        this.lastBlock = null;
    }

    async poll() {
        try {
            const latest = await this.web3.eth.getBlockNumber();

            if (!this.lastBlock) {
                this.lastBlock = latest;
                return;
            }

            for (let block = this.lastBlock + 1; block <= latest; block++) {
                const blockData = await this.web3.eth.getBlock(block, true);

                if (!blockData || !blockData.transactions) continue;

                blockData.transactions.forEach(tx => {
                    parseWhaleTx("ETH", tx, "confirmed");
                });

                console.log(`🐋 Processed block ${block}`);
            }

            this.lastBlock = latest;

        } catch (err) {
            console.log("Whale Polling Error:", err.message);
        }
    }

    start() {
        console.log("🐋 Whale Listener (HTTP Polling Mode) Started...");
        this.poll();
        setInterval(() => this.poll(), this.interval);
    }
}

export default new WhaleListener();
