"use client";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  const widths = { sm: 420, md: 560, lg: 720 };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(5,12,24,0.85)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "90%", maxWidth: widths[size],
          background: "var(--surface)",
          border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: 16,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(14,165,233,0.1)",
          animation: "fadeIn 0.25s ease",
          overflow: "hidden"
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid rgba(14,165,233,0.12)",
          background: "linear-gradient(90deg, rgba(14,165,233,0.06), transparent)"
        }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--ocean-glow)" }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "rgba(14,165,233,0.1)",
            border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: 8, color: "var(--text-secondary)",
            width: 32, height: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, transition: "all 0.15s"
          }}>×</button>
        </div>
        <div style={{ padding: "24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
