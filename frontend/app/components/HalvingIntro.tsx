export default function HalvingIntro() {
  return (
    <section className="section">
      <h2>What is Bitcoin Halving?</h2>

      <div className="grid">
        <div className="card">
          <h3>🪙 Supply Reduction</h3>
          <p>
            Bitcoin Halving is a programmed event that cuts the mining reward
            in half every 210,000 blocks, reducing new Bitcoin supply.
          </p>
        </div>

        <div className="card">
          <h3>⏱ Happens Every 4 Years</h3>
          <p>
            On average, Bitcoin halves every four years based on block height,
            not on a fixed calendar date.
          </p>
        </div>

        <div className="card">
          <h3>🔐 Fixed Supply</h3>
          <p>
            Halving enforces Bitcoin’s 21 million supply cap, making it
            scarce and deflationary by design.
          </p>
        </div>
      </div>
    </section>
  );
}
