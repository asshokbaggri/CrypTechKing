import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_POLYGON_HTTP,
  network: Network.MATIC_MAINNET,
});

export default alchemy;
