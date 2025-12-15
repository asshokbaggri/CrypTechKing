import ethWS from "../services/alchemy/eth.ws.js";
import { ethers } from "ethers";
import { processWhaleTx } from "../services/whale.service.js";

const MIN_ETH = 50;
let started = false;

export function startEthWhaleListener() {
  if (started) return;
  started = true;

  ethWS.on("block", async (blockNumber) => {
    try {
      const block = await ethWS.getBlock(blockNumber, true);
      if (!block?.transactions) return;

      for (const tx of block.transactions) {
        if (!tx.value || tx.value === 0n) continue;

        const ethValue = Number(ethers.formatEther(tx.value));
        if (ethValue < MIN_ETH) continue;

        await processWhaleTx({
          chain: "ETH",
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethValue,
          block: blockNumber,
        });
      }
    } catch (err) {
      console.error("ETH Whale Error:", err.message);
    }
  });

  console.log("🐋 ETH Whale Listener ACTIVE (STABLE)");
}
