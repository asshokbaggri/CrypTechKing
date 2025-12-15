import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_ETH_HTTP,
  network: Network.ETH_MAINNET,
});

export default alchemy;
