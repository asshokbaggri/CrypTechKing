export default function HalvingStats({
  currentBlock,
  blocksLeft,
  secondsLeft
}: {
  currentBlock: number;
  blocksLeft: number;
  secondsLeft: number;
}) {
  const progress = Math.min(
    (currentBlock / 1_050_000) * 100,
    100
  );

  const estimatedDate = new Date(
    Date.now() + secondsLeft * 1000
  ).toDateString();

  return (
    <div className="card">
      <p>🧱 Current Block: <b>{currentBlock.toLocaleString()}</b></p>
      <p>⛏️ Blocks Remaining: <b>{blocksLeft.toLocaleString()}</b></p>
      <p>🎯 Halving Block: <b>1,050,000</b></p>
      <p>📅 Estimated Date: <b>{estimatedDate}</b></p>

      <div className="progress-wrap">
        <div className="progress-label">
          Progress: {progress.toFixed(2)}%
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
