"use client";

import Link from "next/link";
import { Network, Expand, Activity, SearchCheck, ArrowRight } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import { trackCtaClick } from "@/lib/analytics";
import styles from "./HomeSolutionsSection.module.css";

interface CardItem {
  id: string;
  title: string;
  text: string;
  cta: string;
}

interface Props {
  locale: string;
  title: string;
  subtitle: string;
  cards: CardItem[];
}

export default function HomeSolutionsSection({ locale, title, subtitle, cards }: Props) {
  const getCardDetails = (id: string, idx: number) => {
    switch (id) {
      case "new-it":
        return {
          icon: <Network size={24} />,
          href: `/${locale}/${locale === "hu" ? "megoldasok" : "solutions"}`,
        };
      case "expansion":
        return {
          icon: <Expand size={24} />,
          href: `/${locale}/${locale === "hu" ? "megoldasok/halozatbovites" : "solutions/network-expansion"}`,
        };
      case "ops":
        return {
          icon: <Activity size={24} />,
          href: `/${locale}/szolgaltatasok/rendszeruzemeltetes`,
        };
      case "issue":
      default:
        return {
          icon: <SearchCheck size={24} />,
          href: `/${locale}/${locale === "hu" ? "ingyenes-felmeres" : "free-assessment"}`,
        };
    }
  };

  return (
    <section className={styles.section} id="elethelyzet-megoldasok">
      <div className="container">
        <SectionReveal>
          <div className={styles.header}>
            <span className="accent-line" style={{ margin: "0 auto 1rem" }} />
            <h2 className="heading-1">{title}</h2>
            <p className="body-lg" style={{ marginTop: "0.75rem", color: "var(--muted)" }}>
              {subtitle}
            </p>
          </div>
        </SectionReveal>

        <div className={styles.grid}>
          {cards.map((card, idx) => {
            const { icon, href } = getCardDetails(card.id, idx);
            return (
              <SectionReveal key={card.id || idx} delay={idx * 0.08}>
                <Link
                  href={href}
                  className={styles.card}
                  onClick={() => trackCtaClick(`Home 4-card: ${card.title}`, href, "home_solutions_cards", "card", "home")}
                >
                  <div className={styles.iconWrap}>{icon}</div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                  <span className={styles.cardCta}>
                    {card.cta} <ArrowRight size={14} />
                  </span>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
