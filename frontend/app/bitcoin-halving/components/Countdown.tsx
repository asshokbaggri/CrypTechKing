return (
  <section className="bg-[#121821] rounded-xl p-6 text-center mb-12">
    <h2 className="text-gray-400 mb-4">Estimated Time Remaining</h2>

    <div className="grid grid-cols-4 gap-4 text-3xl font-bold">
      <TimeBox label="Days" value={days} />
      <TimeBox label="Hours" value={hours} />
      <TimeBox label="Minutes" value={minutes} />
      <TimeBox label="Seconds" value={seconds} />
    </div>
  </section>
);

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div>{value}</div>
      <div className="text-sm text-gray-400 font-normal">{label}</div>
    </div>
  );
}
