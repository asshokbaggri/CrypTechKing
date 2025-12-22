import { getHalvingData } from "@/lib/bitcoin";
import HalvingCountdown from "@/components/HalvingCountdown";
import HalvingStats from "@/components/HalvingStats";

export default async function Page() {
  const data = await getHalvingData();

  return (
    <main style={{ padding: "40px", maxWidth: 900, margin: "auto" }}>
      <h1>🚀 Bitcoin Halving 2028</h1>
      <p>Live blockchain-powered halving countdown</p>

      <HalvingCountdown seconds={data.secondsLeft} />
      <HalvingStats
        currentBlock={data.currentBlock}
        blocksLeft={data.blocksLeft}
      />
    </main>
  );
}
