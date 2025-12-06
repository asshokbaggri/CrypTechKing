// backend/src/services/whale/whale.listener.js

import Web3 from "web3";
import { parseWhaleTx } from "./whale.parser.js";
import CHAINS from "../../config/chains.js";

export class WhaleListener {
    constructor() {
        this.providers = {};
    }

    createProvider(chain) {
        const provider = new Web3.providers.WebsocketProvider(CHAINS[chain].WS, {
            reconnect: {
                auto: true,
                delay: 5000,
                maxAttempts: 999999,
                onTimeout: true
            }
        });

        provider.on("error", () => {
            console.log(`⚠️ WS Error on ${chain} → reconnecting...`);
        });

        provider.on("close", () => {
            console.log(`🔄 WS Closed on ${chain} → reconnecting...`);
        });

        return new Web3(provider);
    }

    initProviders() {
        Object.keys(CHAINS).forEach(chain => {
            this.providers[chain] = this.createProvider(chain);
        });
    }

    start() {
        this.initProviders();

        Object.keys(this.providers).forEach(chain => {
            const web3 = this.providers[chain];

            // LISTEN TO MEMPOOL
            web3.eth.subscribe("pendingTransactions", async (txHash) => {
                try {
                    const tx = await web3.eth.getTransaction(txHash);
                    if (!tx) return;

                    parseWhaleTx(chain, tx, "mempool");
                } catch (err) {
                    console.log("🐳 Error in mempool TX:", err.message);
                }
            });

            // LISTEN TO CONFIRMED BLOCKS
            web3.eth.subscribe("newBlockHeaders", async (block) => {
                try {
                    const blockData = await web3.eth.getBlock(block.hash, true);
                    if (!blockData || !blockData.transactions) return;

                    blockData.transactions.forEach(tx => {
                        parseWhaleTx(chain, tx, "confirmed");
                    });

                } catch (err) {
                    console.log("🐳 Error in block TX:", err.message);
                }
            });

            console.log(`🐋 Whale Listener running on ${chain}`);
        });
    }
}

export default new WhaleListener();
