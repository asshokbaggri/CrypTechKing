export function formatAmount(num) {
    if (!num) return "0";
    return Number(num).toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });
}

export function formatTime(timestamp) {
    if (!timestamp) return "—";
    return new Date(timestamp * 1000).toLocaleTimeString();
}
