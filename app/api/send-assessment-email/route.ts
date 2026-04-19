import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServerRoomItem {
    label: string;
    qty: number;
    price_per_unit: number;
}
interface WorkstationItem {
    label: string;
    qty: number;
    price_per_unit: number;
}
interface NetworkItem {
    label: string;
    qty: number;
    price_per_unit: number;
}
interface OsItem {
    label: string;
    qty: number;
    price_per_unit: number;
    warning?: string;
}
interface AssessmentData {
    // Q1
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    county: string;
    city: string;
    // Q2–Q12 raw values
    q2Label: string;
    q2Multiplier: number;
    q3Label: string;
    q3Add: number;
    q4Label: string;
    q4Add: number;
    q5Label: string;
    q5Add: number;
    q6Label: string;
    q6Add: number;
    q7Label: string;
    q7Add: number;
    // Q8
    serverRoomItems: ServerRoomItem[];
    // Q9
    workstations: WorkstationItem[];
    // Q10
    networkItems: NetworkItem[];
    // Q11
    osItems: OsItem[];
    // Q12
    q12Label: string;
    q12Add: number;
    // Q13
    downloadSpeed: number | null;
    uploadSpeed: number | null;
    // Q14
    problemsText: string;
    problemsCount: number;
    q14Multiplier: number;
    // Q15
    developmentNeeds: string[];
    developmentFreetext: string;
    // Result
    finalPrice: number;
    priceLow: number;
    priceHigh: number;
    acceptance: "accepted" | "declined";
    submittedAt: string;
}

// ─── Mailer ───────────────────────────────────────────────────────────────────
function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

function formatHuf(n: number) {
    return n.toLocaleString("hu-HU") + " Ft";
}

// ─── Admin e-mail HTML ─────────────────────────────────────────────────────────
function buildAdminHtml(d: AssessmentData): string {
    const acceptanceLabel = d.acceptance === "accepted" ? "✅ ELFOGADTA" : "❌ Csak tájékozódott";

    const serverRoomRows = d.serverRoomItems.length
        ? d.serverRoomItems.map(i => `<tr><td>${i.label}</td><td>${i.qty} db</td><td>${formatHuf(i.qty * i.price_per_unit)}</td></tr>`).join("")
        : "<tr><td colspan='3' style='color:#888'>–</td></tr>";

    const workstationRows = d.workstations.map(i =>
        `<tr><td>${i.label}</td><td>${i.qty} db</td><td>${formatHuf(i.qty * i.price_per_unit)}</td></tr>`
    ).join("");

    const networkRows = d.networkItems.length
        ? d.networkItems.map(i => `<tr><td>${i.label}</td><td>${i.qty} db</td><td>${formatHuf(i.qty * i.price_per_unit)}</td></tr>`).join("")
        : "<tr><td colspan='3' style='color:#888'>–</td></tr>";

    const osRows = d.osItems.length
        ? d.osItems.map(i => `<tr><td>${i.label}${i.warning ? ` <span style="color:#c0392b">⚠ ${i.warning}</span>` : ""}</td><td>${i.qty} db</td><td>${formatHuf(i.qty * i.price_per_unit)}</td></tr>`).join("")
        : "<tr><td colspan='3' style='color:#888'>–</td></tr>";

    const speedWarnings: string[] = [];
    if (d.downloadSpeed !== null && d.downloadSpeed < 20) {
        speedWarnings.push(`⚠ Alacsony letöltési sebesség: ${d.downloadSpeed} Mbps`);
    }
    if (d.uploadSpeed !== null && d.uploadSpeed < 5) {
        speedWarnings.push(`⚠ Alacsony feltöltési sebesség: ${d.uploadSpeed} Mbps`);
    }

    const osWarnings = d.osItems.filter(i => i.warning).map(i => `⚠ ${i.label} (${i.qty} db): ${i.warning}`);
    const allWarnings = [...osWarnings, ...speedWarnings];

    const devNeeds = [...d.developmentNeeds, ...(d.developmentFreetext ? [`Egyéb: ${d.developmentFreetext}`] : [])];

    const basePrice = 25000;
    const additivSum = d.q3Add + d.q4Add + d.q5Add + d.q6Add + d.q7Add
        + d.serverRoomItems.reduce((s, i) => s + i.qty * i.price_per_unit, 0)
        + d.workstations.reduce((s, i) => s + i.qty * i.price_per_unit, 0)
        + d.networkItems.reduce((s, i) => s + i.qty * i.price_per_unit, 0)
        + d.osItems.reduce((s, i) => s + i.qty * i.price_per_unit, 0)
        + d.q12Add;

    return `
<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#222;background:#f4f4f4;margin:0;padding:0}
  .wrap{max-width:700px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.12)}
  .header{background:#E63946;color:#fff;padding:28px 32px}
  .header h1{margin:0;font-size:22px}
  .header p{margin:6px 0 0;opacity:0.85;font-size:13px}
  .body{padding:28px 32px}
  h2{font-size:15px;color:#E63946;border-bottom:2px solid #E63946;padding-bottom:6px;margin:24px 0 12px}
  table{width:100%;border-collapse:collapse;margin-bottom:8px}
  td,th{padding:7px 10px;border:1px solid #e0e0e0;text-align:left;font-size:13px}
  th{background:#f8f8f8;font-weight:600}
  .price-box{background:#fff8f8;border:2px solid #E63946;border-radius:6px;padding:16px 20px;margin:16px 0;text-align:center}
  .price-box .final{font-size:26px;font-weight:700;color:#E63946}
  .price-box .range{font-size:13px;color:#666;margin-top:4px}
  .warn-box{background:#fff3cd;border:1px solid #ffc107;border-radius:6px;padding:12px 16px;margin:12px 0}
  .warn-box p{margin:3px 0;font-size:13px;color:#856404}
  .acceptance{font-size:18px;font-weight:700;padding:10px 0}
  .footer{background:#f8f8f8;padding:16px 32px;font-size:12px;color:#888;border-top:1px solid #e0e0e0}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>Új IT Igényfelmérő beérkezett</h1>
    <p>Beküldés időpontja: ${d.submittedAt} &nbsp;|&nbsp; <strong>${acceptanceLabel}</strong></p>
  </div>
  <div class="body">

    <h2>Céges adatok</h2>
    <table>
      <tr><th>Cégnév</th><td>${d.companyName}</td></tr>
      <tr><th>Kapcsolattartó</th><td>${d.contactName}</td></tr>
      <tr><th>E-mail</th><td><a href="mailto:${d.email}">${d.email}</a></td></tr>
      <tr><th>Telefon</th><td>${d.phone}</td></tr>
      <tr><th>Megye</th><td>${d.county}</td></tr>
      <tr><th>Város / Település</th><td>${d.city}</td></tr>
    </table>

    <h2>Kalkuláció részletezése</h2>
    <table>
      <tr><th>Tétel</th><th>Válasz</th><th>Összeg</th></tr>
      <tr><td>Alap díj</td><td>–</td><td>${formatHuf(basePrice)}</td></tr>
      <tr><td>Q2 – Tevékenységi kör</td><td>${d.q2Label}</td><td>× ${d.q2Multiplier}</td></tr>
      <tr><td>Q3 – Létszám</td><td>${d.q3Label}</td><td>${formatHuf(d.q3Add)}</td></tr>
      <tr><td>Q4 – Telephely jellege</td><td>${d.q4Label}</td><td>${formatHuf(d.q4Add)}</td></tr>
      <tr><td>Q5 – Alapterület</td><td>${d.q5Label}</td><td>${formatHuf(d.q5Add)}</td></tr>
      <tr><td>Q6 – Helyiségek száma</td><td>${d.q6Label}</td><td>${formatHuf(d.q6Add)}</td></tr>
      <tr><td>Q7 – Szerver</td><td>${d.q7Label}</td><td>${formatHuf(d.q7Add)}</td></tr>
      <tr><td>Q12 – Internet típusa</td><td>${d.q12Label}</td><td>${formatHuf(d.q12Add)}</td></tr>
      <tr><td>Q14 – IT-problémák</td><td>${d.problemsCount} tétel</td><td>× ${d.q14Multiplier}</td></tr>
      <tr><td colspan="2"><strong>Additív összeg (szorzók előtt)</strong></td><td><strong>${formatHuf(additivSum + basePrice)}</strong></td></tr>
      <tr><td colspan="2"><strong>Végső ár (pontosan)</strong></td><td><strong style="color:#E63946">${formatHuf(d.finalPrice)}</strong></td></tr>
    </table>

    <h2>Q8 – Szerverszoba tartalma</h2>
    <table><tr><th>Eszköz</th><th>Db</th><th>Összeg</th></tr>${serverRoomRows}</table>

    <h2>Q9 – Munkaállomások</h2>
    <table><tr><th>Típus</th><th>Db</th><th>Összeg</th></tr>${workstationRows}</table>

    <h2>Q10 – Hálózati eszközök</h2>
    <table><tr><th>Eszköz</th><th>Db</th><th>Összeg</th></tr>${networkRows}</table>

    <h2>Q11 – Operációs rendszerek</h2>
    <table><tr><th>Rendszer</th><th>Db</th><th>Összeg</th></tr>${osRows}</table>

    <h2>Q13 – Internet sebesség</h2>
    <table>
      <tr><th>Letöltés</th><td>${d.downloadSpeed !== null ? d.downloadSpeed + " Mbps" : "–"}</td></tr>
      <tr><th>Feltöltés</th><td>${d.uploadSpeed !== null ? d.uploadSpeed + " Mbps" : "–"}</td></tr>
    </table>

    <h2>Q14 – Rendszeres IT-problémák</h2>
    <p style="background:#f8f8f8;border:1px solid #e0e0e0;border-radius:4px;padding:10px;font-size:13px;white-space:pre-wrap">${d.problemsText || "–"}</p>

    ${allWarnings.length ? `
    <h2>⚠ Figyelmeztetések</h2>
    <div class="warn-box">
      ${allWarnings.map(w => `<p>${w}</p>`).join("")}
    </div>` : ""}

    ${devNeeds.length ? `
    <h2>Q15 – Fejlesztési igények (sales figyelmébe)</h2>
    <ul>${devNeeds.map(n => `<li>${n}</li>`).join("")}</ul>` : ""}

    <div class="price-box">
      <div>Végső kalkulált ár (pontos)</div>
      <div class="final">${formatHuf(d.finalPrice)} / hó + ÁFA</div>
      <div class="range">Ügyféli ártartomány: ${formatHuf(d.priceLow)} – ${formatHuf(d.priceHigh)} / hó + ÁFA</div>
    </div>

    <p class="acceptance">Ajánlat elfogadása: ${acceptanceLabel}</p>

  </div>
  <div class="footer">SIRONIC IT Igényfelmérő &nbsp;|&nbsp; ${d.submittedAt}</div>
</div>
</body></html>`;
}

// ─── Client e-mail HTML ────────────────────────────────────────────────────────
function buildClientHtml(d: AssessmentData): string {
    const acceptanceLabel = d.acceptance === "accepted"
        ? "Kollégánk hamarosan felveszi Önnel a kapcsolatot az elfogadott ajánlattal kapcsolatban."
        : "Megőriztük az ajánlatát. Ha bármikor kérdése merül fel, keressen minket!";

    const speedWarnings: string[] = [];
    if (d.downloadSpeed !== null && d.downloadSpeed < 20)
        speedWarnings.push("Alacsony letöltési sebesség érzékeltük – hálózatfejlesztést javaslunk.");
    if (d.uploadSpeed !== null && d.uploadSpeed < 5)
        speedWarnings.push("Alacsony feltöltési sebesség érzékeltük – hálózatfejlesztést javaslunk.");
    const osWarnings = d.osItems.filter(i => i.warning).map(i => i.warning as string);
    const allWarnings = [...osWarnings, ...speedWarnings];

    const devNeeds = [...d.developmentNeeds, ...(d.developmentFreetext ? [`Egyéb: ${d.developmentFreetext}`] : [])];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sironic.eu";

    return `
<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#222;background:#f4f4f4;margin:0;padding:0}
  .wrap{max-width:600px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.12)}
  .header{background:#E63946;color:#fff;padding:28px 32px}
  .header h1{margin:0;font-size:20px}
  .header p{margin:6px 0 0;opacity:0.85;font-size:13px}
  .body{padding:28px 32px}
  h2{font-size:15px;color:#E63946;border-bottom:2px solid #E63946;padding-bottom:6px;margin:24px 0 12px}
  .price-box{background:#fff8f8;border:2px solid #E63946;border-radius:8px;padding:20px;text-align:center;margin:20px 0}
  .price-box .range{font-size:24px;font-weight:700;color:#E63946}
  .price-box small{font-size:13px;color:#666;display:block;margin-top:4px}
  .note{font-size:12px;color:#888;font-style:italic;margin-top:8px}
  ul{padding-left:20px;margin:8px 0}
  ul li{margin:4px 0;font-size:13px}
  .warn-box{background:#fff3cd;border:1px solid #ffc107;border-radius:6px;padding:12px 16px;margin:12px 0}
  .warn-box p{margin:3px 0;font-size:13px;color:#856404}
  .next-step{background:#f0faf0;border:1px solid #28a745;border-radius:6px;padding:14px;font-size:14px;color:#155724;margin:16px 0}
  .footer{background:#f8f8f8;padding:16px 32px;font-size:12px;color:#888;border-top:1px solid #e0e0e0;text-align:center}
  a{color:#E63946}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>IT Üzemeltetési Ajánlat – ${d.companyName}</h1>
    <p>Köszönjük, hogy kitöltötte az intelligens igényfelmérőt!</p>
  </div>
  <div class="body">
    <p>Kedves <strong>${d.contactName}</strong>!</p>
    <p>Az Ön által megadott adatok alapján elkészítettük a hozzávetőleges üzemeltetési árbecslést. Ez egy tájékoztató ártartomány, a pontos ajánlathoz kollégánk felveszi Önnel a kapcsolatot.</p>

    <div class="price-box">
      <div>Hozzávetőleges havi üzemeltetési díj</div>
      <div class="range">${formatHuf(d.priceLow)} – ${formatHuf(d.priceHigh)}</div>
      <small>/ hó + ÁFA</small>
      <p class="note">Ez egy tájékoztató ártartomány az Ön által megadott adatok alapján. A pontos ajánlat egyedi felmérés alapján kerül meghatározásra.</p>
    </div>

    <h2>A díjban foglalt szolgáltatások</h2>
    <ul>
      <li>Távolról végzett rendszer-karbantartás és felügyelet</li>
      <li>Hibaelhárítás (remote support)</li>
      <li>Havi állapotjelentés</li>
      <li>Dedikált kapcsolattartó</li>
    </ul>

    ${allWarnings.length ? `
    <h2>⚠ Felhívjuk figyelmét</h2>
    <div class="warn-box">
      ${allWarnings.map(w => `<p>⚠ ${w}</p>`).join("")}
    </div>` : ""}

    ${devNeeds.length ? `
    <h2>Fejlesztési igények</h2>
    <p>Az alábbi fejlesztési témákra külön ajánlatot készítünk:</p>
    <ul>${devNeeds.map(n => `<li>${n}</li>`).join("")}</ul>` : ""}

    <div class="next-step">
      <strong>Következő lépés:</strong> ${acceptanceLabel}
    </div>

    <p style="font-size:13px;color:#666">Kérdése van? Keressen minket:<br>
    📧 <a href="mailto:hello@sironic.hu">hello@sironic.hu</a><br>
    🌐 <a href="${siteUrl}">${siteUrl}</a>
    </p>
  </div>
  <div class="footer">
    <strong>SIRONIC IT Megoldások</strong><br>
    <a href="${siteUrl}">${siteUrl}</a> &nbsp;|&nbsp; IT üzemeltetés, hálózatépítés, egyedi fejlesztés
  </div>
</div>
</body></html>`;
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const data: AssessmentData = await req.json();
        const transporter = createTransporter();

        const fromAddress = `"SIRONIC IT" <${process.env.SMTP_USER}>`;
        const adminEmail = process.env.ADMIN_EMAIL ?? "";
        const acceptanceLabel = data.acceptance === "accepted" ? "Elfogadta" : "Nem fogadta el";

        // Admin e-mail
        await transporter.sendMail({
            from: fromAddress,
            to: adminEmail,
            subject: `Új IT igényfelmérő – ${data.companyName} – ${acceptanceLabel}`,
            html: buildAdminHtml(data),
        });

        // Client e-mail
        await transporter.sendMail({
            from: fromAddress,
            to: data.email,
            subject: `IT üzemeltetési ajánlat – ${data.companyName}`,
            html: buildClientHtml(data),
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Email send error:", err);
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
