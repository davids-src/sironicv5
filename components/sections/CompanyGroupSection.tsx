"use client";

import { ArrowRight } from "lucide-react";
import styles from "./CompanyGroupSection.module.css";

type Props = {
  locale: string;
};

export default function CompanyGroupSection({ locale }: Props) {
  const isHu = locale === "hu";

  const content = {
    eyebrow: "SIROTECH GROUP",
    h2: "Egy fal, három szakma",
    lead: isHu
      ? "Egy irodafelújításon ma három szakember dolgozik ugyanabba a falba: villanyszerelő, hálózatépítő, biztonságtechnikus. Ugyanaz a nyomvonal, három külön időpont — és a koordináció az ügyfélé."
      : "On a typical office renovation three specialists work into the same wall: an electrician, a network installer and a security technician. Same conduit run, three separate appointments — and the coordination falls to the client.",
    panel: isHu
      ? "Nálunk ez egy csapat, egy ütemezés. Ha valami nem stimmel, nincs kinek mutogatni."
      : "With us it is one team and one schedule. If something goes wrong, there is nobody to point fingers at.",
    cards: [
      {
        id: "siroved",
        name: "SIRO-VÉD",
        desc: isHu ? "Kamera, riasztó, tűzjelző" : "Cameras, alarms, fire detection",
        href: "https://siroved.hu",
        color: "#1A6BE8",
        linkText: isHu ? "Megnyitás" : "Open",
      },
      {
        id: "sirosoft",
        name: "SIROSOFT",
        desc: isHu ? "Egyedi szoftverfejlesztés" : "Custom software development",
        href: "https://sirosoft.hu",
        color: "#1AE87B",
        linkText: isHu ? "Megnyitás" : "Open",
      },
      {
        id: "sirovill",
        name: "SIROVILL",
        desc: isHu ? "Villanyszerelés, kábelezés" : "Electrical work, cabling",
        href: "https://sirovill.hu",
        color: "#F5B81C",
        linkText: isHu ? "Megnyitás" : "Open",
        soon: isHu ? "hamarosan" : "soon",
      },
    ],
  };

  const trackClick = (targetSite: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "outbound_click", {
        target_site: targetSite,
        location: "cegcsoport_szekcio",
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{content.eyebrow}</span>
          <h2 className={styles.title}>{content.h2}</h2>
          <p className={styles.lead}>{content.lead}</p>
          <div className={styles.highlightPanel}>{content.panel}</div>
        </div>

        <div className={styles.grid}>
          {content.cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              style={{ "--card-color": card.color } as React.CSSProperties}
              onClick={() => trackClick(new URL(card.href).hostname)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.dot} style={{ backgroundColor: card.color }}></div>
                <h3 className={styles.cardTitle}>{card.name}</h3>
                {card.soon && <span className={styles.soon}>({card.soon})</span>}
              </div>
              <p className={styles.cardDesc}>{card.desc}</p>
              <div className={styles.cardFooter}>
                {card.linkText} <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
