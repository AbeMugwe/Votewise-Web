"use client";

export default function ProgressBar({ pct }: { pct: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0 18px" }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#16a34a", flexShrink: 0 }} />
      <div style={{ flex: 1, height: 7, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "#16a34a", borderRadius: 99,
          transition: "width 0.5s ease",
        }} />
      </div>
    </div>
  );
}