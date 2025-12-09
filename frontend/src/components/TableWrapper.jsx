export default function TableWrapper({ children }) {
    return (
        <div
            style={{
                background: "#111418",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
                border: "1px solid #1f232d",
            }}
        >
            {children}
        </div>
    );
}
