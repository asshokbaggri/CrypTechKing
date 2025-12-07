import ENV from "./env.js";

export default {
    ETH: {
        NAME: "Ethereum",
        HTTP: ENV.ETH_HTTP,
        WS: ENV.ETH_WS
    },
    POLYGON: {
        NAME: "Polygon",
        HTTP: ENV.POLYGON_HTTP,
        WS: ENV.POLYGON_WS
    },
    BNB: {
        NAME: "BNB Chain",
        HTTP: ENV.BNB_HTTP,
        WS: ENV.BNB_WS
    }
};
