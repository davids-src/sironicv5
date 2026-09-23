"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw, AlertOctagon } from "lucide-react";

export default function ModernizationAuditGraphic() {
  const layers = [
    {
      category: "1. MEG TARTANDÓ ELEMEK (KEEP)",
      color: "#1AE87B",
      bg: "rgba(26, 232, 123, 0.08)",
      border: "rgba(26, 232, 123, 0.3)",
      icon: <CheckCircle2 size={20} />,
      title: "Jól működő hardverek és bevált szoftverek",
      desc: "Strukturált Cat6 kábelezés, rack szekrény, modern monitorok, működő licencelt egyedi üzleti szoftverek."
    },
    {
      category: "2. KORSZERŰSÍTENDŐ ELEMEK (IMPROVE)",
      color: "#F59E0B",
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.3)",
      icon: <RefreshCw size={20} />,
      title: "Hardveres / szoftveres szintlépést igénylő elemek",
      desc: "Lassú HDD-k cseréje NVMe SSD-re, Wi-Fi 6 AP frissítés, helyi levelezés migrálása Microsoft 365 / Exchange Cloudba."
    },
    {
      category: "3. CSERÉLENDŐ / KRITIKUS ELEMEK (REPLACE)",
      color: "#E8271A",
      bg: "rgba(232, 39, 26, 0.08)",
      border: "rgba(232, 39, 26, 0.4)",
      icon: <AlertOctagon size={20} />,
      title: "Biztonsági kockázatot és szűk keresztmetszetet jelentő eszközök",
      desc: "Nem támogatott Windows 7/8/Server 2012 rendszerek, nem menedzselhető 'sima' switchek, lejárt tűzfali licencek."
    }
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
        <span className="badge" style={{ marginBottom: "0.5rem" }}>KORSZERŰSÍTÉSI AUDIT MÁTRIX</span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--ink)" }}>
          Megtartás → Korszerűsítés → Cserélés (Háromrétegű felmérés)
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {layers.map((layer, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{
              background: layer.bg,
              border: `1px solid ${layer.border}`,
              borderRadius: "10px",
              padding: "1.25rem 1.5rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1.25rem"
            }}
          >
            <div style={{ color: layer.color, marginTop: "0.15rem", flexShrink: 0 }}>
              {layer.icon}
            </div>

            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: layer.color,
                marginBottom: "0.25rem"
              }}>
                {layer.category}
              </div>

              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "var(--ink)",
                marginBottom: "0.35rem"
              }}>
                {layer.title}
              </div>

              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--silver, #C0C0D0)",
                lineHeight: 1.5
              }}>
                {layer.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
