import React, { useState } from 'react';
import { FaHome, FaWhale, FaBrain, FaRocket, FaBell, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar(){
  const loc = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { to: '/dashboard', label:'Dashboard', icon: <FaHome /> },
    { to: '/whales', label:'Whales', icon: <FaWhale /> },
    { to: '/smartmoney', label:'Smart Money', icon: <FaBrain /> },
    { to: '/pump', label:'Pump Scanner', icon: <FaRocket /> },
    { to: '/alerts', label:'Alerts', icon: <FaBell /> },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${collapsed ? '' : ''}`}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="brand">CrypTechKing</div>
        <button onClick={()=>setCollapsed(!collapsed)} style={{
          background:'transparent', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:18
        }}>
          <FaBars />
        </button>
      </div>

      <nav>
        <ul className="nav-list">
          {items.map(i => (
            <li key={i.to}
                className={`nav-item ${loc.pathname.startsWith(i.to) ? 'active' : ''}`}>
              <span style={{fontSize:18}}>{i.icon}</span>
              <span className="nav-text">{i.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{marginTop:'auto', marginTop:28, opacity:.8, fontSize:13}}>© 2025 CrypTechKing</div>
    </aside>
  );
}
