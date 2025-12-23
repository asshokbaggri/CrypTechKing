type Block = {
  id: string;
  height: number;
  timestamp: number;
};

async function getBlocks(): Promise<Block[]> {
  const r = await fetch("https://blockstream.info/api/blocks", {
    cache: "no-store",
  });
  return r.json();
}

export default async function BlocksTable() {
  const blocks = await getBlocks();

  return (
    <section className="section">
      <div className="card p-6">
        <h2 className="text-lg mb-4">Latest Bitcoin Blocks</h2>
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-2 text-left">Height</th>
              <th className="py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {blocks.slice(0, 6).map((b) => (
              <tr key={b.id} className="border-t border-white/5">
                <td className="py-2">{b.height}</td>
                <td className="py-2">
                  {new Date(b.timestamp * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
