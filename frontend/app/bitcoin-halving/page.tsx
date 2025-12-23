import Hero from "./components/Hero";
import TopStats from "./components/TopStats";
import CountdownPanel from "./components/CountdownPanel";
import BlocksTable from "./components/BlocksTable";
import FAQ from "./components/FAQ";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6">
      {/* HERO */}
      <Hero />

      {/* TOP STRIP */}
      <TopStats />

      {/* MAIN GRID */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CountdownPanel />
        <BlocksTable />
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <FAQ />
      </section>
    </main>
  );
}
