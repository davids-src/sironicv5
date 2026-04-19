import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface IncidentPayload {
    // Contact
    name: string;
    company: string;
    email: string;
    phone: string;
    isContract: boolean;
    // Issue
    device: string;
    whenStarted: string;
    description: string;
    attempted: string;
    // Urgency
    urgency: "normal" | "urgent" | "critical";
    // File (optional, base64)
    fileName?: string;
    fileType?: string;
    fileData?: string; // base64 encoded
}

// ─── Ticket ID ────────────────────────────────────────────────────────────────
function generateTicketId(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = String(Math.floor(1000 + Math.random() * 9000));
    return `HB-${y}${m}${d}-${rand}`;
}

// ─── Urgency labels ───────────────────────────────────────────────────────────
const URGENCY_LABELS: Record<string, string> = {
    normal: "NORMÁL",
    urgent: "⚡ SÜRGŐS",
    critical: "🔴 KRITIKUS",
};
const URGENCY_RESPONSE: Record<string, string> = {
    normal: "1–2 munkanapon belül felvesszük Önnel a kapcsolatot.",
    urgent: "Aznap vagy másnap reggelig keressük.",
    critical: "Azonnal foglalkozunk az esettel – ha nem hallott felőlünk 30 percen belül, hívjon minket.",
};

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
function buildAdminHtml(d: IncidentPayload, ticketId: string, submittedAt: string): string {
    const urgLabel = URGENCY_LABELS[d.urgency];
    const isCritical = d.urgency === "critical";
    const contractLabel = d.isContract ? "✅ Igen – priorizált kezelés" : "Nem";

    return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#222;background:#f4f4f4;margin:0;padding:0}
  .wrap{max-width:680px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.12)}
  .header{background:${isCritical ? "#C1121F" : d.urgency === "urgent" ? "#d97706" : "#2d6a2d"};color:#fff;padding:24px 28px}
  .header h1{margin:0;font-size:20px}
  .header p{margin:6px 0 0;opacity:.88;font-size:13px}
  .critical-banner{background:#ff0000;color:#fff;font-size:18px;font-weight:700;text-align:center;padding:14px;letter-spacing:.05em}
  .body{padding:24px 28px}
  h2{font-size:14px;color:#E63946;border-bottom:2px solid #E63946;padding-bottom:5px;margin:20px 0 10px}
  table{width:100%;border-collapse:collapse;margin-bottom:8px;font-size:13px}
  td,th{padding:6px 10px;border:1px solid #e0e0e0;text-align:left}
  th{background:#f8f8f8;font-weight:600;width:38%}
  .ticket{background:#fff8f8;border:2px solid #E63946;border-radius:6px;padding:14px 18px;text-align:center;margin:10px 0}
  .ticket .id{font-size:22px;font-weight:800;color:#E63946;letter-spacing:.05em}
  .urgency-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-weight:700;font-size:13px;
    background:${isCritical ? "#fce4e4" : d.urgency === "urgent" ? "#fef3c7" : "#dcfce7"};
    color:${isCritical ? "#b91c1c" : d.urgency === "urgent" ? "#92400e" : "#166534"}}
  .desc{background:#f8f8f8;border:1px solid #e0e0e0;border-radius:4px;padding:10px;font-size:13px;white-space:pre-wrap;margin:6px 0}
  .footer{background:#f8f8f8;padding:14px 28px;font-size:12px;color:#888;border-top:1px solid #e0e0e0}
</style></head>
<body>
<div class="wrap">
  ${isCritical ? `<div class="critical-banner">🔴 KRITIKUS ESET – AZONNALI BEAVATKOZÁS SZÜKSÉGES 🔴</div>` : ""}
  <div class="header">
    <h1>Hibabejelentés érkezett – ${urgLabel}</h1>
    <p>${submittedAt} &nbsp;|&nbsp; ${d.company}</p>
  </div>
  <div class="body">
    <div class="ticket">
      <div style="font-size:12px;color:#666;margin-bottom:4px">Ticket azonosító</div>
      <div class="id">${ticketId}</div>
    </div>

    <h2>Sürgősség</h2>
    <p><span class="urgency-badge">${urgLabel}</span></p>
    <p style="font-size:13px;color:#555;margin-top:6px">${URGENCY_RESPONSE[d.urgency]}</p>

    <h2>Kapcsolati adatok</h2>
    <table>
      <tr><th>Teljes név</th><td>${d.name}</td></tr>
      <tr><th>Cégnév</th><td>${d.company}</td></tr>
      <tr><th>E-mail</th><td><a href="mailto:${d.email}">${d.email}</a></td></tr>
      <tr><th>Telefon</th><td>${d.phone}</td></tr>
      <tr><th>Szerződéses ügyfél</th><td>${contractLabel}</td></tr>
    </table>

    <h2>A hiba részletei</h2>
    <table>
      <tr><th>Érintett eszköz / rendszer</th><td>${d.device}</td></tr>
      <tr><th>Hiba kezdete</th><td>${d.whenStarted}</td></tr>
    </table>
    <p style="font-size:12px;color:#888;margin:8px 0 4px;font-weight:600">Hiba leírása:</p>
    <div class="desc">${d.description}</div>
    ${d.attempted ? `<p style="font-size:12px;color:#888;margin:8px 0 4px;font-weight:600">Próbált megoldások:</p>
    <div class="desc">${d.attempted}</div>` : ""}

    ${d.fileName ? `<h2>Csatolt fájl</h2>
    <p style="font-size:13px">📎 ${d.fileName} (mellékelve)</p>` : ""}
  </div>
  <div class="footer">SIRONIC IT Hibabejelentő &nbsp;|&nbsp; ${submittedAt}</div>
</div>
</body></html>`;
}

// ─── Client HTML ──────────────────────────────────────────────────────────────
function buildClientHtml(d: IncidentPayload, ticketId: string, submittedAt: string): string {
    const urgLabel = URGENCY_LABELS[d.urgency];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sironic.eu";
    const phone = process.env.NEXT_PUBLIC_SIRONIC_PHONE ?? "+36 70 273 5532";

    return `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#222;background:#f4f4f4;margin:0;padding:0}
  .wrap{max-width:580px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.12)}
  .header{background:#E63946;color:#fff;padding:24px 28px}
  .header h1{margin:0;font-size:19px}
  .header p{margin:6px 0 0;opacity:.88;font-size:13px}
  .body{padding:24px 28px}
  h2{font-size:14px;color:#E63946;border-bottom:2px solid #E63946;padding-bottom:5px;margin:20px 0 10px}
  .ticket{background:#fff8f8;border:2px solid #E63946;border-radius:8px;padding:18px;text-align:center;margin:16px 0}
  .ticket .id{font-size:26px;font-weight:900;color:#E63946;letter-spacing:.06em}
  .ticket .note{font-size:12px;color:#888;margin-top:6px}
  .response-box{background:#f0f9ff;border:1px solid #0ea5e9;border-radius:6px;padding:12px 16px;font-size:13px;color:#0c4a6e;margin:12px 0}
  .footer{background:#f8f8f8;padding:14px 28px;font-size:12px;color:#888;border-top:1px solid #e0e0e0;text-align:center}
  a{color:#E63946}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>Hibabejelentés visszaigazolása</h1>
    <p>${submittedAt}</p>
  </div>
  <div class="body">
    <p>Kedves <strong>${d.name}</strong>!</p>
    <p>Megkaptuk a hibabejelentését. Az azonosítója:</p>

    <div class="ticket">
      <div class="id">${ticketId}</div>
      <div class="note">Kérjük, jegyezze fel vagy mentse el ezt az azonosítót – erre hivatkozva tudja nyomon követni az ügyét.</div>
    </div>

    <h2>A bejelentés összefoglalója</h2>
    <p><strong>Érintett eszköz / rendszer:</strong> ${d.device}</p>
    <p><strong>Sürgősségi szint:</strong> ${urgLabel}</p>

    <div class="response-box">
      <strong>Várható reakcióidő:</strong><br>${URGENCY_RESPONSE[d.urgency]}
    </div>

    <p style="font-size:13px;color:#555">Ha sürgős, hívjon minket:<br>
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
        const body: IncidentPayload = await req.json();
        const ticketId = generateTicketId();
        const submittedAt = new Date().toLocaleString("hu-HU");
        const transporter = createTransporter();
        const from = `"SIRONIC IT" <${process.env.SMTP_USER}>`;
        const adminEmail = process.env.ADMIN_EMAIL ?? "";
        const urgLabel = URGENCY_LABELS[body.urgency];

        // Build attachments
        const attachments = body.fileData && body.fileName
            ? [{ filename: body.fileName, content: body.fileData, encoding: "base64" as const, contentType: body.fileType }]
            : [];

        // Admin email
        await transporter.sendMail({
            from,
            to: adminEmail,
            subject: `[${urgLabel}] Hibabejelentés – ${body.company} – ${ticketId}`,
            html: buildAdminHtml(body, ticketId, submittedAt),
            attachments,
        });

        // Client email
        await transporter.sendMail({
            from,
            to: body.email,
            subject: `Hibabejelentés visszaigazolása – ${ticketId}`,
            html: buildClientHtml(body, ticketId, submittedAt),
        });

        return NextResponse.json({ ok: true, ticketId });
    } catch (err) {
        console.error("Incident email error:", err);
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
