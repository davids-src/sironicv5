import Image from "next/image";
import styles from "./ClientLogoWall.module.css";

interface Props {
  locale: string;
  title?: string;
}

const partners = [
  { name: "Magyar Darts Szövetség", image: "/partners/MDSZ.png" },
  { name: "Pervector Zrt.", image: "/partners/Pervector.png" },
  { name: "BoatHungary", image: "/partners/boathungary.jpg" },
  { name: "Bocskai Alba Flexum Kft.", image: "/partners/kai-alba-flexum.jpg" },
  { name: "Kerámia Dental", image: "/partners/keramiadental-logo.png" },
  { name: "Tűzhál Zrt.", image: "/partners/tuzhal.png" },
];

export default function ClientLogoWall({ locale, title }: Props) {
  const defaultTitle = locale === "hu" ? "Kik választották a SIRONIC-ot?" : "Who chose SIRONIC?";

  return (
    <section className={styles.section} aria-label="Client Logos">
      <div className="container">
        <h3 className={styles.title}>{title || defaultTitle}</h3>
        <div className={styles.grid}>
          {partners.map((partner, i) => (
            <div key={i} className={styles.logoCard}>
              <Image
                src={partner.image}
                alt={partner.name}
                fill
                className={styles.logoImg}
                sizes="180px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
