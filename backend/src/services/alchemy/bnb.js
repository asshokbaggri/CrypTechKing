import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider(process.env.BNB_HTTP);

export default provider;
