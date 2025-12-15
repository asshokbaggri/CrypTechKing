import { WebSocketProvider } from "ethers";

const provider = new WebSocketProvider(
  process.env.ALCHEMY_ETH_WS
);

provider._websocket.on("error", (err) => {
  console.error("ETH WS error", err.message);
});

provider._websocket.on("close", () => {
  console.warn("ETH WS closed");
});

export default provider;
