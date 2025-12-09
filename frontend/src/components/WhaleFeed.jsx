import { useEffect, useState } from "react";
import WhaleRow from "./WhaleRow";

export default function WhaleFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    generateDummy();
    const int = setInterval(generateDummy, 3000);
    return () => clearInterval(int);
  }, []);

  function generateDummy() {
    const chains = ["ETH", "BNB", "POLYGON"];
    const item = {
      chain: chains[Math.floor(Math.random() * chains.length)],
      amount: (Math.random() * 100).toFixed(2),
      from: "0x" + Math.random().toString(16).substring(2, 8),
      to: "0x" + Math.random().toString(16).substring(2, 8),
      timestamp: Date.now()
    };

    setFeed(f => [item, ...f].slice(0, 40));
  }

  return (
    <div>
      <div className="table-header">
        <div>Chain</div>
        <div>Amount</div>
        <div>From → To</div>
        <div>Time</div>
      </div>

      {feed.map((item, idx) => (
        <WhaleRow key={idx} item={item} />
      ))}
    </div>
  );
}
