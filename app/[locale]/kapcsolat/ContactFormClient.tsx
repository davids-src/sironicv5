"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

export default function ContactFormClient({ messages: m }: { messages: any }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem 0", color: "var(--primary)", textAlign: "center" }}>
        <CheckCircle2 size={40} />
        <p style={{ color: "var(--text)", fontSize: "1.05rem", fontWeight: 500 }}>{m.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      <div className="form-group">
        <label className="form-label" htmlFor="cn-name">{m.name} *</label>
        <input id="cn-name" className="form-input" placeholder={m.namePlaceholder} {...register("name")} />
        {errors.name && <span className="form-error">{errors.name.message}</span>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="cn-email">{m.email} *</label>
        <input id="cn-email" type="email" className="form-input" placeholder={m.emailPlaceholder} {...register("email")} />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="cn-phone">{m.phone}</label>
        <input id="cn-phone" className="form-input" placeholder={m.phonePlaceholder} {...register("phone")} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="cn-msg">{m.message} *</label>
        <textarea id="cn-msg" className="form-textarea" placeholder={m.messagePlaceholder} {...register("message")} />
        {errors.message && <span className="form-error">{errors.message.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: "0.5rem" }}>
        {isSubmitting ? "..." : m.submit} <Send size={15} />
      </button>
    </form>
  );
}
