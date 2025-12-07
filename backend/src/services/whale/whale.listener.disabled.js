// backend/src/services/whale/whale.listener.js

import Web3 from "web3";
import { parseWhaleTx } from "./whale.parser.js";
import CHAINS from "../../config/chains.js";

export class WhaleListener {
    constructor() {
        this.providers = {};
    }

    createWeb3(chain) {
        const wsUrl = CHAINS[chain]?.WS;

        if (!wsUrl) {
            console.log(`⚠️  No WS URL configured for ${chain}. Skipping whale listener on this chain.`);
            return null;
        }

        console.log(`🔌 Creating WS provider for ${chain}: ${wsUrl}`);

        const provider = new Web3.providers.WebsocketProvider(wsUrl, {
            reconnect: {
                auto: true,
                delay: 5000,
                maxAttempts: Infinity,
                onTimeout: false
            }
        });

        // Handle low-level WS errors so process crash na ho
        provider.on("error", (err) => {
            console.log(`❌ WS Error on ${chain}:`, err?.message || err);
        });

        provider.on("end", (err) => {
            console.log(`⚠️  WS connection ended on ${chain}:`, err?.message || err);
        });

        const web3 = new Web3(provider);

        return web3;
    }

    initProviders() {
        Object.keys(CHAINS).forEach((chain) => {
            const web3 = this.createWeb3(chain);
            if (!web3) return;

            this.providers[chain] = web3;
        });
    }

    start() {
        this.initProviders();

        Object.keys(this.providers).forEach((chain) => {
            const web3 = this.providers[chain];

            // === MEMPOOL LISTENER ===
            try {
                web3.eth
                    .subscribe("pendingTransactions")
                    .on("data", async (txHash) => {
                        try {
                            const tx = await web3.eth.getTransaction(txHash);
                            if (!tx) return;

                            parseWhaleTx(chain, tx, "mempool");
                        } catch (err) {
                            console.log(`🐋 Error in mempool handler (${chain}):`, err.message || err);
                        }
                    })
                    .on("error", (err) => {
                        console.log(`❌ WS mempool subscription error on ${chain}:`, err?.message || err);
                    });
            } catch (err) {
                console.log(`❌ Failed to subscribe to pendingTransactions on ${chain}:`, err.message || err);
            }

            // === CONFIRMED BLOCK LISTENER ===
            try {
                web3.eth
                    .subscribe("newBlockHeaders")
                    .on("data", async (block) => {
                        try {
                            const blockData = await web3.eth.getBlock(block.hash, true);
                            if (!blockData || !blockData.transactions) return;

                            blockData.transactions.forEach((tx) => {
                                parseWhaleTx(chain, tx, "confirmed");
                            });
                        } catch (err) {
                            console.log(`📦 Error in block handler (${chain}):`, err.message || err);
                        }
                    })
                    .on("error", (err) => {
                        console.log(`❌ WS block subscription error on ${chain}:`, err?.message || err);
                    });
            } catch (err) {
                console.log(`❌ Failed to subscribe to newBlockHeaders on ${chain}:`, err.message || err);
            }

            console.log(`✅ Whale listener running on ${chain}`);
        });
    }
}

export default new WhaleListener();
