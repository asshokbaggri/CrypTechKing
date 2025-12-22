import HalvingCountdown from "./components/HalvingCountdown";
import HalvingStats from "./components/HalvingStats";
import { getHalvingData } from "./lib/bitcoin";

import HalvingIntro from "./components/HalvingIntro";
import HalvingWhy from "./components/HalvingWhy";
import HalvingHistory from "./components/HalvingHistory";

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

      {/* Phase 2 sections */}
      <HalvingIntro />
      <HalvingWhy />
      <HalvingHistory />
    </main>
  );
}
