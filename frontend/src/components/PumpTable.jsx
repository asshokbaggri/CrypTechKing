import React from "react";
import { formatAmount } from "../utils/format";

export default function PumpTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "20px", color: "#bbb" }}>
        No pump coins found.
      </div>
    );
  }

  return (
    <table style={{ width: "100%", color: "#fff" }}>
      <thead>
        <tr style={{ background: "#121212" }}>
          <th>Token</th>
          <th>Price</th>
          <th>24h %</th>
          <th>Market Cap</th>
        </tr>
      </thead>

      <tbody>
        {data.map((coin, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#0d0d12" : "#14141a" }}>
            <td>{coin.token}</td>
            <td>${coin.price}</td>
            <td style={{ color: coin.change >= 0 ? "lime" : "red" }}>
              {coin.change}%
            </td>
            <td>${formatAmount(coin.marketcap)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
