export default function AlertCard({ alert }) {
  return (
    <div className="border rounded p-4 bg-black text-white">
      <h3 className="font-bold">{alert.coin}</h3>
      <p>{alert.text}</p>
      <span className="text-sm opacity-70">
        ${alert.usd?.toLocaleString()}
      </span>
    </div>
  );
}
