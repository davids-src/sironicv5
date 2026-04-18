import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("partnersTitle"), description: t("partnersDescription") };
}

const actualPartners = [
  { name: "Magyar Darts Szövetség", image: "/partners/MDSZ.png" },
  { name: "Pervector Zrt.", image: "/partners/Pervector.png" },
  { name: "BoatHungary", image: "/partners/boathungary.jpg" },
  { name: "Bocskai Alba Flexum Kft.", image: "/partners/kai Alba Flexum.jpg" },
  { name: "Kerámia Dental", image: "/partners/keramiadental-logo.png" },
  { name: "SF Security", image: "/partners/sfsecurity.svg" },
  { name: "Tűzhál Zrt.", image: "/partners/tuzhal.png" },
];

const techPartners = [
  { name: "Dahua Technology", image: "/tech_partners/Dahua_Technology_logo.jpg" },
  { name: "Dell", image: "/tech_partners/Dell_Logo-0.svg" },
  { name: "Eaton", image: "/tech_partners/Eaton_Corporation_Logo.svg.png" },
  { name: "Hikvision", image: "/tech_partners/Hikvision-Logo.wine.png" },
  { name: "MikroTik", image: "/tech_partners/MikroTik_Logo_(2022).svg.png" },
  { name: "nJoy", image: "/tech_partners/njoy.png" },
  { name: "TP-Link", image: "/tech_partners/TPLINK_Logo_2.svg.png" },
  { name: "ASUS", image: "/tech_partners/asus-logo.svg" },
  { name: "Ubiquiti UniFi", image: "/tech_partners/unifi.svg" },
];

const partnerSections = [
  { key: "ourPartners", items: actualPartners },
  { key: "techPartners", items: techPartners },
];

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });

  return (
    <>
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Együttműködők" : "Collaborators"}</span>
            <h1 className={`display-2 ${styles.heroTitle}`}>{t("title")}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{t("subtitle")}</p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      {/* Partner sections */}
      {partnerSections.map(({ key, items }, si) => (
        <section key={key} className={`section ${si % 2 !== 0 ? "section-alt" : ""}`}>
          <div className="container">
            <SectionReveal>
              <h2 className={`heading-1 ${styles.sectionTitle}`}>
                {key === "ourPartners" ? t("ourPartners") : t("techPartners")}
              </h2>
              <div className={styles.logoGrid}>
                {items.map((partner, i) => (
                  <div key={i} className={`${styles.logoSlot} ${styles.hasImage}`}>
                    <Image 
                      src={partner.image} 
                      alt={partner.name}
                      fill
                      className={styles.logoImg}
                      sizes="(max-width: 768px) 50vw, 250px"
                    />
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
      ))}

      <CtaBlock
        title={locale === "hu" ? "Érdekli a partnerség?" : "Interested in partnership?"}
        subtitle={locale === "hu" ? "Vegye fel velünk a kapcsolatot." : "Get in touch with us."}
        cta1={{ label: locale === "hu" ? "Kapcsolatfelvétel" : "Contact Us", href: `/${locale}/kapcsolat` }}
      />
    </>
  );
}
