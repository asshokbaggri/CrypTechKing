async function getData() {
  const res = await fetch(
    "https://cryptechking.vercel.app/api/halving",
    { cache: "no-store" }
  );
  return res.json();
}

export default async function StatCards() {
  const data = await getData();

  const estimatedDate = new Date(
    Date.now() + data.remainingSeconds * 1000
  ).toDateString();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <Card title="Predicted Date" value={estimatedDate} />
      <Card title="Blocks Remaining" value={data.remainingBlocks.toLocaleString()} />
      <Card title="Seconds Remaining" value={data.remainingSeconds.toLocaleString()} />
      <Card title="Halving Block" value="1,050,000" />
    </section>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#121821] p-5 rounded-xl">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
