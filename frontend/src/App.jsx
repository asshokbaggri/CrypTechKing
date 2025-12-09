import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Whales from "./pages/Whales";
import SmartMoney from "./pages/SmartMoney";
import PumpScanner from "./pages/PumpScanner";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/whales" element={<Whales />} />
          <Route path="/smartmoney" element={<SmartMoney />} />
          <Route path="/pump" element={<PumpScanner />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

