import HalvingCountdown from "./components/HalvingCountdown";
import HalvingStats from "./components/HalvingStats";
import { getHalvingData } from "./lib/bitcoin";

import HalvingIntro from "./components/HalvingIntro";
import HalvingWhy from "./components/HalvingWhy";
import HalvingHistory from "./components/HalvingHistory";
import BitcoinMarket from "./components/BitcoinMarket";
import HalvingFAQ from "./components/HalvingFAQ";
import FAQSchema from "./components/FAQSchema";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getHalvingData();

  return (
    <main className="page">

      {/* ================= HERO DASHBOARD ================= */}
      <section className="hero-grid">

        {/* LEFT : Countdown */}
        <div className="hero-left">
          <h1>🚀 Bitcoin Halving Countdown</h1>
          <p>Live blockchain-powered halving tracker</p>

          <HalvingCountdown seconds={data.secondsLeft} />
        </div>

        {/* RIGHT : Stats + Market */}
        <div className="hero-right">
          <HalvingStats
            currentBlock={data.currentBlock}
            blocksLeft={data.blocksLeft}
            secondsLeft={data.secondsLeft}
          />

          <BitcoinMarket />
        </div>

      </section>

      {/* ================= CONTENT SECTIONS ================= */}
      <section className="section">
        <HalvingIntro />
      </section>

      <section className="section">
        <HalvingWhy />
      </section>

      <section className="section">
        <HalvingHistory />
      </section>

      <section className="section">
        <HalvingFAQ />
      </section>

      {/* SEO only */}
      <FAQSchema />

    </main>
  );
}
