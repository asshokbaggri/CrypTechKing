import dotenv from "dotenv";
dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URL || "",

    ETH_HTTP: process.env.ALCHEMY_ETH_HTTP || "",
    ETH_WS: process.env.ALCHEMY_ETH_WS || "",

    POLYGON_HTTP: process.env.ALCHEMY_POLYGON_HTTP || "",
    POLYGON_WS: process.env.ALCHEMY_POLYGON_WS || "",

    BNB_HTTP: process.env.BNB_HTTP || "",
    BNB_WS: process.env.BNB_WS || ""
};
