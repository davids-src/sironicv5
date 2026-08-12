import styles from "./TrustMetricsBar.module.css";

interface Props {
  locale: string;
}

export default function TrustMetricsBar({ locale }: Props) {
  const isHu = locale === "hu";

  const metrics = [
    {
      value: "2021 óta",
      label: isHu ? "Tapasztalat az informatikában" : "Years of IT experience",
    },
    {
      value: "25+",
      label: isHu ? "Aktív szerződéses ügyfél" : "Active contract clients",
    },
    {
      value: "50+",
      label: isHu ? "Megvalósított IT projekt" : "Completed IT projects",
    },
    {
      value: isHu ? "1 munkanap" : "1 business day",
      label: isHu ? "Maximális válaszidő" : "Maximum response time",
    },
  ];

  return (
    <section className={styles.section} aria-label="Trust Metrics">
      <div className="container">
        <div className={styles.grid}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.number}>{metric.value}</div>
              <div className={styles.label}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
