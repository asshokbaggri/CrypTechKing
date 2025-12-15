// eth.ws.js
import { WebSocketProvider } from "ethers";

export default new Alchemy({
  apiKey: process.env.ALCHEMY_ETH_WS,
  network: Network.ETH_MAINNET,
});
