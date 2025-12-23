type Block = {
  id: string;
  height: number;
  timestamp: number;
};

async function getBlocks(): Promise<Block[]> {
  const res = await fetch("https://blockstream.info/api/blocks", {
    cache: "no-store",
  });
  return res.json();
}

export default async function BlocksTable() {
  const blocks = await getBlocks();

  return (
    <section className="card p-6">
      <h2 className="text-lg mb-4">Latest Bitcoin Blocks</h2>

      <table className="w-full text-sm">
        <thead className="muted">
          <tr>
            <th className="text-left py-2">Block Height</th>
            <th className="text-left py-2">Time Mined</th>
          </tr>
        </thead>
        <tbody>
          {blocks.slice(0, 6).map((b) => (
            <tr
              key={b.id}
              className="border-t border-white/10 hover:bg-white/5"
            >
              <td className="py-2">{b.height}</td>
              <td className="py-2">
                {new Date(b.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
