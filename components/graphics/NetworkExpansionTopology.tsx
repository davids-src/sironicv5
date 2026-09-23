"use client";

import { motion } from "framer-motion";
import { Cpu, Wifi, Monitor, Plus, CheckCircle2 } from "lucide-react";

export default function NetworkExpansionTopology() {
  const existingNodes = [
    { title: "Meglévő Router & Tűzfal", status: "Megtartva / Működik", icon: <Cpu size={18} /> },
    { title: "Központi Rack & Switch", status: "Kapacitás felszabadítás", icon: <Cpu size={18} /> },
    { title: "Eredeti Wi-Fi AP (Zone 1)", status: "Megtartott lefedettség", icon: <Wifi size={18} /> },
    { title: "20 db Meglévő Végpont", status: "Folyamatos működés", icon: <Monitor size={18} /> },
  ];

  const newNodes = [
    { title: "+1x High-Density PoE Switch", desc: "Új 24-portos gigabit kapacitás", icon: <Plus size={18} /> },
    { title: "+2x Wi-Fi 6 Access Point", desc: "Zökkenőmentes roaming lefedettség", icon: <Wifi size={18} /> },
    { title: "+15x Új Munkaállomási Végpont", desc: "Cat6A strukturált mérésekkel", icon: <Monitor size={18} /> },
    { title: "+1x VLAN Szegmentáció", desc: "Vendég & IoT elkülönítés", icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div style={{
      background: "var(--surface, #111116)",
      border: "1px solid var(--line, #2A2A35)",
      borderRadius: "var(--r-card, 12px)",
      padding: "2rem 1.5rem",
      boxShadow: "0 16px 40px rgba(0,0,0,0.4)"
    }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="badge" style={{ marginBottom: "0.5rem" }}>ELŐTTE / UTÁNA BŐVÍTÉS</span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--ink)" }}>
          Meglévő Struktúra Megtartása + Zökkenőmentes Új Bővítés
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Existing Infrastructure Column (Muted Grey) */}
        <div style={{
          background: "var(--panel, #18181F)",
          border: "1px solid var(--line, #2A2A35)",
          borderRadius: "10px",
          padding: "1.25rem",
          opacity: 0.8
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            fontWeight: "bold",
            color: "var(--muted, #8888A0)",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <span style={{ width: 10, height: 10, background: "#8888A0", borderRadius: "50%" }} />
            MEGLÉVŐ ELEMEK (MEGTARTVA)
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {existingNodes.map((node, i) => (
              <div key={i} style={{
                background: "var(--bg, #0A0A0C)",
                border: "1px solid var(--line, #2A2A35)",
                borderRadius: "6px",
                padding: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "var(--muted)"
              }}>
                <div>{node.icon}</div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--silver)" }}>{node.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{node.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Added Infrastructure Column (Vibrant SIRONIC Red Accent) */}
        <div style={{
          background: "var(--panel, #18181F)",
          border: "1px solid var(--accent, #E8271A)",
          borderRadius: "10px",
          padding: "1.25rem",
          boxShadow: "0 0 20px rgba(232, 39, 26, 0.15)"
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            fontWeight: "bold",
            color: "var(--accent, #E8271A)",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <span style={{ width: 10, height: 10, background: "#E8271A", borderRadius: "50%" }} />
            ÚJONNAN HOZZAÁADOTT KAPACITÁS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {newNodes.map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "rgba(232, 39, 26, 0.08)",
                  border: "1px solid rgba(232, 39, 26, 0.3)",
                  borderRadius: "6px",
                  padding: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                }}
              >
                <div style={{ color: "var(--accent, #E8271A)" }}>{node.icon}</div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: "bold", color: "var(--ink)" }}>{node.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--silver)" }}>{node.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
