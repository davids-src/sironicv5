"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap, Mail, AlertTriangle, ChevronRight, ChevronLeft, RotateCcw, Send } from "lucide-react";
import Link from "next/link";
import styles from "./SmartFormClient.module.css";

type Tab = "contact" | "assessment" | "incident";

// ─── PRICING LOGIC (future AI expansion point) ──────────────────────────────
function estimatePrice(sizeIdx: number, devicesIdx: number, serverIdx: number): { min: number; max: number } {
  const base = [25000, 45000, 75000, 110000];
  const deviceMult = [1, 1.2, 1.5, 1.9];
  const serverAdj = [0, -5000, -3000, 0];
  const min = Math.round((base[sizeIdx] * deviceMult[devicesIdx] + serverAdj[serverIdx]) / 1000) * 1000;
  return { min, max: Math.round(min * 1.35 / 1000) * 1000 };
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10),
});
type ContactData = z.infer<typeof contactSchema>;

function ContactForm({ m }: { m: any }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });
  const onSubmit = async (_data: ContactData) => {
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
  };
  if (sent) return <SuccessMsg message={m.success} />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="c-name">{m.name} *</label>
          <input id="c-name" className="form-input" placeholder={m.namePlaceholder} {...register("name")} />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="c-email">{m.email} *</label>
          <input id="c-email" type="email" className="form-input" placeholder={m.emailPlaceholder} {...register("email")} />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="c-phone">{m.phone}</label>
          <input id="c-phone" className="form-input" placeholder={m.phonePlaceholder} {...register("phone")} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="c-company">{m.company}</label>
          <input id="c-company" className="form-input" placeholder={m.companyPlaceholder} {...register("company")} />
        </div>
      </div>
      <div className="form-group" style={{ marginTop: "0.75rem" }}>
        <label className="form-label" htmlFor="c-message">{m.message} *</label>
        <textarea id="c-message" className="form-textarea" placeholder={m.messagePlaceholder} {...register("message")} />
        {errors.message && <span className="form-error">{errors.message.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: "1rem" }}>
        {isSubmitting ? "..." : m.submit} <Send size={15} />
      </button>
    </form>
  );
}

// ─── ASSESSMENT FORM ─────────────────────────────────────────────────────────
const assessSteps = ["companySize", "devices", "serverRoom", "priority", "contact"] as const;

const contactStepSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

function AssessmentForm({ m, locale }: { m: any, locale: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({
    companySize: null, devices: null, serverRoom: null, priority: null,
  });
  const [contactData, setContactData] = useState({ name: "", email: "", phone: "" });
  const [done, setDone] = useState(false);

  const stepKeys = assessSteps;
  const currentKey = stepKeys[step];
  const isLastDataStep = step === 3;
  const isContactStep = step === 4;
  const isResult = done;

  const handleOption = (idx: number) => {
    setAnswers(prev => ({ ...prev, [currentKey]: idx }));
  };

  const canNext = isContactStep
    ? contactData.name.length >= 2 && /\S+@\S+\.\S+/.test(contactData.email)
    : answers[currentKey] !== null;

  const handleNext = () => {
    if (isContactStep) { setDone(true); return; }
    setStep(s => s + 1);
  };

  if (isResult) {
    const estimate = estimatePrice(answers.companySize ?? 0, answers.devices ?? 0, answers.serverRoom ?? 0);
    const contactHref = `/${locale}/${locale === "hu" ? "kapcsolat" : "contact"}`;
    return (
      <div className={styles.result}>
        <div className={styles.resultIcon}><CheckCircle2 size={48} /></div>
        <h3 className="heading-1">{m.result.title}</h3>
        <p className="body-lg" style={{ textAlign: "center", maxWidth: 420 }}>{m.result.disclaimer}</p>
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>{m.result.monthly}</span>
          <span className={styles.price}>
            {estimate.min.toLocaleString("hu-HU")} – {estimate.max.toLocaleString("hu-HU")} Ft<small>/hó</small>
          </span>
        </div>
        <div className={styles.resultCtas}>
          <Link href={contactHref} className="btn btn-primary">{m.result.contact} <ChevronRight size={15} /></Link>
          <button className="btn btn-outline" onClick={() => { setStep(0); setAnswers({ companySize: null, devices: null, serverRoom: null, priority: null }); setDone(false); }}>
            <RotateCcw size={15} /> {m.result.restart}
          </button>
        </div>
      </div>
    );
  }

  const stepData = isContactStep ? m.steps.contact : m.steps[currentKey];
  const options = !isContactStep ? stepData.options as string[] : [];
  const progress = ((step) / (stepKeys.length - 1)) * 100;

  return (
    <div className={styles.assessment}>
      {/* Progress */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.stepCounter}>{m.step} {step + 1} {m.of} {stepKeys.length}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className={styles.stepContent}
        >
          <h3 className="heading-2" style={{ marginBottom: "1.5rem" }}>{stepData.question}</h3>

          {!isContactStep && (
            <div className={styles.optionGrid}>
              {options.map((opt: string, i: number) => (
                <button
                  key={i}
                  className={`${styles.optionBtn} ${answers[currentKey] === i ? styles.selected : ""}`}
                  onClick={() => handleOption(i)}
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {isContactStep && (
            <div className={styles.contactFields}>
              <div className="form-group">
                <label className="form-label">{stepData.name} *</label>
                <input className="form-input" placeholder={stepData.namePlaceholder}
                  value={contactData.name} onChange={e => setContactData(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">{stepData.email} *</label>
                <input type="email" className="form-input" placeholder={stepData.emailPlaceholder}
                  value={contactData.email} onChange={e => setContactData(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">{stepData.phone}</label>
                <input className="form-input" placeholder={stepData.phonePlaceholder}
                  value={contactData.phone} onChange={e => setContactData(p => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.stepNav}>
        {step > 0 && (
          <button className="btn btn-outline" onClick={() => setStep(s => s - 1)} type="button">
            <ChevronLeft size={15} /> {m.back}
          </button>
        )}
        <button className="btn btn-primary" disabled={!canNext} onClick={handleNext} style={{ marginLeft: "auto" }} type="button">
          {isContactStep ? m.submit : m.next} <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── INCIDENT FORM ───────────────────────────────────────────────────────────
const incidentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  company: z.string().optional(),
  description: z.string().min(20),
  urgency: z.enum(["low", "medium", "high"]),
});
type IncidentData = z.infer<typeof incidentSchema>;

function IncidentForm({ m }: { m: any }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IncidentData>({
    resolver: zodResolver(incidentSchema),
    defaultValues: { urgency: "medium" },
  });
  const onSubmit = async (_data: IncidentData) => {
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
  };
  if (sent) return <SuccessMsg message={m.success} />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="i-name">{m.name} *</label>
          <input id="i-name" className="form-input" placeholder={m.namePlaceholder} {...register("name")} />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="i-email">{m.email} *</label>
          <input id="i-email" type="email" className="form-input" placeholder={m.emailPlaceholder} {...register("email")} />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="i-phone">{m.phone} *</label>
          <input id="i-phone" className="form-input" placeholder={m.phonePlaceholder} {...register("phone")} />
          {errors.phone && <span className="form-error">{errors.phone.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="i-company">{m.company}</label>
          <input id="i-company" className="form-input" placeholder={m.companyPlaceholder} {...register("company")} />
        </div>
      </div>
      <div className="form-group" style={{ marginTop: "0.75rem" }}>
        <label className="form-label" htmlFor="i-urgency">{m.urgency} *</label>
        <select id="i-urgency" className="form-select" {...register("urgency")}>
          <option value="low">{m.urgencyOptions.low}</option>
          <option value="medium">{m.urgencyOptions.medium}</option>
          <option value="high">{m.urgencyOptions.high}</option>
        </select>
      </div>
      <div className="form-group" style={{ marginTop: "0.75rem" }}>
        <label className="form-label" htmlFor="i-desc">{m.description} *</label>
        <textarea id="i-desc" className="form-textarea" placeholder={m.descriptionPlaceholder} {...register("description")} />
        {errors.description && <span className="form-error">{errors.description.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: "1rem" }}>
        {isSubmitting ? "..." : m.submit} <AlertTriangle size={15} />
      </button>
    </form>
  );
}

// ─── SUCCESS ─────────────────────────────────────────────────────────────────
function SuccessMsg({ message }: { message: string }) {
  return (
    <div className={styles.success}>
      <CheckCircle2 size={40} />
      <p>{message}</p>
    </div>
  );
}

// ─── MAIN CLIENT COMPONENT ───────────────────────────────────────────────────
const tabIcons: Record<Tab, React.ReactNode> = {
  contact:    <Mail size={16} />,
  assessment: <Zap size={16} />,
  incident:   <AlertTriangle size={16} />,
};

export default function SmartFormClient({ messages: m, locale }: { messages: any; locale: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("assessment");

  const tabs: { key: Tab; label: string }[] = [
    { key: "assessment", label: m.tabs.assessment },
    { key: "contact",    label: m.tabs.contact },
    { key: "incident",   label: m.tabs.incident },
  ];

  return (
    <section className="section" style={{ paddingTop: "2rem" }}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Tab bar */}
          <div className={styles.tabBar} role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab.key)}
                id={`tab-${tab.key}`}
                aria-controls={`panel-${tab.key}`}
              >
                {tabIcons[tab.key]}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              className={styles.panel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "contact" && (
                <>
                  <div className={styles.panelHeader}>
                    <h2 className="heading-1">{m.contact.title}</h2>
                    <p className="body-lg">{m.contact.subtitle}</p>
                  </div>
                  <ContactForm m={m.contact} />
                </>
              )}
              {activeTab === "assessment" && (
                <>
                  <div className={styles.panelHeader}>
                    <h2 className="heading-1">{m.assessment.title}</h2>
                    <p className="body-lg">{m.assessment.subtitle}</p>
                  </div>
                  <AssessmentForm m={m.assessment} locale={locale} />
                </>
              )}
              {activeTab === "incident" && (
                <>
                  <div className={styles.panelHeader}>
                    <h2 className="heading-1">{m.incident.title}</h2>
                    <p className="body-lg">{m.incident.subtitle}</p>
                  </div>
                  <IncidentForm m={m.incident} />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
