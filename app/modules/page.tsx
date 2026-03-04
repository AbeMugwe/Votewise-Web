"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NavMenu from "../components/Navigation";

const font = "system-ui, -apple-system, sans-serif";

export default function ModulesListPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allModules = useQuery(api.admin.getModules) ?? [];
  const modules = allModules.filter((m) => m.isPublished);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: font, color: "black" }}>
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen((v) => !v)}
        toggleDarkMode={() => {}}
        handleLogout={() => {}}
      />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>Learning Modules</h1>
        <p style={{ margin: "0 0 24px", color: "#6b7280", fontSize: 14 }}>
          Choose a module to start learning.
        </p>

        {modules.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#000000" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📚</div>
            <p>No modules available yet. Check back soon!</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {modules.map((mod) => (
            <a
              key={mod._id}
              href={`/modules/${mod._id}`}
              style={{
                background: "#fff", borderRadius: 16,
                boxShadow: "0 4px 16px rgba(0,0,0,.09)",
                overflow: "hidden", cursor: "pointer",
                border: "1.5px solid #f0f0f0",
                textDecoration: "none", color: "inherit",
                display: "block",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(0,0,0,.13)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(0,0,0,.09)";
              }}
            >
              {mod.imageUrl && (
                <img src={mod.imageUrl} alt={mod.title}
                  style={{ width: "100%", height: 140, objectFit: "cover" }} />
              )}
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "black" }}>{mod.title}</h2>
                  {mod.status === "coming_soon" && (
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 99, background: "#fef3c7", color: "#92400e" }}>
                      Coming Soon
                    </span>
                  )}
                  {mod.status === "locked" && (
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 99, background: "#f3f4f6", color: "#6b7280" }}>
                      🔒 Locked
                    </span>
                  )}
                </div>
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
                  {mod.description}
                </p>
                {mod.duration && (
                  <p style={{ margin: "0 0 10px", fontSize: 12, color: "#9ca3af" }}>⏱ {mod.duration} min</p>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span style={{
                    fontSize: 13, fontWeight: 700, color: "#14532d",
                    background: "#f0fdf4", padding: "5px 14px",
                    borderRadius: 99, border: "1px solid #86efac",
                  }}>
                    {mod.status === "locked" ? "Locked" : "Explore →"}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}