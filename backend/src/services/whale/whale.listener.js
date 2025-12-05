// backend/src/services/whale/whale.listener.js

import Web3 from "web3";
import { parseWhaleTx } from "./whale.parser.js";
import CHAINS from "../../config/chains.js";

export class WhaleListener {
    constructor() {
        this.providers = {};
    }

    initProviders() {
        Object.keys(CHAINS).forEach(chain => {
            this.providers[chain] = new Web3(
                new Web3.providers.WebsocketProvider(CHAINS[chain].WS)
            );
        });
    }

    start() {
        this.initProviders();

        Object.keys(this.providers).forEach(chain => {
            const web3 = this.providers[chain];

            // MEMPOOL LISTENER
            web3.eth.subscribe("pendingTransactions", async (txHash) => {
                try {
                    const tx = await web3.eth.getTransaction(txHash);
                    if (!tx) return;

                    parseWhaleTx(chain, tx, "mempool");
                } catch (err) {
                    console.log("Error mempool:", err);
                }
            });

            // CONFIRMED BLOCKS
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

            console.log(`Whale listener running on ${chain}`);
        });
    }
}

export default new WhaleListener();
