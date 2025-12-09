import WhaleRow from "./WhaleRow";
import TableWrapper from "./TableWrapper";

export default function WhaleFeed({ data }) {
    return (
        <TableWrapper>
            <table style={{ width: "100%", color: "#fff" }}>
                <thead>
                    <tr style={{ background: "#14181f" }}>
                        <th>Chain</th>
                        <th>Amount</th>
                        <th>From → To</th>
                        <th>Time</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ padding: 20, color: "#777" }}>
                                No transactions found.
                            </td>
                        </tr>
                    ) : (
                        data.map((tx, i) => (
                            <WhaleRow key={i} tx={tx} />
                        ))
                    )}
                </tbody>
            </table>
        </TableWrapper>
    );
}
