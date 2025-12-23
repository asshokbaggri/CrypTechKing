export default function Navbar() {
  return (
    <nav className="border-b border-white/5 backdrop-blur">
      <div className="section h-14 flex items-center justify-between">
        <div className="font-bold text-lg">
          ₿ <span className="text-green-400">CrypTechKing</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-gray-400">
          <span>Home</span>
          <span>Bitcoin</span>
          <span>Halving</span>
        </div>
      </div>
    </nav>
  );
}
