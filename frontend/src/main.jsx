import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Whales from "./pages/Whales";
import Pump from "./pages/PumpScanner";
import SmartMoney from "./pages/SmartMoney";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/whales" element={<Whales />} />
        <Route path="/pump" element={<Pump />} />
        <Route path="/smartmoney" element={<SmartMoney />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  );
}
