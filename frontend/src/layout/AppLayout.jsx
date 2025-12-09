import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
    return (
        <div className="app-container">
            <Sidebar />

            <main className="content-wrapper">
                <Navbar />
                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
