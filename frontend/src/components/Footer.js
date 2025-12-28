export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} CrypTechKing 👑
        </p>

        <p className="text-[11px] text-gray-600 mt-1">
          Real-time crypto whale intelligence
        </p>
      </div>
    </footer>
  )
}
