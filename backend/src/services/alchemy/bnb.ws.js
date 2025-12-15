// bnb.ws.js
import { WebSocketProvider } from "ethers";

const provider = new WebSocketProvider(process.env.ALCHEMY_BNB_WS);

export default provider;
