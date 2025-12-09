export default function AppLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      {/* LEFT SIDEBAR */}
      <div style={{
        width: "240px",
        background: "#0d0d12",
        height: "100vh",
        padding: "20px",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
      }}>
        <h2>CrypTechKing</h2>
        <ul style={{ marginTop: "30px", listStyle: "none", padding: 0 }}>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/whales">Whales</a></li>
          <li><a href="/smartmoney">Smart Money</a></li>
          <li><a href="/pump">Pump Scanner</a></li>
          <li><a href="/alerts">Alerts</a></li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
