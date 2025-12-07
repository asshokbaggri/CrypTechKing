export default function parseUnits(value) {
    try {
        return Number(value) / 1e18;
    } catch {
        return 0;
    }
}
