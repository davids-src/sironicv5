import SmartFormClient from "./SmartFormClient";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isHU = locale === "hu";
  return {
    title: isHU ? "Intelligens IT Igényfelmérő | SIRONIC" : "Smart IT Assessment | SIRONIC",
    description: isHU
      ? "Töltse ki az intelligens igényfelmérő kérdőívet, és kapjon hozzávetőleges IT-üzemeltetési árajánlatot online."
      : "Fill in our smart assessment form and receive an estimated IT management quote online.",
  };
}

export default async function SmartFormPage({ params }: Props) {
  const { locale } = await params;
  const isHU = locale === "hu";

  return (
    <>
      <section
        className="section bg-grid"
        style={{
          paddingTop: "calc(var(--section-gap) + 4rem)",
          paddingBottom: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: 0, right: 0,
            width: 500, height: 400,
            background: "radial-gradient(ellipse at top right, rgba(230,57,70,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
          aria-hidden
        />
        <div className="container">
          <SectionReveal>
            <span className="badge">
              {isHU ? "Digitális kapcsolódás" : "Digital Connection"}
            </span>
            <h1 className="display-2" style={{ marginBlock: "1rem 1.25rem" }}>
              {isHU ? "Intelligens Kapcsolódási Pont" : "Smart Contact Hub"}
            </h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>
              {isHU
                ? "Igényfelmérés, kapcsolatfelvétel és hibabejelentés – egy helyen. Válassza ki, mire van szüksége."
                : "Assessment, contact, and incident reporting – all in one place."}
            </p>
          </SectionReveal>
        </div>
      </section>
      <SmartFormClient />
    </>
  );
}
