// services/alchemy/eth.ws.js
import { WebSocketProvider } from "ethers";

const ETH_WS_URL = process.env.ALCHEMY_ETH_WS;

if (!ETH_WS_URL) {
  throw new Error("❌ ALCHEMY_ETH_WS missing");
}

const provider = new WebSocketProvider(ETH_WS_URL);

export default provider;
