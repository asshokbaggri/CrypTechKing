import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopStats from "./components/TopStats";
import CountdownPanel from "./components/CountdownPanel";
import BlocksTable from "./components/BlocksTable";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <main className="space-y-16 pb-20">
        <Hero />
        <TopStats />
        <CountdownPanel />
        <BlocksTable />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
