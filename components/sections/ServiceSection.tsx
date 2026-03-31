import { CheckCircle2, Server, Network, ShieldCheck, Code2, Camera, Wrench, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import styles from "./ServiceSection.module.css";

type IconName = "server" | "network" | "shield" | "code" | "camera" | "repair";

const icons: Record<IconName, React.ReactNode> = {
  server:  <Server size={28} />,
  network: <Network size={28} />,
  shield:  <ShieldCheck size={28} />,
  code:    <Code2 size={28} />,
  camera:  <Camera size={28} />,
  repair:  <Wrench size={28} />,
};

interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

interface Props {
  id?: string;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  points?: string[];
  cta1?: Cta;
  cta2?: Cta;
  icon: IconName;
  alt?: boolean;
  reverse?: boolean;
}

function CtaLink({ cta, variant }: { cta: Cta; variant: "primary" | "outline" }) {
  const cls = `btn btn-${variant}`;
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {cta.label} <ExternalLink size={15} />
      </a>
    );
  }
  return (
    <Link href={cta.href} className={cls}>
      {cta.label} <ArrowRight size={15} />
    </Link>
  );
}

export default function ServiceSection({ id, badge, title, subtitle, description, points, cta1, cta2, icon, alt, reverse }: Props) {
  return (
    <section
      id={id}
      className={`section ${alt ? "section-alt" : ""} ${styles.section}`}
    >
      <div className={`container ${styles.inner} ${reverse ? styles.reverse : ""}`}>
        {/* Icon decorative panel */}
        <SectionReveal className={styles.iconPanel} delay={0.1}>
          <div className={styles.iconWrap}>
            <div className={styles.iconBox}>{icons[icon]}</div>
            <div className={styles.iconGlow} aria-hidden />
          </div>
        </SectionReveal>

        {/* Content */}
        <SectionReveal className={styles.content}>
          <span className="badge">{badge}</span>
          <h2 className={`heading-1 ${styles.title}`}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <p className={`body-lg ${styles.desc}`}>{description}</p>

          {points && points.length > 0 && (
            <ul className={styles.points}>
              {points.map((p, i) => (
                <li key={i} className={styles.point}>
                  <CheckCircle2 size={17} className={styles.check} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {(cta1 || cta2) && (
            <div className={styles.ctas}>
              {cta1 && <CtaLink cta={cta1} variant="primary" />}
              {cta2 && <CtaLink cta={cta2} variant="outline" />}
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
