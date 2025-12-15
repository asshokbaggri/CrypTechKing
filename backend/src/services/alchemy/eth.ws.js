import { WebSocketProvider } from "ethers";

const provider = new WebSocketProvider(
  process.env.ALCHEMY_ETH_WS
);

export default provider;
