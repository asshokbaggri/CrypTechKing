import React from "react";
import format from "../utils/format";

export default function WhaleTable({ data }) {
    if (!data || data.length === 0) {
        return (
            <div style={{ padding: "20px", color: "#bbb" }}>
                No whale transactions found.
            </div>
        );
    }

    return (
        <table style={{ width: "100%", color: "#fff", borderSpacing: 0 }}>
            <thead>
                <tr style={{ background: "#121212" }}>
                    <th>Chain</th>
                    <th>Amount</th>
                    <th>From → To</th>
                    <th>Time</th>
                </tr>
            </thead>

            <tbody>
                {data.map((w, i) => (
                    <tr
                        key={i}
                        style={{
                            background: i % 2 === 0 ? "#0d0d12" : "#141414",
                        }}
                    >
                        <td>
                            <span className="badge badge-whale">{w.chain}</span>
                        </td>

                        <td><strong>{format(w.amount)}</strong></td>

                        <td>
                            {w.from?.slice(0, 6)}… → {w.to?.slice(0, 6)}…
                        </td>

                        <td>{new Date(w.timestamp * 1000).toLocaleTimeString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
