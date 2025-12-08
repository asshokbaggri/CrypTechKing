import { BrowserRouter, Routes, Route } from "react-router-dom";
import Whales from "./pages/Whales";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Whales />} />
        <Route path="/whales" element={<Whales />} />
      </Routes>
    </BrowserRouter>
  );
}
