export default function ChainBadge({ chain }) {
    const colors = {
        ETH: "#627eea",
        BNB: "#f3ba2f",
        POLYGON: "#8247e5",
    };

    return (
        <span
            style={{
                padding: "4px 10px",
                background: colors[chain] || "#444",
                borderRadius: "8px",
                fontSize: "12px",
                color: "white",
                fontWeight: 600,
            }}
        >
            {chain}
        </span>
    );
}
