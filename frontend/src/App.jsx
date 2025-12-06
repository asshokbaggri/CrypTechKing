import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/index.jsx";
import Pump from "./pages/pump.jsx";
import Whales from "./pages/whales.jsx";
import Coin from "./pages/coin.jsx";
import "./styles/main.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pump" element={<Pump />} />
        <Route path="/whales" element={<Whales />} />
        <Route path="/coin/:address" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}
