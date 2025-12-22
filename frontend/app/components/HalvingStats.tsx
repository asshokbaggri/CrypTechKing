export default function HalvingStats({
  currentBlock,
  blocksLeft
}: {
  currentBlock: number;
  blocksLeft: number;
}) {
  return (
    <div className="card">
      <p>🧱 Current Block: <b>{currentBlock}</b></p>
      <p>⛏️ Blocks Remaining: <b>{blocksLeft}</b></p>
      <p>🎯 Halving Block: <b>1,050,000</b></p>
    </div>
  );
}
