import React from "react";
import Sparkline from "./Sparkline";

export default function TokenMiniChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: 100 }}>
      <Sparkline points={data} />
    </div>
  );
}
