import { getTranslations } from "next-intl/server";
import SmartFormClient from "./SmartFormClient";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("smartFormTitle"), description: t("smartFormDescription") };
}

export default async function SmartFormPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "smartForm" });

  // Pass all messages needed to the client component
  const messages = {
    title: t("title"),
    subtitle: t("subtitle"),
    tabs: {
      contact: t("tabs.contact"),
      assessment: t("tabs.assessment"),
      incident: t("tabs.incident"),
    },
    contact: {
      title: t("contact.title"),
      subtitle: t("contact.subtitle"),
      name: t("contact.name"),
      email: t("contact.email"),
      phone: t("contact.phone"),
      company: t("contact.company"),
      message: t("contact.message"),
      submit: t("contact.submit"),
      success: t("contact.success"),
      namePlaceholder: t("contact.namePlaceholder"),
      emailPlaceholder: t("contact.emailPlaceholder"),
      phonePlaceholder: t("contact.phonePlaceholder"),
      companyPlaceholder: t("contact.companyPlaceholder"),
      messagePlaceholder: t("contact.messagePlaceholder"),
    },
    assessment: {
      title: t("assessment.title"),
      subtitle: t("assessment.subtitle"),
      step: t("assessment.step"),
      of: t("assessment.of"),
      next: t("assessment.next"),
      back: t("assessment.back"),
      submit: t("assessment.submit"),
      steps: {
        companySize: {
          question: t("assessment.steps.companySize.question"),
          options: t.raw("assessment.steps.companySize.options") as string[],
        },
        devices: {
          question: t("assessment.steps.devices.question"),
          options: t.raw("assessment.steps.devices.options") as string[],
        },
        serverRoom: {
          question: t("assessment.steps.serverRoom.question"),
          options: t.raw("assessment.steps.serverRoom.options") as string[],
        },
        priority: {
          question: t("assessment.steps.priority.question"),
          options: t.raw("assessment.steps.priority.options") as string[],
        },
        contact: {
          question: t("assessment.steps.contact.question"),
          name: t("assessment.steps.contact.name"),
          email: t("assessment.steps.contact.email"),
          phone: t("assessment.steps.contact.phone"),
          namePlaceholder: t("assessment.steps.contact.namePlaceholder"),
          emailPlaceholder: t("assessment.steps.contact.emailPlaceholder"),
          phonePlaceholder: t("assessment.steps.contact.phonePlaceholder"),
        },
      },
      result: {
        title: t("assessment.result.title"),
        disclaimer: t("assessment.result.disclaimer"),
        monthly: t("assessment.result.monthly"),
        contact: t("assessment.result.contact"),
        restart: t("assessment.result.restart"),
      },
    },
    incident: {
      title: t("incident.title"),
      subtitle: t("incident.subtitle"),
      name: t("incident.name"),
      email: t("incident.email"),
      phone: t("incident.phone"),
      company: t("incident.company"),
      description: t("incident.description"),
      urgency: t("incident.urgency"),
      urgencyOptions: {
        low: t("incident.urgencyOptions.low"),
        medium: t("incident.urgencyOptions.medium"),
        high: t("incident.urgencyOptions.high"),
      },
      submit: t("incident.submit"),
      success: t("incident.success"),
      descriptionPlaceholder: t("incident.descriptionPlaceholder"),
      namePlaceholder: t("incident.namePlaceholder"),
      emailPlaceholder: t("incident.emailPlaceholder"),
      phonePlaceholder: t("incident.phonePlaceholder"),
      companyPlaceholder: t("incident.companyPlaceholder"),
    },
  };

  return (
    <>
      <section className="section bg-grid" style={{ paddingTop: "calc(var(--section-gap) + 4rem)", paddingBottom: "2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 400, background: "radial-gradient(ellipse at top right, rgba(230,57,70,0.12) 0%, transparent 70%)", pointerEvents: "none" }} aria-hidden />
        <div className="container">
          <SectionReveal>
            <span className="badge">{locale === "hu" ? "Digitális kapcsolódás" : "Digital Connection"}</span>
            <h1 className="display-2" style={{ marginBlock: "1rem 1.25rem" }}>{messages.title}</h1>
            <p className="body-lg" style={{ maxWidth: 560 }}>{messages.subtitle}</p>
          </SectionReveal>
        </div>
      </section>
      <SmartFormClient messages={messages} locale={locale} />
    </>
  );
}
