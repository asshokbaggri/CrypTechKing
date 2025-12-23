import Hero from "./components/Hero";
import StatCards from "./components/StatCards";
import BTCPriceLive from "./components/BTCPriceLive";
import Countdown from "./components/Countdown";
import BlocksTable from "./components/BlocksTable";
import FAQ from "./components/FAQ";

export default function Page() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <Hero />
      <BTCPriceLive />
      <StatCards />
      <Countdown />
      <BlocksTable />
      <FAQ />
    </main>
  );
}
