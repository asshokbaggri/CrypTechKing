import React from "react";

export default function ChainSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "8px",
        background: "#0d0d12",
        border: "1px solid #333",
        color: "#fff",
        borderRadius: 6,
      }}
    >
      <option value="all">All Chains</option>
      <option value="eth">Ethereum</option>
      <option value="bnb">BNB Chain</option>
      <option value="poly">Polygon</option>
    </select>
  );
}
