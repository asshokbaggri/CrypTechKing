import ENV from "./env.js";

export default {
    ETH: {
        HTTP: ENV.ALCHEMY_ETH_HTTP || "",
        WS: ENV.ALCHEMY_ETH_WS || ""
    },
    POLYGON: {
        HTTP: ENV.ALCHEMY_POLYGON_HTTP || "",
        WS: ENV.ALCHEMY_POLYGON_WS || ""
    },
    BNB: {
        HTTP: ENV.BNB_HTTP || "",
        WS: ENV.BNB_WS || ""
    }
};
