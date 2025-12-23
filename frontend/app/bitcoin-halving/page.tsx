import Hero from "./components/Hero";
import StatCards from "./components/StatCards";
import BTCPriceLive from "./components/BTCPriceLive";
import Countdown from "./components/Countdown";
import BlocksTable from "./components/BlocksTable";
import FAQ from "./components/FAQ";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-14">
      <Hero />
      <BTCPriceLive />
      <StatCards />
      <Countdown />
      <BlocksTable />
      <FAQ />
    </main>
  );
}
