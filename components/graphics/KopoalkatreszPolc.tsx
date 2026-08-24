import React from "react";

export default function KopoalkatreszPolc({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ width: "100%", display: "flex", justifyContent: "center", ...style }}>
      <svg
        viewBox="0 0 400 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: "400px", height: "auto", fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <title>Kopóalkatrész-készlet polc</title>

        {/* Title */}
        <text x="200" y="30" fill="var(--muted)" fontSize="12" fontWeight="600" textAnchor="middle" letterSpacing="0.1em">
          AZ ÖN RENDSZERÉHEZ
        </text>

        {/* Shelf structure */}
        <g stroke="var(--line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Vertical supports */}
          <line x1="60" y1="50" x2="60" y2="330" />
          <line x1="340" y1="50" x2="340" y2="330" />
          {/* Shelves */}
          <line x1="50" y1="120" x2="350" y2="120" />
          <line x1="50" y1="220" x2="350" y2="220" />
          <line x1="50" y1="320" x2="350" y2="320" />
        </g>

        {/* --- Top Shelf: Power Supply (Highlighted) --- */}
        <g transform="translate(80, 60)">
          <rect x="0" y="0" width="100" height="56" rx="4" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />
          {/* Fan grill */}
          <circle cx="50" cy="28" r="20" stroke="var(--primary)" strokeWidth="1.5" />
          <circle cx="50" cy="28" r="14" stroke="var(--primary)" strokeWidth="1" opacity="0.6" />
          <circle cx="50" cy="28" r="8" stroke="var(--primary)" strokeWidth="1" opacity="0.6" />
          <line x1="30" y1="28" x2="70" y2="28" stroke="var(--primary)" strokeWidth="1" opacity="0.6" />
          <line x1="50" y1="8" x2="50" y2="48" stroke="var(--primary)" strokeWidth="1" opacity="0.6" />
          
          <text x="110" y="32" fill="var(--primary)" fontSize="11" fontFamily="var(--font-mono, monospace)">PWR_SUPPLY</text>
        </g>
        
        {/* Highlight callout for Power Supply */}
        <path d="M 280 60 Q 250 50 200 70" stroke="var(--primary)" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="3 3" />
        <text x="290" y="60" fill="var(--primary)" fontSize="12" fontWeight="600">Meghibásodáskor</text>
        <text x="290" y="76" fill="var(--primary)" fontSize="12" fontWeight="600">azonnal cserélhető</text>
        
        {/* --- Middle Shelf: Storage & Memory --- */}
        <g transform="translate(80, 170)">
          {/* Storage drive */}
          <rect x="0" y="20" width="80" height="26" rx="2" fill="var(--surface)" stroke="var(--muted)" strokeWidth="1.5" />
          <circle cx="15" cy="33" r="6" stroke="var(--muted)" strokeWidth="1" />
          <line x1="35" y1="33" x2="65" y2="33" stroke="var(--muted)" strokeWidth="1" />
          <text x="0" y="10" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono, monospace)">SSD_STORAGE</text>
          
          {/* Memory module */}
          <g transform="translate(140, 26)">
            <rect x="0" y="0" width="100" height="20" rx="1" fill="var(--surface)" stroke="var(--muted)" strokeWidth="1.5" />
            <path d="M 10 20 L 10 24 M 20 20 L 20 24 M 30 20 L 30 24 M 40 20 L 40 24 M 55 20 L 55 24 M 65 20 L 65 24 M 75 20 L 75 24 M 85 20 L 85 24" stroke="var(--muted)" strokeWidth="1.5" />
            <rect x="15" y="4" width="12" height="12" fill="var(--muted)" opacity="0.2" />
            <rect x="35" y="4" width="12" height="12" fill="var(--muted)" opacity="0.2" />
            <rect x="55" y="4" width="12" height="12" fill="var(--muted)" opacity="0.2" />
            <rect x="75" y="4" width="12" height="12" fill="var(--muted)" opacity="0.2" />
            <text x="0" y="-10" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono, monospace)">RAM_MODULE</text>
          </g>
        </g>

        {/* --- Bottom Shelf: Battery --- */}
        <g transform="translate(140, 240)">
          <rect x="0" y="20" width="120" height="56" rx="4" fill="var(--surface)" stroke="var(--muted)" strokeWidth="1.5" />
          <rect x="20" y="16" width="20" height="4" fill="var(--muted)" />
          <rect x="80" y="16" width="20" height="4" fill="var(--muted)" />
          <path d="M 60 40 L 60 56 M 52 48 L 68 48" stroke="var(--muted)" strokeWidth="1.5" />
          <text x="-15" y="52" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono, monospace)">UPS_BATT</text>
        </g>

        {/* Defs for arrow */}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="var(--primary)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
