import useSmartMoney from "../hooks/useSmartMoney";
import TableWrapper from "../components/TableWrapper";

export default function SmartMoney() {
    const stats = useSmartMoney();

    return (
        <div>
            <h1>🧠 Smart Money Overview</h1>

            {!stats ? (
                <p>Loading...</p>
            ) : (
                <TableWrapper>
                    <h3>24h Summary</h3>
                    <p><strong>Top Buyers:</strong> {stats.buyers}</p>
                    <p><strong>Top Sellers:</strong> {stats.sellers}</p>
                    <p><strong>Active Wallets:</strong> {stats.active}</p>
                </TableWrapper>
            )}
        </div>
    );
}
