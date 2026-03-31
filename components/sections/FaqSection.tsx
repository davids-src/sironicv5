import FaqAccordion from "@/components/ui/FaqAccordion";
import SectionReveal from "@/components/ui/SectionReveal";
import type { FaqItem } from "@/components/ui/FaqAccordion";

interface Props {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export default function FaqSection({ title, subtitle, items }: Props) {
  return (
    <section className="section section-alt" aria-labelledby="faq-heading">
      <div className="container">
        <SectionReveal>
          <h2 id="faq-heading" className="heading-1 section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <FaqAccordion items={items} />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
