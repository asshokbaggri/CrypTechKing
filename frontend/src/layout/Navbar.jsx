import React from 'react';

export default function Navbar(){
  return (
    <header className="topbar">
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        {/* optional logo or left brand removed to prevent duplication */}
      </div>

      <div style={{display:'flex',alignItems:'center', gap: 12}}>
        <div className="live-badge">• Live Data</div>
      </div>
    </header>
  );
}
