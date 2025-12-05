// frontend/src/components/PumpCard.jsx

export default function PumpCard({ coin }) {
    return (
        <div className="pump-card">
            <div className="header">
                <h3>{coin.symbol}</h3>
                <span className="score">{coin.hypeScore}</span>
            </div>

            <p>Price: ${coin.price}</p>
            <p>Volume 24h: ${coin.volume24h.toLocaleString()}</p>
            <p>Liquidity: ${coin.liquidity.toLocaleString()}</p>
            <p>1h Change: {coin.priceChange1h}%</p>
        </div>
    );
}
