import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Whales from "./pages/Whales";
import SmartMoney from "./pages/SmartMoney";
import Pump from "./pages/Pump";
import Alerts from "./pages/Alerts";
import TokenPage from "./pages/TokenPage";

export default function App() {
    return (
        <BrowserRouter>
            <DashboardLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/whales" element={<Whales />} />
                    <Route path="/smartmoney" element={<SmartMoney />} />
                    <Route path="/pump" element={<Pump />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/token/:address" element={<TokenPage />} />
                </Routes>
            </DashboardLayout>
        </BrowserRouter>
    );
}
