type Block = {
  id: string;
  height: number;
  timestamp: number;
};

async function getBlocks(): Promise<Block[]> {
  const res = await fetch("https://blockstream.info/api/blocks", {
    cache: "no-store"
  });
  return res.json();
}

export default async function BlocksTable() {
  const blocks = await getBlocks();

  return (
    <div className="bg-card p-6 rounded-xl my-10">
      <h2 className="text-xl mb-4">Latest Bitcoin Blocks</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="opacity-70">
            <tr>
              <th className="text-left py-2">Height</th>
              <th className="text-left py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {blocks.slice(0, 6).map((block) => (
              <tr key={block.id} className="border-t border-white/10">
                <td className="py-2">{block.height}</td>
                <td className="py-2">
                  {new Date(block.timestamp * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
