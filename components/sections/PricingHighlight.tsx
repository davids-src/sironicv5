import Link from "next/link";
import { Zap } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import styles from "./PricingHighlight.module.css";

type Step = { step: number; text: string };

type Props = {
  locale: string;
  badge: string;
  headline: string;
  subheadline: string;
  stepsTitle: string;
  steps: Step[];
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  trustNote: string;
};

export default function PricingHighlight({
  locale,
  badge,
  headline,
  subheadline,
  stepsTitle,
  steps,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  trustNote,
}: Props) {
  return (
    <section id="calculator-highlight" aria-labelledby="calc-headline">
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {/* LEFT */}
          <SectionReveal>
            <div className={styles.left}>
              <span className="badge">
                <Zap size={13} />
                {badge}
              </span>

              <h2 id="calc-headline" className={styles.headline}>
                {headline}
              </h2>

              <p className={styles.subheadline}>{subheadline}</p>

              <div className={styles.ctas}>
                <Link href={ctaPrimaryHref} className="btn btn-primary btn-lg">
                  {ctaPrimaryLabel}
                </Link>
              </div>

              <p className={styles.trustNote}>{trustNote}</p>
            </div>
          </SectionReveal>

          {/* RIGHT – STEPS */}
          <SectionReveal>
            <div className={styles.stepsBox}>
              <p className={styles.stepsTitle}>{stepsTitle}</p>
              <div className={styles.steps}>
                {steps.map((s, i) => (
                  <>
                    <div key={s.step} className={styles.step}>
                      <div className={styles.stepNum}>{s.step}</div>
                      <p className={styles.stepText}>{s.text}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div key={`conn-${i}`} className={styles.stepConnector} />
                    )}
                  </>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
