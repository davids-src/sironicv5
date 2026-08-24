import React from "react";

export default function IdovonalHaromHonap({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ width: "100%", overflowX: "auto", ...style }}>
      <svg
        viewBox="0 0 800 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", minWidth: "600px", height: "auto", fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <title>Három hónapos próbaidőszak idővonal</title>
        
        {/* Trial period top bar */}
        <rect x="50" y="20" width="500" height="4" rx="2" fill="var(--primary)" opacity="0.2" />
        <text x="300" y="14" fill="var(--primary)" fontSize="12" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">
          PRÓBAIDŐSZAK — csak havi átalánydíj
        </text>
        
        {/* Main timeline line */}
        <line x1="50" y1="90" x2="700" y2="90" stroke="var(--line)" strokeWidth="2" />
        
        {/* Station 1 */}
        <circle cx="100" cy="90" r="16" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
        <text x="100" y="94" fill="var(--ink)" fontSize="12" fontWeight="600" textAnchor="middle">1</text>
        <text x="100" y="125" fill="var(--muted)" fontSize="13" textAnchor="middle">Felmérés,</text>
        <text x="100" y="145" fill="var(--muted)" fontSize="13" textAnchor="middle">dokumentáció</text>

        {/* Station 2 */}
        <circle cx="260" cy="90" r="16" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
        <text x="260" y="94" fill="var(--ink)" fontSize="12" fontWeight="600" textAnchor="middle">2</text>
        <text x="260" y="125" fill="var(--muted)" fontSize="13" textAnchor="middle">Készletezés</text>

        {/* Station 3 */}
        <circle cx="420" cy="90" r="16" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
        <text x="420" y="94" fill="var(--ink)" fontSize="12" fontWeight="600" textAnchor="middle">3</text>
        <text x="420" y="125" fill="var(--muted)" fontSize="13" textAnchor="middle">Üzemeltetés</text>

        {/* Station 4 - Decision (Highlighted) */}
        <circle cx="580" cy="90" r="28" fill="var(--primary)" opacity="0.1" />
        <circle cx="580" cy="90" r="20" fill="var(--primary)" />
        <text x="580" y="95" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">✓</text>
        <text x="580" y="130" fill="var(--primary)" fontSize="14" fontWeight="600" textAnchor="middle">Döntés</text>

        {/* Branch Up - Contract */}
        <path d="M 580 145 L 580 165 L 750 165" stroke="var(--primary)" strokeWidth="2" fill="none" />
        <circle cx="750" cy="165" r="4" fill="var(--primary)" />
        <text x="590" y="160" fill="var(--primary)" fontSize="13" fontWeight="600">Szerződés → belépési díj jóváírva</text>

        {/* Branch Down - No Contract */}
        <path d="M 580 145 L 580 195 L 750 195" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <circle cx="750" cy="195" r="4" fill="var(--muted)" />
        <text x="590" y="190" fill="var(--muted)" fontSize="13">Nem szerződik → a dokumentáció az Öné</text>
      </svg>
    </div>
  );
}
