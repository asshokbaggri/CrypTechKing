// backend/src/services/whale/whale.listener.js

import Web3 from "web3";
import { parseWhaleTx } from "./whale.parser.js";
import CHAINS from "../../config/chains.js";

export class WhaleListener {
    constructor() {
        this.providers = {};
    }

    createProvider(chain) {
        const url = CHAINS[chain].WS;

        const provider = new Web3.providers.WebsocketProvider(url, {
            reconnect: {
                auto: true,
                delay: 2000,
                maxAttempts: 100,
                onTimeout: false
            }
        });

        provider.on("connect", () => {
            console.log(`🔵 WS Connected → ${chain}`);
        });

        provider.on("error", (err) => {
            console.log(`❌ WS Error on ${chain}:`, err.message);
        });

        provider.on("end", () => {
            console.log(`⚠️ WS Closed → Reconnecting ${chain}...`);
            this.providers[chain] = this.createProvider(chain);
            this.startListeners(chain); 
        });

        return provider;
    }

    startListeners(chain) {
        const web3 = new Web3(this.providers[chain]);

        // Pending TX
        web3.eth.subscribe("pendingTransactions", async (txHash) => {
            try {
                const tx = await web3.eth.getTransaction(txHash);
                if (!tx) return;
                parseWhaleTx(chain, tx, "mempool");
            } catch (err) {
                console.log("Error mempool:", err);
            }
        });

        // Confirmed Blocks
        web3.eth.subscribe("newBlockHeaders", async (block) => {
            try {
                const blockData = await web3.eth.getBlock(block.hash, true);
                if (!blockData || !blockData.transactions) return;

                blockData.transactions.forEach((tx) => {
                    parseWhaleTx(chain, tx, "confirmed");
                });
            } catch (err) {
                console.log("Error block:", err);
            }
        });

        console.log(`🐋 Whale Listener running on ${chain}`);
    }

    start() {
        Object.keys(CHAINS).forEach(chain => {
            this.providers[chain] = this.createProvider(chain);
            this.startListeners(chain);
        });
    }
}

export default new WhaleListener();
