"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";

const schema = z.object({
  inquiryType: z.enum(["free-assessment", "general"]),
  name: z.string().min(2, "A név kitöltése kötelező (min. 2 karakter)"),
  email: z.string().email("Érvényes e-mail címet adjon meg"),
  phone: z.string().optional(),
  companySize: z.string().optional(),
  hasExternalIT: z.string().optional(),
  message: z.string().min(10, "Kérjük írjon legalább 10 karaktert"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  messages: any;
  initialInquiryType?: "free-assessment" | "general";
};

export default function ContactFormClient({ messages: m, initialInquiryType = "general" }: Props) {
  const searchParams = useSearchParams();
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      inquiryType: initialInquiryType,
      name: "",
      email: "",
      phone: "",
      companySize: "",
      hasExternalIT: "",
      message: "",
    },
  });

  const inquiryType = watch("inquiryType");

  // Handle URL query parameter ?forras=ingyenes-felmeres dynamically
  useEffect(() => {
    const forras = searchParams.get("forras") || searchParams.get("source");
    if (forras === "ingyenes-felmeres" || forras === "free-assessment") {
      setValue("inquiryType", "free-assessment");
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
    setSendError("");
    try {
      const res = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Szerver hiba");
      setSent(true);
    } catch (e) {
      setSendError("Hiba az e-mail küldésekor. Kérjük próbálja újra, vagy keressen minket telefonon.");
    }
  };

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2.5rem 1rem", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(26, 232, 123, 0.15)", border: "1px solid #1AE87B", display: "flex", alignItems: "center", justifyContent: "center", color: "#1AE87B" }}>
          <CheckCircle2 size={32} />
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", color: "var(--ink)", margin: 0 }}>
          {inquiryType === "free-assessment" ? "Állapotfelmérés igénylése rögzítve!" : "Üzenetét megkaptuk!"}
        </h3>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 440 }}>
          {m.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>

      {/* Inquiry Type Tabs / Pills */}
      <div className="form-group">
        <label className="form-label">{m.inquiryTypeLabel || "Megkeresés típusa"}</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => setValue("inquiryType", "free-assessment")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.75rem 0.625rem",
              borderRadius: "var(--r-button)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78125rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              border: inquiryType === "free-assessment" ? "1px solid var(--accent)" : "1px solid var(--line)",
              background: inquiryType === "free-assessment" ? "var(--accent-12)" : "var(--surface)",
              color: inquiryType === "free-assessment" ? "var(--ink)" : "var(--muted)",
            }}
          >
            <ShieldCheck size={16} color={inquiryType === "free-assessment" ? "var(--accent)" : "currentColor"} />
            <span>{m.inquiryTypeAssessment || "Ingyenes IT Felmérés"}</span>
          </button>

          <button
            type="button"
            onClick={() => setValue("inquiryType", "general")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.75rem 0.625rem",
              borderRadius: "var(--r-button)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78125rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              border: inquiryType === "general" ? "1px solid var(--accent)" : "1px solid var(--line)",
              background: inquiryType === "general" ? "var(--accent-12)" : "var(--surface)",
              color: inquiryType === "general" ? "var(--ink)" : "var(--muted)",
            }}
          >
            <HelpCircle size={16} color={inquiryType === "general" ? "var(--accent)" : "currentColor"} />
            <span>{m.inquiryTypeGeneral || "Általános Üzenet"}</span>
          </button>
        </div>
      </div>

      {/* Trust Badge Bar for Free Assessment */}
      {inquiryType === "free-assessment" && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          background: "var(--accent-12)",
          border: "1px solid var(--accent-40)",
          borderRadius: "var(--r-card-sm)",
          padding: "0.75rem 1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8125rem",
          color: "var(--ink)",
          lineHeight: 1.4,
        }}>
          <ShieldCheck size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
          <span>{m.trustBadge || "Nincs kötelezettség. Nincs eladás a helyszínen. Csak tiszta kép a rendszeréről."}</span>
        </div>
      )}

      {/* Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="cn-name">{m.name} *</label>
        <input id="cn-name" className="form-input" placeholder={m.namePlaceholder} {...register("name")} />
        {errors.name && <span className="form-error">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label className="form-label" htmlFor="cn-email">{m.email} *</label>
        <input id="cn-email" type="email" className="form-input" placeholder={m.emailPlaceholder} {...register("email")} />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label className="form-label" htmlFor="cn-phone">{m.phone}</label>
        <input id="cn-phone" className="form-input" placeholder={m.phonePlaceholder} {...register("phone")} />
      </div>

      {/* Additional Assessment Fields */}
      {inquiryType === "free-assessment" && (
        <>
          <div className="form-group">
            <label className="form-label" htmlFor="cn-company-size">{m.companySizeLabel || "Vállalkozás mérete (munkatársak száma)"}</label>
            <select id="cn-company-size" className="form-input" {...register("companySize")}>
              <option value="">{m.companySizePlaceholder || "Válasszon méretet..."}</option>
              <option value="1–5 fő">{m.companySizeOptions?.size1 || "1–5 fő"}</option>
              <option value="6–15 fő">{m.companySizeOptions?.size2 || "6–15 fő"}</option>
              <option value="16–30 fő">{m.companySizeOptions?.size3 || "16–30 fő"}</option>
              <option value="30+ fő">{m.companySizeOptions?.size4 || "30+ fő"}</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cn-external-it">{m.hasExternalITLabel || "Jelenleg van-e külső/belső rendszergazdájuk?"}</label>
            <select id="cn-external-it" className="form-input" {...register("hasExternalIT")}>
              <option value="">{m.hasExternalITPlaceholder || "Válasszon opciót..."}</option>
              <option value="Van állandó belső vagy külső rendszergazda">{m.hasExternalITOptions?.internalOrExternal || "Van állandó belső vagy külső rendszergazda"}</option>
              <option value="Nincs állandó, csak eseti segítségünk van">{m.hasExternalITOptions?.adHoc || "Nincs állandó, csak eseti segítségünk van"}</option>
              <option value="Nincs informatikai támogatásunk">{m.hasExternalITOptions?.none || "Nincs informatikai támogatásunk"}</option>
            </select>
          </div>
        </>
      )}

      {/* Message */}
      <div className="form-group">
        <label className="form-label" htmlFor="cn-msg">{m.message} *</label>
        <textarea
          id="cn-msg"
          className="form-textarea"
          rows={4}
          placeholder={
            inquiryType === "free-assessment"
              ? "Kérjük, röviden írja le cége tevékenységét vagy a felméréssel kapcsolatos elvárásait..."
              : m.messagePlaceholder
          }
          {...register("message")}
        />
        {errors.message && <span className="form-error">{errors.message.message}</span>}
      </div>

      {sendError && <div className="form-error" style={{ textAlign: "center" }}>{sendError}</div>}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: "0.5rem" }}>
        {isSubmitting
          ? "Kérjük várjon..."
          : inquiryType === "free-assessment"
          ? "Ingyenes Állapotfelmérés Igénylése"
          : m.submit}{" "}
        <Send size={15} />
      </button>
    </form>
  );
}
