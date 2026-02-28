"use client";

export default function BackArrow({ href }: { href: string }) {
  return (
    <a href={href} style={{
      background: "none", border: "none", cursor: "pointer",
      color: "#16a34a", padding: 0,
      display: "flex", alignItems: "center", textDecoration: "none",
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </a>
  );
}