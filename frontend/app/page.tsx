import HalvingCountdown from "./components/HalvingCountdown";
import HalvingStats from "./components/HalvingStats";
import { getHalvingData } from "./lib/bitcoin";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getHalvingData();

  return (
    <main style={{ padding: "40px", maxWidth: 900, margin: "auto" }}>
      <h1>🚀 Bitcoin Halving Countdown</h1>
      <p>Live blockchain-powered halving tracker</p>

      <HalvingCountdown seconds={data.secondsLeft} />
      <HalvingStats
        currentBlock={data.currentBlock}
        blocksLeft={data.blocksLeft}
        secondsLeft={data.secondsLeft}
      />
    </main>
  );
}
