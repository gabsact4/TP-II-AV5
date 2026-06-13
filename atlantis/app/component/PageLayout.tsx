import { ReactNode } from "react";
import Navbar from "./Navbar/navbar";

export default function PageLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ocean-deep)" }}>
      <Navbar />
      <main style={{ marginLeft: 240, flex: 1, padding: "32px 36px", minHeight: "100vh" }} className="ocean-bg">
        <div style={{ marginBottom: 28, borderBottom: "1px solid rgba(14,165,233,0.1)", paddingBottom: 20 }}>
          <h1 className="section-title">{title}</h1>
          {subtitle && <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>{subtitle}</p>}
        </div>
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
