import { WebSocketProvider } from "ethers";

const provider = new WebSocketProvider(
  process.env.ALCHEMY_POLYGON_WS
);

export default provider;
