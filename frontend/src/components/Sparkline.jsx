export default function Sparkline({ data }) {
    const points = data.map((val, i) => `${i * 10},${50 - val}`).join(" ");

    return (
        <svg width="150" height="50">
            <polyline
                fill="none"
                stroke="#3ba7ff"
                strokeWidth="2"
                points={points}
            />
        </svg>
    );
}
