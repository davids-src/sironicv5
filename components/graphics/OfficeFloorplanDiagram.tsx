"use client";

import { motion } from "framer-motion";
import { Server, Wifi, Monitor, Shield, Cpu } from "lucide-react";

export default function OfficeFloorplanDiagram() {
  return (
    <div style={{
      background: "var(--surface, #111116)",
      border: "1px solid var(--line, #2A2A35)",
      borderRadius: "var(--r-card, 12px)",
      padding: "2rem 1.5rem",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 16px 40px rgba(0,0,0,0.4)"
    }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span className="badge" style={{ marginBottom: "0.5rem" }}>TOPOLÓGIA & ALAPRAJZ</span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--ink)" }}>
          Új Iroda IT Infrastruktúra & Adatáramlás
        </h3>
      </div>

      <svg
        viewBox="0 0 800 440"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Office Floorplan Network Topology Diagram"
      >
        <defs>
          <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8271A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E8271A" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="apCoverage" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8271A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E8271A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Wall Boundary */}
        <rect x="20" y="20" width="760" height="400" rx="12" fill="#18181F" stroke="#2A2A35" strokeWidth="2" />

        {/* Room Dividers */}
        <line x1="260" y1="20" x2="260" y2="420" stroke="#2A2A35" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="260" y1="220" x2="780" y2="220" stroke="#2A2A35" strokeWidth="2" strokeDasharray="6 6" />

        {/* Room Labels */}
        <text x="40" y="50" fill="#8888A0" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold">
          SZERVERSZOBA & FIREWALL
        </text>
        <text x="280" y="50" fill="#8888A0" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold">
          NYÍLT IRODATÉR (OPEN SPACE)
        </text>
        <text x="280" y="250" fill="#8888A0" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold">
          VEZETŐI IRODÁK & TÁRGYALÓ
        </text>

        {/* Server Room Rack & Firewall (Left zone) */}
        <rect x="50" y="90" width="160" height="260" rx="8" fill="#111116" stroke="#E8271A" strokeWidth="1.5" />
        <text x="130" y="115" textAnchor="middle" fill="#F0F0F5" fontSize="13" fontWeight="bold">19&quot; RACK CABINET</text>
        
        {/* Sub-components in Rack */}
        <rect x="70" y="130" width="120" height="35" rx="4" fill="#18181F" stroke="#2A2A35" />
        <text x="130" y="152" textAnchor="middle" fill="#C0C0D0" fontSize="11">ISP Fiber + Fortinet FW</text>

        <rect x="70" y="175" width="120" height="35" rx="4" fill="#18181F" stroke="#2A2A35" />
        <text x="130" y="197" textAnchor="middle" fill="#C0C0D0" fontSize="11">Core Switch 48-PoE</text>

        <rect x="70" y="220" width="120" height="35" rx="4" fill="#18181F" stroke="#2A2A35" />
        <text x="130" y="242" textAnchor="middle" fill="#C0C0D0" fontSize="11">NAS Backup & M365</text>

        <rect x="70" y="265" width="120" height="35" rx="4" fill="#18181F" stroke="#2A2A35" />
        <text x="130" y="287" textAnchor="middle" fill="#C0C0D0" fontSize="11">Online UPS 1500VA</text>

        {/* Wi-Fi AP Coverage Circles */}
        <circle cx="520" cy="120" r="90" fill="url(#apCoverage)" />
        <circle cx="520" cy="320" r="90" fill="url(#apCoverage)" />

        {/* Access Points */}
        <circle cx="520" cy="120" r="18" fill="#E8271A" />
        <text x="520" y="125" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">AP-01</text>

        <circle cx="520" cy="320" r="18" fill="#E8271A" />
        <text x="520" y="325" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">AP-02</text>

        {/* Animated Data Paths (Red Lines) */}
        <motion.path
          d="M 190 192 L 520 120"
          stroke="#E8271A"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          fill="none"
          animate={{ strokeDashoffset: [24, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        <motion.path
          d="M 190 192 L 520 320"
          stroke="#E8271A"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          fill="none"
          animate={{ strokeDashoffset: [24, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />

        {/* Workstations - Open Space (Top Right) */}
        {[
          { x: 340, y: 100, id: "WS-01" },
          { x: 420, y: 100, id: "WS-02" },
          { x: 620, y: 100, id: "WS-03" },
          { x: 700, y: 100, id: "WS-04" },
        ].map((ws) => (
          <g key={ws.id}>
            <rect x={ws.x - 20} y={ws.y - 15} width="40" height="30" rx="4" fill="#2A2A35" stroke="#C0C0D0" />
            <text x={ws.x} y={ws.y + 4} textAnchor="middle" fill="#FFF" fontSize="9">{ws.id}</text>
            <path
              d={`M 190 192 Q ${ws.x} 190 ${ws.x} ${ws.y + 15}`}
              stroke="#E8271A"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              fill="none"
            />
          </g>
        ))}

        {/* Workstations - Executive & Meeting Room (Bottom Right) */}
        {[
          { x: 380, y: 320, id: "TÁRGYALÓ" },
          { x: 660, y: 320, id: "CEO WS" },
        ].map((ws) => (
          <g key={ws.id}>
            <rect x={ws.x - 30} y={ws.y - 15} width="60" height="30" rx="4" fill="#2A2A35" stroke="#C0C0D0" />
            <text x={ws.x} y={ws.y + 4} textAnchor="middle" fill="#FFF" fontSize="9">{ws.id}</text>
          </g>
        ))}
      </svg>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem", fontSize: "0.8125rem", color: "var(--muted)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ width: 12, height: 12, background: "#E8271A", borderRadius: "50%" }} />
          <span>Strukturált Gigabit Hálózat & PoE AP-k</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ width: 12, height: 12, background: "#2A2A35", border: "1px solid #C0C0D0", borderRadius: 2 }} />
          <span>Munkaállomások & Microsoft 365 Végpontok</span>
        </div>
      </div>
    </div>
  );
}
