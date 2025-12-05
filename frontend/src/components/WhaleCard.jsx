// frontend/src/components/WhaleCard.jsx

export default function WhaleCard({ item }) {
    return (
        <div className="whale-card">
            <div className="top">
                <span className="chain">{item.chain}</span>
                <span className="value">${item.usdValue.toLocaleString()}</span>
            </div>

            <div className="details">
                <p>
                    <strong>From:</strong> {item.fromLabel}
                </p>
                <p>
                    <strong>To:</strong> {item.toLabel}
                </p>
            </div>

            <div className="time">
                {new Date(item.timestamp).toLocaleTimeString()}
            </div>
        </div>
    );
}
