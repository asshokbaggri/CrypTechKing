import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppLayout({ children }){
  return (
    <div className="app-wrap">
      <Sidebar />
      <div style={{flex:1}}>
        <div style={{padding:'18px 32px'}}>
          <Navbar />
        </div>
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}
