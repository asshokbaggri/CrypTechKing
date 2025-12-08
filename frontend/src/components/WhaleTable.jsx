import React from "react";
import { formatTime } from "../utils/format";

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
        {data.map((tx, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#0d0d12" : "#14141a" }}>
            <td>{tx.chain}</td>
            <td>${formatAmount(tx.amount)}</td>
            <td>{tx.from} → {tx.to}</td>
            <td>{formatTime(tx.timestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
