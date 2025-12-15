// listeners/ethWhale.listener.js
import ethWS from "../services/alchemy/eth.ws.js";
import { ethers } from "ethers";
import { processWhaleTx } from "../services/whale.service.js";

export function startEthWhaleListener() {
  ethWS.ws.on("pending", async (txHash) => {
    try {
      const tx = await ethWS.core.getTransaction(txHash);
      if (!tx || !tx.value) return;

      const ethValue = Number(ethers.formatEther(tx.value));
      if (ethValue < 50) return; // quick filter (≈ $100k)

      await processWhaleTx({
        chain: "ETH",
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethValue,
      });
    } catch (err) {
      console.error("ETH WS Error:", err.message);
    }
  });

  console.log("🐋 ETH Whale Listener ACTIVE");
}
