"use client";

import { motion } from "framer-motion";
import { Globe, Shield, Cpu, Network, Wifi, Server, Lock } from "lucide-react";

export default function WanSiteDiagram() {
  const nodes = [
    { title: "WAN / Internet", desc: "Fiber + 5G Redundancy", icon: <Globe size={20} />, color: "#3B82F6" },
    { title: "Firewall (UTM)", desc: "Fortinet / Sophos / Mikrotik", icon: <Shield size={20} />, color: "#E8271A" },
    { title: "Core Switch", desc: "Managed L3 Gigabit PoE", icon: <Cpu size={20} />, color: "#E8271A" },
  ];

  const branches = [
    { title: "LAN Hálózat", desc: "Irodai végpontok & PC-k", icon: <Network size={18} /> },
    { title: "Üzleti Wi-Fi", desc: "Lehetőségek & Vendég VLAN", icon: <Wifi size={18} /> },
    { title: "Telephelyi Szerver", desc: "NAS, Adatbázis & Mentés", icon: <Server size={18} /> },
    { title: "IPsec VPN", desc: "Központi irodai kapcsolat", icon: <Lock size={18} /> },
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
        <span className="badge" style={{ marginBottom: "0.5rem" }}>TELEPHELYI TOPOLÓGIA</span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--ink)" }}>
          WAN → Tűzfal → Core Switch → Infrastruktúra Áramlás
        </h3>
      </div>

      {/* Main Flow: WAN -> FW -> Core Switch */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        {nodes.map((node, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              background: "var(--panel, #18181F)",
              border: `1px solid ${node.color}`,
              borderRadius: "10px",
              padding: "1rem 1.25rem",
              minWidth: "180px",
              textAlign: "center"
            }}>
              <div style={{ color: node.color, display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                {node.icon}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: "bold", color: "var(--ink)" }}>
                {node.title}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78125rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                {node.desc}
              </div>
            </div>

            {idx < nodes.length - 1 && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ color: "var(--accent, #E8271A)", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Vertical Connection Line */}
      <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0 1rem" }}>
        <motion.div
          style={{ width: "2px", height: "30px", background: "var(--accent, #E8271A)" }}
          animate={{ scaleY: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>

      {/* Branching Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        {branches.map((b, i) => (
          <div key={i} style={{
            background: "var(--bg, #0A0A0C)",
            border: "1px solid var(--line, #2A2A35)",
            borderRadius: "8px",
            padding: "1rem 0.75rem",
            textAlign: "center"
          }}>
            <div style={{ color: "var(--accent, #E8271A)", display: "flex", justifyContent: "center", marginBottom: "0.4rem" }}>
              {b.icon}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.875rem", fontWeight: "bold", color: "var(--ink)" }}>
              {b.title}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem" }}>
              {b.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
