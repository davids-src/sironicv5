import React from "react";

export default function HaromHonapMini({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ width: "100%", overflowX: "auto", ...style }}>
      <svg
        viewBox="0 0 500 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", minWidth: "400px", height: "auto", fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <title>Lépcsőzetes modell folyamata (3 hónap)</title>
        
        {/* Trial period top bar */}
        <rect x="40" y="20" width="320" height="4" rx="2" fill="var(--primary)" opacity="0.2" />
        <text x="200" y="14" fill="var(--primary)" fontSize="10" fontFamily="var(--font-mono, monospace)" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">
          PRÓBAIDŐSZAK — csak havi átalánydíj
        </text>
        
        {/* Main timeline line */}
        <line x1="40" y1="80" x2="440" y2="80" stroke="var(--line)" strokeWidth="2" />
        
        {/* Station 1 */}
        <circle cx="80" cy="80" r="12" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
        <text x="80" y="84" fill="var(--ink)" fontSize="10" fontWeight="600" textAnchor="middle">1</text>
        <text x="80" y="105" fill="var(--muted)" fontSize="11" textAnchor="middle">Felmérés</text>

        {/* Station 2 */}
        <circle cx="180" cy="80" r="12" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
        <text x="180" y="84" fill="var(--ink)" fontSize="10" fontWeight="600" textAnchor="middle">2</text>
        <text x="180" y="105" fill="var(--muted)" fontSize="11" textAnchor="middle">Készletezés</text>

        {/* Station 3 */}
        <circle cx="280" cy="80" r="12" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
        <text x="280" y="84" fill="var(--ink)" fontSize="10" fontWeight="600" textAnchor="middle">3</text>
        <text x="280" y="105" fill="var(--muted)" fontSize="11" textAnchor="middle">Üzemeltetés</text>

        {/* Station 4 - Decision (Highlighted) */}
        <circle cx="380" cy="80" r="22" fill="var(--primary)" opacity="0.1" />
        <circle cx="380" cy="80" r="16" fill="var(--primary)" />
        <text x="380" y="84" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">✓</text>
        <text x="380" y="115" fill="var(--primary)" fontSize="11" fontWeight="600" textAnchor="middle">Döntés</text>

        {/* Branch Up - Contract */}
        <path d="M 380 125 L 380 140 L 480 140" stroke="var(--primary)" strokeWidth="1.5" fill="none" />
        <circle cx="480" cy="140" r="3" fill="var(--primary)" />
        <text x="390" y="135" fill="var(--primary)" fontSize="10" fontWeight="600">Marad → díj jóváírva</text>

        {/* Branch Down - No Contract */}
        <path d="M 380 125 L 380 165 L 480 165" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        <circle cx="480" cy="165" r="3" fill="var(--muted)" />
        <text x="390" y="160" fill="var(--muted)" fontSize="10">Nem marad → dokumentáció az Öné</text>
      </svg>
    </div>
  );
}
