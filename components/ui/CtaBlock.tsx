import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import styles from "./CtaBlock.module.css";

interface Props {
  title: string;
  subtitle?: string;
  cta1: { label: string; href: string; external?: boolean };
  cta2?: { label: string; href: string; external?: boolean };
}

export default function CtaBlock({ title, subtitle, cta1, cta2 }: Props) {
  return (
    <section className={`cta-section ${styles.wrap}`}>
      <div className="container">
        <h2 className={`heading-1 ${styles.title}`}>{title}</h2>
        {subtitle && <p className={`body-lg ${styles.subtitle}`}>{subtitle}</p>}
        <div className={styles.btns}>
          {cta1.external ? (
            <a href={cta1.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              {cta1.label} <ExternalLink size={16} />
            </a>
          ) : (
            <Link href={cta1.href} className="btn btn-primary btn-lg">
              {cta1.label} <ArrowRight size={16} />
            </Link>
          )}
          {cta2 && (
            cta2.external ? (
              <a href={cta2.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                {cta2.label}
              </a>
            ) : (
              <Link href={cta2.href} className="btn btn-outline btn-lg">
                {cta2.label}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
