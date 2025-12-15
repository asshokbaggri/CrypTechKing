import { JsonRpcProvider } from "ethers";

export default new JsonRpcProvider(
  process.env.ALCHEMY_ETH_HTTP
);
