import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Whales from "./pages/Whales.jsx";
import Pump from "./pages/Pump.jsx";
import Token from "./pages/Token.jsx";

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
