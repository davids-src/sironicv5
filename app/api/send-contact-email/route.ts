import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactPayload {
    inquiryType?: "free-assessment" | "general" | string;
    name: string;
    email: string;
    phone?: string;
    companySize?: string;
    hasExternalIT?: string;
    message: string;
}

// ─── Mailer ───────────────────────────────────────────────────────────────────
function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
}

// ─── Admin HTML ───────────────────────────────────────────────────────────────
function buildAdminHtml(d: ContactPayload, submittedAt: string): string {
    const isAssessment = d.inquiryType === "free-assessment";
    const headerColor = isAssessment ? "#E8271A" : "#2563eb";
    const headerTitle = isAssessment
        ? "🎯 ÚJ INGYENES IT ÁLLAPOTFELMÉRÉS IGÉNYLÉS"
        : "Új üzenet weboldalról";

    return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#222;background:#f4f4f4;margin:0;padding:0}
  .wrap{max-width:680px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.12)}
  .header{background:${headerColor};color:#fff;padding:24px 28px}
  .header h1{margin:0;font-size:20px}
  .header p{margin:6px 0 0;opacity:.88;font-size:13px}
  .body{padding:24px 28px}
  h2{font-size:14px;color:${headerColor};border-bottom:2px solid ${headerColor};padding-bottom:5px;margin:20px 0 10px}
  table{width:100%;border-collapse:collapse;margin-bottom:8px;font-size:13px}
  td,th{padding:8px 10px;border:1px solid #e0e0e0;text-align:left}
  th{background:#f8f8f8;font-weight:600;width:38%}
  .desc{background:#f8f8f8;border:1px solid #e0e0e0;border-radius:4px;padding:12px;font-size:13px;white-space:pre-wrap;margin:6px 0}
  .footer{background:#f8f8f8;padding:14px 28px;font-size:12px;color:#888;border-top:1px solid #e0e0e0}
  .badge{display:inline-block;padding:3px 8px;background:${isAssessment ? "#fff" : "#eff6ff"};color:${isAssessment ? "#E8271A" : "#1e3a8a"};font-weight:bold;border-radius:3px;font-size:12px}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>${headerTitle}</h1>
    <p>${submittedAt}</p>
  </div>
  <div class="body">
    <h2>Megkeresés részletei</h2>
    <table>
      <tr><th>Megkeresés típusa</th><td><span class="badge">${isAssessment ? "INGYENES IT ÁLLAPOTFELMÉRÉS" : "Általános üzenet"}</span></td></tr>
      <tr><th>Név</th><td>${d.name}</td></tr>
      <tr><th>E-mail cím</th><td><a href="mailto:${d.email}">${d.email}</a></td></tr>
      <tr><th>Telefonszám</th><td>${d.phone || "Nem megadott"}</td></tr>
      ${d.companySize ? `<tr><th>Cégméret (dolgozók)</th><td><strong>${d.companySize}</strong></td></tr>` : ""}
      ${d.hasExternalIT ? `<tr><th>Jelenlegi IT háttér</th><td>${d.hasExternalIT}</td></tr>` : ""}
    </table>

    <h2>${isAssessment ? "Megjegyzés / Tevékenység" : "Üzenet"}</h2>
    <div class="desc">${d.message}</div>
  </div>
  <div class="footer">SIRONIC Kapcsolat &nbsp;|&nbsp; ${submittedAt}</div>
</div>
</body></html>`;
}

// ─── Client HTML ──────────────────────────────────────────────────────────────
function buildClientHtml(d: ContactPayload, submittedAt: string): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sironic.eu";
    const phone = process.env.NEXT_PUBLIC_SIRONIC_PHONE ?? "+36 70 273 5532";
    const isAssessment = d.inquiryType === "free-assessment";

    const title = isAssessment
        ? "Ingyenes IT Állapotfelmérés Igénylését Megkaptuk"
        : "Üzenetét megkaptuk";

    const responseText = isAssessment
        ? "Köszönjük az Ingyenes IT Állapotfelmérés iránti érdeklődését! Munkatársunk 1 munkanapon belül felveszi Önnel a kapcsolatot az időpont és a részletek egyeztetése érdekében."
        : "Köszönjük, hogy felvette velünk a kapcsolatot. Munkatársaink 1-2 munkanapon belül feldolgozzák üzenetét.";

    return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#222;background:#f4f4f4;margin:0;padding:0}
  .wrap{max-width:580px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.12)}
  .header{background:#E8271A;color:#fff;padding:24px 28px}
  .header h1{margin:0;font-size:19px}
  .header p{margin:6px 0 0;opacity:.88;font-size:13px}
  .body{padding:24px 28px}
  .response-box{background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:14px 16px;font-size:13px;color:#991b1b;margin:16px 0;line-height:1.5}
  .footer{background:#f8f8f8;padding:14px 28px;font-size:12px;color:#888;border-top:1px solid #e0e0e0;text-align:center}
  a{color:#E8271A}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>${title}</h1>
    <p>${submittedAt}</p>
  </div>
  <div class="body">
    <p>Kedves <strong>${d.name}</strong>!</p>
    <p>Sikeresen rögzítettük felkeresését rendszerünkben.</p>

    <div class="response-box">
      <strong>Várható lépések:</strong><br>${responseText}
    </div>

    <p style="font-size:13px;color:#555">Sürgős kérdés esetén közvetlenül is elérhet minket:<br>
    📞 <strong>${phone}</strong><br>
    📧 <a href="mailto:hello@sironic.hu">hello@sironic.hu</a></p>
  </div>
  <div class="footer">
    <strong>SIRONIC IT Megoldások</strong><br>
    <a href="${siteUrl}">${siteUrl}</a>
  </div>
</div>
</body></html>`;
}

// ─── Route ────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body: ContactPayload = await req.json();
        const submittedAt = new Date().toLocaleString("hu-HU");
        const transporter = createTransporter();
        const from = `"SIRONIC IT" <${process.env.SMTP_USER}>`;
        const adminEmail = process.env.ADMIN_EMAIL ?? "";

        const isAssessment = body.inquiryType === "free-assessment";
        const subjectAdmin = isAssessment
            ? `🎯 INGYENES IT ÁLLAPOTFELMÉRÉS – ${body.name}`
            : `Új üzenet érkezett – ${body.name}`;

        const subjectClient = isAssessment
            ? `Ingyenes IT Állapotfelmérés igénylésének visszaigazolása – SIRONIC`
            : `Üzenetét megkaptuk – SIRONIC IT`;

        // Admin email
        if (adminEmail) {
            await transporter.sendMail({
                from,
                to: adminEmail,
                subject: subjectAdmin,
                html: buildAdminHtml(body, submittedAt),
            });
        }

        // Client confirmation email
        if (body.email) {
            await transporter.sendMail({
                from,
                to: body.email,
                subject: subjectClient,
                html: buildClientHtml(body, submittedAt),
            });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact email error:", err);
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
