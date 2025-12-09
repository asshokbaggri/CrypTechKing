export function shorten(addr) {
    if (!addr) return "—";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function pctColor(val) {
    if (val > 0) return "#22c55e";
    if (val < 0) return "#ef4444";
    return "#9ca3af";
}
