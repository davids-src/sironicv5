import { useTranslations } from "next-intl";
import { FileText, PackageCheck, RotateCcw, ArrowRight } from "lucide-react";
import SectionTracker from "@/components/ui/SectionTracker";
import TrackedLink from "@/components/ui/TrackedLink";
import SectionReveal from "@/components/ui/SectionReveal";
import HaromHonapMini from "@/components/graphics/HaromHonapMini";
import styles from "./HomeTrialSection.module.css";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={20} strokeWidth={1.5} />,
  PackageCheck: <PackageCheck size={20} strokeWidth={1.5} />,
  RotateCcw: <RotateCcw size={20} strokeWidth={1.5} />,
};

interface Props {
  locale: string;
}

export default function HomeTrialSection({ locale }: Props) {
  const t = useTranslations("homeTrialModel");
  const pillars = t.raw("pillars") as Array<{ icon: string; title: string; text: string }>;

  return (
    <SectionTracker id="lepcsozetes_modell_mini" page="fooldal">
      {/* We use "section-alt" to maintain rhythm between FreeAssessment (section) and PricingHighlight (section). Wait, FreeAssessment full variant is section, PricingHighlight is section-alt? We'll see. We'll use "section section-alt" */}
      <section className={`section section-alt ${styles.section}`}>
        <div className={`container ${styles.inner}`}>
          <SectionReveal>
            <div>
              <span className={styles.eyebrow}>{t("eyebrow")}</span>
              <h2 className={`heading-2 ${styles.title}`}>{t("h2")}</h2>
              <p className={`body-lg ${styles.lead}`}>{t("lead")}</p>

              <div className={styles.pillars}>
                {pillars.map((pillar, i) => (
                  <div key={i} className={styles.pillar}>
                    <div className={styles.iconWrap}>
                      {iconMap[pillar.icon]}
                    </div>
                    <div>
                      <p className={styles.pillarTitle}>{pillar.title}</p>
                      <p className={styles.pillarText}>{pillar.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <TrackedLink
                href={`/${locale}/szolgaltatasok/rendszeruzemeltetes`}
                className="btn btn-outline"
                ctaLocation="fooldal_lepcsozetes_mini"
                ctaLabel={t("cta")}
              >
                {t("cta")} <ArrowRight size={16} />
              </TrackedLink>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <HaromHonapMini />
          </SectionReveal>
        </div>
      </section>
    </SectionTracker>
  );
}
