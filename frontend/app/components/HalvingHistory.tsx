export default function HalvingHistory() {
  return (
    <section className="section">
      <h2>Past Bitcoin Halvings</h2>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Block Reward</th>
              <th>Price Before</th>
              <th>Peak After</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2012</td>
              <td>50 → 25 BTC</td>
              <td>$12</td>
              <td>$1,000</td>
            </tr>
            <tr>
              <td>2016</td>
              <td>25 → 12.5 BTC</td>
              <td>$650</td>
              <td>$20,000</td>
            </tr>
            <tr>
              <td>2020</td>
              <td>12.5 → 6.25 BTC</td>
              <td>$8,500</td>
              <td>$69,000</td>
            </tr>
            <tr>
              <td>2024</td>
              <td>6.25 → 3.125 BTC</td>
              <td>~$63,000</td>
              <td>TBD</td>
            </tr>
          </tbody>
        </table>

        <p className="note">
          ⚠️ Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}
