import dotenv from "dotenv";
dotenv.config();

export default {
    MONGO_URL: process.env.MONGO_URL,

    ALCHEMY_ETH_HTTP: process.env.ALCHEMY_ETH_HTTP,
    ALCHEMY_ETH_WS: process.env.ALCHEMY_ETH_WS,

    ALCHEMY_POLYGON_HTTP: process.env.ALCHEMY_POLYGON_HTTP,
    ALCHEMY_POLYGON_WS: process.env.ALCHEMY_POLYGON_WS,

    BNB_HTTP: process.env.BNB_HTTP,
    BNB_WS: process.env.BNB_WS
};
