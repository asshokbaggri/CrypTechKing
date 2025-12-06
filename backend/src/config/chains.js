// backend/src/config/chains.js

export default {
    ETH: {
        NAME: "Ethereum",
        // HTTP optional – future use
        HTTP: process.env.ALCHEMY_ETH_HTTP || "",
        // WebSocket for live whales
        WS: process.env.ALCHEMY_ETH_WS || ""
    },
    POLYGON: {
        NAME: "Polygon",
        HTTP: process.env.ALCHEMY_POLYGON_HTTP || "",
        WS: process.env.ALCHEMY_POLYGON_WS || ""
    },
    BNB: {
        NAME: "BNB Chain",
        HTTP: process.env.BNB_HTTP || "",
        WS: process.env.BNB_WS || ""
    }
};
