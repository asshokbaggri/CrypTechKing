import ChainBadge from "./ChainBadge";
import { formatAmount, formatTime } from "../utils/format";

export default function WhaleRow({ tx }) {
    return (
        <tr style={{ background: "#0d0f14", borderBottom: "1px solid #1c1f26" }}>
            <td><ChainBadge chain={tx.chain} /></td>
            <td style={{ fontWeight: 600 }}>{formatAmount(tx.amount)}</td>

            <td>{tx.from?.slice(0, 6)}… → {tx.to?.slice(0, 6)}…</td>

            <td>{formatTime(tx.timestamp)}</td>
        </tr>
    );
}
