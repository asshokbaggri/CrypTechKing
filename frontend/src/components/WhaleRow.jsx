import { shortWallet, formatTime, formatAmount } from "../utils/format.js";
import ChainBadge from "./ChainBadge";

export default function WhaleRow({ item }) {
  return (
    <div className="row">
      <ChainBadge chain={item.chain} />

      <div className="amount">
        {formatAmount(item.amount)} {item.chain}
      </div>

      <div>
        {shortWallet(item.from)} → {shortWallet(item.to)}
      </div>

      <div className="time">
        {formatTime(item.timestamp)}
      </div>
    </div>
  );
}
