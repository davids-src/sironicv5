"use client";

import { motion } from "framer-motion";
import { Building, ClipboardCheck, Truck, CheckCircle2 } from "lucide-react";

export default function RelocationTimelineDiagram() {
  const steps = [
    {
      num: "01",
      title: "Régi helyszín",
      desc: "Audit, címkézés & előkészítés",
      icon: <Building size={22} />,
    },
    {
      num: "02",
      title: "Átállási forgatókönyv",
      desc: "ISP, IP-cím & szállítási leltár",
      icon: <ClipboardCheck size={22} />,
    },
    {
      num: "03",
      title: "Hétvégi költöztetés",
      desc: "Leállítás, szállítás & szerelés",
      icon: <Truck size={22} />,
    },
    {
      num: "04",
      title: "Új iroda 1. munkanap",
      desc: "Mérések & helyszíni támogatás",
      icon: <CheckCircle2 size={22} />,
    },
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
        <span className="badge" style={{ marginBottom: "0.5rem" }}>KÖLTÖZÉSI FOLYAMAT</span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--ink)" }}>
          Régi iroda → Költözési forgatókönyv → Új iroda (Minimális állásidő)
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", position: "relative" }}>
        {steps.map((step, idx) => (
          <div key={idx} style={{ position: "relative", textAlign: "center" }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.12 }}
              style={{
                background: idx === 3 ? "rgba(232, 39, 26, 0.12)" : "var(--panel, #18181F)",
                border: idx === 3 ? "1px solid var(--accent, #E8271A)" : "1px solid var(--line, #2A2A35)",
                borderRadius: "10px",
                padding: "1.25rem 0.75rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: idx === 3 ? "var(--accent, #E8271A)" : "var(--muted)",
                marginBottom: "0.5rem"
              }}>
                LÉPÉS {step.num}
              </div>

              <div style={{
                color: idx === 3 ? "var(--accent, #E8271A)" : "var(--silver)",
                marginBottom: "0.75rem"
              }}>
                {step.icon}
              </div>

              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9375rem",
                fontWeight: "bold",
                color: "var(--ink)",
                marginBottom: "0.35rem"
              }}>
                {step.title}
              </div>

              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: "var(--muted)"
              }}>
                {step.desc}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
