// eth.http.js
import { Alchemy, Network } from "alchemy-sdk";

export default new Alchemy({
  apiKey: process.env.ALCHEMY_ETH_HTTP,
  network: Network.ETH_MAINNET,
});
