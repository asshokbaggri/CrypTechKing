async function getData() {
  const res = await fetch(
    "https://cryptechking.vercel.app/api/halving",
    { cache: "no-store" }
  );
  return res.json();
}

export default async function StatCards() {
  const data = await getData();

  return (
    <div className="grid grid-cols-2 gap-4 my-6">
      <div className="bg-card p-4">Blocks Remaining: {data.remainingBlocks}</div>
      <div className="bg-card p-4">
        Seconds Remaining: {data.remainingSeconds}
      </div>
    </div>
  );
}
