import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Whales from "./pages/Whales";
import Pump from "./pages/Pump";
import Token from "./pages/Token";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/whales" element={<Whales />} />
        <Route path="/pump" element={<Pump />} />
        <Route path="/token/:address" element={<Token />} />
      </Routes>
    </BrowserRouter>
  );
}
