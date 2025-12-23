import { getHalvingData } from "./lib/bitcoin";

import HalvingCountdown from "./components/HalvingCountdown";
import HalvingStats from "./components/HalvingStats";
import BitcoinMarket from "./components/BitcoinMarket";

import HalvingIntro from "./components/HalvingIntro";
import HalvingWhy from "./components/HalvingWhy";
import HalvingHistory from "./components/HalvingHistory";
import HalvingFAQ from "./components/HalvingFAQ";
import FAQSchema from "./components/FAQSchema";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getHalvingData();

  return (
    <main className="page">

      {/* ==================================================
          ZONE 1 — COMMAND CENTER (NO SCROLL IDEALLY)
          ================================================== */}
      <section className="zone zone-command">

        <header className="zone-header">
          <h1>Bitcoin Halving Countdown</h1>
          <p>Live blockchain-powered halving tracker</p>
        </header>

        {/* MAIN CONTROL STRIP */}
        <div className="control-strip">
          
          {/* BIG PRIMARY — COUNTDOWN */}
          <div className="control-primary">
            <HalvingCountdown seconds={data.secondsLeft} />
          </div>

          {/* SECONDARY — NETWORK STATS */}
          <div className="control-secondary">
            <HalvingStats
              currentBlock={data.currentBlock}
              blocksLeft={data.blocksLeft}
              secondsLeft={data.secondsLeft}
            />
          </div>

          {/* SECONDARY — MARKET */}
          <div className="control-secondary">
            <BitcoinMarket />
          </div>

        </div>
      </section>

      {/* ==================================================
          ZONE 2 — CONTEXT (EXPLANATION)
          ================================================== */}
      <section className="zone zone-context">

        <div className="context-block">
          <HalvingIntro />
        </div>

        <div className="context-block">
          <HalvingWhy />
        </div>

      </section>

      {/* ==================================================
          ZONE 3 — REFERENCE (DATA / HISTORY)
          ================================================== */}
      <section className="zone zone-reference">

        <div className="reference-block">
          <HalvingHistory />
        </div>

        <div className="reference-block">
          <HalvingFAQ />
        </div>

      </section>

      {/* SEO ONLY */}
      <FAQSchema />

    </main>
  );
}
