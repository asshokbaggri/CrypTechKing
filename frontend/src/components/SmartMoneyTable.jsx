import React from "react";
import { formatTime } from "../utils/format";

export default function SmartMoneyTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "20px", color: "#bbb" }}>
        No smart money activity found.
      </div>
    );
  }

  return (
    <table style={{ width: "100%", color: "#fff", borderSpacing: 0 }}>
      <thead>
        <tr style={{ background: "#121212" }}>
          <th>Wallet</th>
          <th>Label</th>
          <th>Score</th>
          <th>Chain</th>
          <th>Buy</th>
          <th>Sell</th>
          <th>Last Active</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#0d0d12" : "#14141a" }}>
            <td>{row.wallet}</td>
            <td>{row.label}</td>
            <td>{row.score}</td>
            <td>{row.chain}</td>
            <td>{row.buy || "-"}</td>
            <td>{row.sell || "-"}</td>
            <td>{formatTime(row.lastActive)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
