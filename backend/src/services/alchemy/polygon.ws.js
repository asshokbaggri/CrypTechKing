// polygon.ws.js
import { Alchemy, Network } from "alchemy-sdk";

export default new Alchemy({
  apiKey: process.env.ALCHEMY_POLYGON_WS,
  network: Network.MATIC_MAINNET,
});
