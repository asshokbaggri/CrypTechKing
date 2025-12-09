import usePumpScanner from "../hooks/usePumpScanner";
import TableWrapper from "../components/TableWrapper";

export default function PumpScanner() {
    const coins = usePumpScanner(50);

    return (
        <div>
            <h1>🚀 Pump Scanner</h1>

            <TableWrapper>
                <table style={{ width: "100%", color: "white" }}>
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Price</th>
                            <th>1h %</th>
                            <th>Vol 24h</th>
                        </tr>
                    </thead>

                    <tbody>
                        {coins.map((c, i) => (
                            <tr key={i}>
                                <td>{c.symbol}</td>
                                <td>${c.price}</td>
                                <td style={{ color: c.change24h > 0 ? "#22c55e" : "#ef4444" }}>
                                    {c.change24h}%
                                </td>
                                <td>${c.volume24h}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableWrapper>
        </div>
    );
}
