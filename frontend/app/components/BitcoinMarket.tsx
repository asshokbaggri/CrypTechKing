"use client";

import { useEffect, useState } from "react";

type Market = {
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
};

export default function BitcoinMarket() {
  const [data, setData] = useState<Market | null>(null);

  async function load() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true",
        { cache: "no-store" }
      );
      const j = await res.json();
      setData({
        price: j.bitcoin.usd,
        change24h: j.bitcoin.usd_24h_change,
        marketCap: j.bitcoin.usd_market_cap,
        volume24h: j.bitcoin.usd_24h_vol
      });
    } catch {}
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, []);

  if (!data) {
    return <div className="card">Loading market data…</div>;
  }

  const up = data.change24h >= 0;

  return (
    <section className="section">
      <h2>Live Bitcoin Market</h2>

      <div className="grid">
        <div className="card">
          <div className="label">Price</div>
          <div className="big">${data.price.toLocaleString()}</div>
        </div>

        <div className="card">
          <div className="label">24h Change</div>
          <div className={`big ${up ? "green" : "red"}`}>
            {data.change24h.toFixed(2)}%
          </div>
        </div>

        <div className="card">
          <div className="label">Market Cap</div>
          <div className="big">
            ${Math.round(data.marketCap / 1e9)}B
          </div>
        </div>

        <div className="card">
          <div className="label">24h Volume</div>
          <div className="big">
            ${Math.round(data.volume24h / 1e9)}B
          </div>
        </div>
      </div>

      <p className="note">
        Data source: CoinGecko • updates every 60 seconds
      </p>
    </section>
  );
}
