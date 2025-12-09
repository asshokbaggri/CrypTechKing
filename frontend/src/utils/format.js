export function shortWallet(addr) {
  return addr ? addr.slice(0, 6) + "…" : "N/A";
}

export function formatTime(ts) {
  return new Date(ts).toLocaleTimeString();
}

export function formatAmount(a) {
  return Number(a).toLocaleString();
}
