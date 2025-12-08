import "../styles/whales.css";
import WhaleFeed from "../components/WhaleFeed";

export default function Whales() {
  return (
    <div className="feed-container">
      <h1>🐳 Real-Time Whale Tracker</h1>

      <div className="card">
        <WhaleFeed />
      </div>
    </div>
  );
}
