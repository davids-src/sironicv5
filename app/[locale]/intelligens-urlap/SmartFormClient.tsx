"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, Send, AlertTriangle, Zap,
  Mail, CheckCircle2, RotateCcw, Building2, Server, Wifi,
  Monitor, FileText, TrendingUp
} from "lucide-react";
import styles from "./SmartFormClient.module.css";
import {
  trackTabSwitch,
  trackFormStep,
  trackAssessmentStart,
  trackAssessmentResult,
  trackAssessmentDecision,
  trackFormSubmit,
  trackFormError,
} from "@/lib/analytics";

// ─── COUNTIES ─────────────────────────────────────────────────────────────────
const COUNTIES = [
  "Budapest", "Baranya", "Bács-Kiskun", "Békés", "Borsod-Abaúj-Zemplén",
  "Csongrád-Csanád", "Fejér", "Győr-Moson-Sopron", "Hajdú-Bihar", "Heves",
  "Jász-Nagykun-Szolnok", "Komárom-Esztergom", "Nógrád", "Pest", "Somogy",
  "Szabolcs-Szatmár-Bereg", "Tolna", "Vas", "Veszprém", "Zala",
];

// ─── PRICING DATA ──────────────────────────────────────────────────────────────
const Q2_OPTIONS = [
  { label: "Kereskedelem vagy szolgáltatás", multiplier: 1.0 },
  { label: "Vendéglátás, szépség- és egészségipar", multiplier: 1.0 },
  { label: "Könyvelés, irodai vagy tanácsadói szolgáltatás", multiplier: 1.1 },
  { label: "Egészségügy vagy jogi iroda", multiplier: 1.2 },
  { label: "Gyártás vagy logisztika", multiplier: 1.25 },
  { label: "IT, pénzügy vagy más adatérzékeny tevékenység", multiplier: 1.35 },
];
const Q3_OPTIONS = [
  { label: "1–5 fő", add: 0 },
  { label: "6–15 fő", add: 8000 },
  { label: "16–30 fő", add: 18000 },
  { label: "31–50 fő", add: 32000 },
  { label: "50 fő felett", add: 50000 },
];
const Q4_OPTIONS = [
  { label: "Iroda", add: 0 },
  { label: "Üzlet vagy szalon", add: 3000 },
  { label: "Raktár", add: 5000 },
  { label: "Gyár vagy termelőcsarnok", add: 12000 },
  { label: "Egészségügyi rendelő vagy klinika", add: 10000 },
  { label: "Vegyes jellegű (pl. iroda + raktár)", add: 15000 },
];
const Q5_OPTIONS = [
  { label: "100 m² alatt", add: 0 },
  { label: "101–300 m²", add: 4000 },
  { label: "301–600 m²", add: 9000 },
  { label: "601–1000 m²", add: 16000 },
  { label: "1000 m² felett", add: 25000 },
];
const Q6_OPTIONS = [
  { label: "1–2 helyiség", add: 0 },
  { label: "3–5 helyiség", add: 5000 },
  { label: "6–10 helyiség", add: 10000 },
  { label: "10 helyiségnél több", add: 18000 },
];
const Q7_OPTIONS = [
  { label: "Nincs szerver", add: 0, showQ8: false },
  { label: "Van szerver vagy szerverszoba", add: 15000, showQ8: true },
  { label: "Nem tudom", add: 7000, showQ8: false },
];
const Q8_OPTIONS = [
  { label: "Rack szerver (fiókos szervergép)", pricePerUnit: 4000 },
  { label: "NAS eszköz (hálózati adattároló)", pricePerUnit: 2500 },
  { label: "UPS (szünetmentes tápegység)", pricePerUnit: 1000 },
  { label: "Patch panel (kábelrendező egység)", pricePerUnit: 800 },
  { label: "Switch (hálózati elosztó)", pricePerUnit: 1500 },
  { label: "Router / Tűzfal", pricePerUnit: 3000 },
];
const Q9_OPTIONS = [
  { label: "Laptop", pricePerUnit: 1800 },
  { label: "Asztali PC", pricePerUnit: 1500 },
];
const Q10_OPTIONS = [
  { label: "Router (internet elosztó)", pricePerUnit: 1200 },
  { label: "Switch (hálózati elosztó, nem menedzselt)", pricePerUnit: 800 },
  { label: "Wi-Fi access point (vezeték nélküli jelerősítő)", pricePerUnit: 1000 },
  { label: "IP telefon (internetes telefonkészülék)", pricePerUnit: 500 },
  { label: "Egyéb hálózati eszköz", pricePerUnit: 700 },
];
const Q11_OPTIONS = [
  { label: "Windows 11", pricePerUnit: 0, warning: "" },
  { label: "Windows 10", pricePerUnit: 1000, warning: "" },
  { label: "Windows 8.1", pricePerUnit: 2500, warning: "Ez a rendszer már nem kap biztonsági frissítést – frissítést javaslunk." },
  { label: "Windows 7", pricePerUnit: 4000, warning: "Kritikus biztonsági kockázat – mielőbbi csere javasolt." },
  { label: "Linux (asztali verzió)", pricePerUnit: 1500, warning: "" },
  { label: "Mac (Apple számítógép)", pricePerUnit: 2000, warning: "" },
];
const Q12_OPTIONS = [
  { label: "Optikai (üvegszálas) kapcsolat", add: 0 },
  { label: "Koaxiális kábel (pl. kábelTV-s szolgáltató)", add: 3000 },
  { label: "Mikrohullámú (antennás, vezeték nélküli)", add: 6000 },
  { label: "Nem tudom", add: 2000 },
];
const Q15_CHECKBOXES = [
  "Weboldal fejlesztése vagy megújítása",
  "Webáruház (webshop) fejlesztése",
  "Belső vállalatirányítási rendszer (ERP/CRM)",
  "NIS2 megfelelőség kialakítása",
  "Hálózat fejlesztése vagy teljes kipítése",
  "Felhő alapú megoldások bevezetése (pl. Microsoft 365)",
  "Adatmentési és katasztrófa-helyreállítási rendszer",
  "IT biztonsági audit vagy felülvizsgálat",
  "Kamera- vagy riasztórendszer (SIRO-VÉD)",
];

type ItemQty = { checked: boolean; qty: number };
type Tab = "assessment" | "contact" | "incident";

// ─── WIZARD STATE ──────────────────────────────────────────────────────────────
interface WizardState {
  // Q1
  companyName: string; contactName: string; email: string;
  phone: string; county: string; city: string;
  // Q2–Q12 index selections
  q2: number | null; q3: number | null; q4: number | null;
  q5: number | null; q6: number | null; q7: number | null;
  // Q8
  q8: ItemQty[];
  // Q9
  q9: { laptop: number; pc: number };
  // Q10
  q10: ItemQty[];
  // Q11
  q11: ItemQty[];
  // Q12
  q12: number | null;
  // Q13
  download: string; upload: string;
  // Q14
  problems: string;
  // Q15
  q15checks: boolean[]; q15free: string;
}

const initWizard = (): WizardState => ({
  companyName: "", contactName: "", email: "", phone: "", county: "", city: "",
  q2: null, q3: null, q4: null, q5: null, q6: null, q7: null,
  q8: Q8_OPTIONS.map(() => ({ checked: false, qty: 1 })),
  q9: { laptop: 0, pc: 0 },
  q10: Q10_OPTIONS.map(() => ({ checked: false, qty: 1 })),
  q11: Q11_OPTIONS.map(() => ({ checked: false, qty: 1 })),
  q12: null, download: "", upload: "",
  problems: "",
  q15checks: Q15_CHECKBOXES.map(() => false), q15free: "",
});

function countProblems(text: string): number {
  if (!text.trim()) return 0;
  const byComma = text.split(",");
  const byNewline = text.split("\n");
  const items = byComma.length > byNewline.length ? byComma : byNewline;
  return items.filter(s => s.trim().length > 0).length;
}
function q14Multiplier(count: number): number {
  if (count <= 2) return 1.0;
  if (count <= 5) return 1.05;
  if (count <= 10) return 1.1;
  return 1.15;
}

function calcPrice(s: WizardState) {
  const base = 25000;
  const q3add = s.q3 !== null ? Q3_OPTIONS[s.q3].add : 0;
  const q4add = s.q4 !== null ? Q4_OPTIONS[s.q4].add : 0;
  const q5add = s.q5 !== null ? Q5_OPTIONS[s.q5].add : 0;
  const q6add = s.q6 !== null ? Q6_OPTIONS[s.q6].add : 0;
  const q7add = s.q7 !== null ? Q7_OPTIONS[s.q7].add : 0;
  const q8sum = s.q8.reduce((acc, item, i) => acc + (item.checked ? item.qty * Q8_OPTIONS[i].pricePerUnit : 0), 0);
  const q9sum = s.q9.laptop * 1800 + s.q9.pc * 1500;
  const q10sum = s.q10.reduce((acc, item, i) => acc + (item.checked ? item.qty * Q10_OPTIONS[i].pricePerUnit : 0), 0);
  const q11sum = s.q11.reduce((acc, item, i) => acc + (item.checked ? item.qty * Q11_OPTIONS[i].pricePerUnit : 0), 0);
  const q12add = s.q12 !== null ? Q12_OPTIONS[s.q12].add : 0;
  const q2mult = s.q2 !== null ? Q2_OPTIONS[s.q2].multiplier : 1.0;
  const cnt = countProblems(s.problems);
  const q14mult = q14Multiplier(cnt);
  const additive = base + q3add + q4add + q5add + q6add + q7add + q8sum + q9sum + q10sum + q11sum + q12add;
  const final = Math.round(additive * q2mult * q14mult);
  const low = Math.round(final * 0.90 / 1000) * 1000;
  const high = Math.round(final * 1.15 / 1000) * 1000;
  return { final, low, high, q3add, q4add, q5add, q6add, q7add, q8sum, q9sum, q10sum, q11sum, q12add, q2mult, q14mult };
}

function formatHuf(n: number) {
  return n.toLocaleString("hu-HU") + " Ft";
}

// ─── STEP DEFINITIONS ─────────────────────────────────────────────────────────
function buildSteps(s: WizardState): number[] {
  const showQ8 = s.q7 !== null && Q7_OPTIONS[s.q7].showQ8;
  const steps = [1, 2, 3, 4, 5, 6, 7];
  if (showQ8) steps.push(8);
  steps.push(9, 10, 11, 12, 13, 14, 15);
  return steps;
}

// ─── SINGLE SELECT ─────────────────────────────────────────────────────────────
function SingleSelect({ options, value, onChange }: {
  options: { label: string }[]; value: number | null; onChange: (i: number) => void;
}) {
  return (
    <div className={styles.optionGrid}>
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          className={`${styles.optionBtn} ${value === i ? styles.selected : ""}`}
          onClick={() => onChange(i)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── MULTI SELECT WITH QUANTITY ────────────────────────────────────────────────
function MultiQtySelect({ options, values, onChange }: {
  options: { label: string; pricePerUnit: number }[];
  values: ItemQty[];
  onChange: (idx: number, field: "checked" | "qty", val: boolean | number) => void;
}) {
  return (
    <div className={styles.multiQtyGrid}>
      {options.map((opt, i) => (
        <div key={i} className={`${styles.multiQtyItem} ${values[i].checked ? styles.multiQtySelected : ""}`}>
          <label className={styles.multiQtyLabel}>
            <input
              type="checkbox"
              checked={values[i].checked}
              onChange={e => onChange(i, "checked", e.target.checked)}
              className={styles.multiQtyCheckbox}
            />
            <span>{opt.label}</span>
          </label>
          {values[i].checked && (
            <div className={styles.qtyRow}>
              <button type="button" className={styles.qtyBtn}
                onClick={() => onChange(i, "qty", Math.max(1, values[i].qty - 1))}>−</button>
              <span className={styles.qtyNum}>{values[i].qty} db</span>
              <button type="button" className={styles.qtyBtn}
                onClick={() => onChange(i, "qty", values[i].qty + 1)}>+</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── HELPER TEXT ───────────────────────────────────────────────────────────────
function HelperText({ text }: { text: string }) {
  return <p className={styles.helperText}>{text}</p>;
}

function WarningBox({ messages }: { messages: string[] }) {
  if (!messages.length) return null;
  return (
    <div className={styles.warningBox}>
      <AlertTriangle size={16} className={styles.warningIcon} />
      <div>{messages.map((m, i) => <p key={i}>{m}</p>)}</div>
    </div>
  );
}

// ─── ASSESSMENT WIZARD ─────────────────────────────────────────────────────────
function AssessmentWizard() {
  const [state, setState] = useState<WizardState>(initWizard);
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<"wizard" | "result">("wizard");
  const [acceptance, setAcceptance] = useState<"accepted" | "declined" | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const steps = buildSteps(state);
  const currentStep = steps[stepIdx];
  const totalSteps = steps.length;

  const update = useCallback(<K extends keyof WizardState>(k: K, v: WizardState[K]) => {
    setState(prev => ({ ...prev, [k]: v }));
  }, []);

  // Validation per step
  const canNext = (() => {
    switch (currentStep) {
      case 1: return state.companyName.trim().length > 0 && state.contactName.trim().length > 0
        && /\S+@\S+\.\S+/.test(state.email) && state.phone.trim().length > 0
        && state.county !== "" && state.city.trim().length > 0;
      case 2: return state.q2 !== null;
      case 3: return state.q3 !== null;
      case 4: return state.q4 !== null;
      case 5: return state.q5 !== null;
      case 6: return state.q6 !== null;
      case 7: return state.q7 !== null;
      case 8: return true; // optional items
      case 9: return (state.q9.laptop + state.q9.pc) > 0;
      case 10: return true;
      case 11: return true;
      case 12: return state.q12 !== null;
      case 13: return true;
      case 14: return true;
      case 15: return true;
      default: return false;
    }
  })();

  const handleNext = () => {
    // Track step completion before advancing
    const stepLabels: Record<number, string> = {
      1: "Céges adatok", 2: "Tevékenységi kör", 3: "Dolgozók száma",
      4: "Telephely jellege", 5: "Alapterület", 6: "Helyiségek száma",
      7: "Szerverszoba", 8: "Szerverszoba tartalom", 9: "Munkaállomások",
      10: "Hálózati eszközök", 11: "Operációs rendszerek", 12: "Internet típusa",
      13: "Internet sebesség", 14: "IT problémák", 15: "Fejlesztési igények",
    };
    trackFormStep(currentStep, stepLabels[currentStep] ?? `Lépés ${currentStep}`);
    if (stepIdx < totalSteps - 1) setStepIdx(s => s + 1);
    else {
      const { low, high } = calcPrice(state);
      trackAssessmentResult(low, high);
      setPhase("result");
    }
  };
  const handleBack = () => {
    if (stepIdx > 0) setStepIdx(s => s - 1);
  };

  const handleAccept = async (acc: "accepted" | "declined") => {
    setAcceptance(acc);
    setSending(true);
    setSendError("");
    const { final, low, high, q3add, q4add, q5add, q6add, q7add, q12add, q2mult, q14mult } = calcPrice(state);
    const cnt = countProblems(state.problems);
    const payload = {
      companyName: state.companyName, contactName: state.contactName,
      email: state.email, phone: state.phone, county: state.county, city: state.city,
      q2Label: state.q2 !== null ? Q2_OPTIONS[state.q2].label : "", q2Multiplier: q2mult,
      q3Label: state.q3 !== null ? Q3_OPTIONS[state.q3].label : "", q3Add: q3add,
      q4Label: state.q4 !== null ? Q4_OPTIONS[state.q4].label : "", q4Add: q4add,
      q5Label: state.q5 !== null ? Q5_OPTIONS[state.q5].label : "", q5Add: q5add,
      q6Label: state.q6 !== null ? Q6_OPTIONS[state.q6].label : "", q6Add: q6add,
      q7Label: state.q7 !== null ? Q7_OPTIONS[state.q7].label : "", q7Add: q7add,
      serverRoomItems: state.q8.filter((it, i) => it.checked).map((it, _, __, i2 = state.q8.findIndex((x, idx) => x === it)) => ({
        label: Q8_OPTIONS[i2].label, qty: it.qty, price_per_unit: Q8_OPTIONS[i2].pricePerUnit,
      })),
      workstations: [
        ...(state.q9.laptop > 0 ? [{ label: "Laptop", qty: state.q9.laptop, price_per_unit: 1800 }] : []),
        ...(state.q9.pc > 0 ? [{ label: "Asztali PC", qty: state.q9.pc, price_per_unit: 1500 }] : []),
      ],
      networkItems: state.q10.filter(it => it.checked).map((it, _, __, i2 = state.q10.findIndex(x => x === it)) => ({
        label: Q10_OPTIONS[i2].label, qty: it.qty, price_per_unit: Q10_OPTIONS[i2].pricePerUnit,
      })),
      osItems: state.q11.filter(it => it.checked).map((it, _, __, i2 = state.q11.findIndex(x => x === it)) => ({
        label: Q11_OPTIONS[i2].label, qty: it.qty, price_per_unit: Q11_OPTIONS[i2].pricePerUnit,
        warning: Q11_OPTIONS[i2].warning,
      })),
      q12Label: state.q12 !== null ? Q12_OPTIONS[state.q12].label : "", q12Add: q12add,
      downloadSpeed: state.download !== "" ? Number(state.download) : null,
      uploadSpeed: state.upload !== "" ? Number(state.upload) : null,
      problemsText: state.problems, problemsCount: cnt, q14Multiplier: q14mult,
      developmentNeeds: Q15_CHECKBOXES.filter((_, i) => state.q15checks[i]),
      developmentFreetext: state.q15free,
      finalPrice: final, priceLow: low, priceHigh: high,
      acceptance: acc,
      submittedAt: new Date().toLocaleString("hu-HU"),
    };

    // Proper mapping for arrays with index
    payload.serverRoomItems = state.q8.reduce<typeof payload.serverRoomItems>((acc, it, i) => {
      if (it.checked) acc.push({ label: Q8_OPTIONS[i].label, qty: it.qty, price_per_unit: Q8_OPTIONS[i].pricePerUnit });
      return acc;
    }, []);
    payload.networkItems = state.q10.reduce<typeof payload.networkItems>((acc, it, i) => {
      if (it.checked) acc.push({ label: Q10_OPTIONS[i].label, qty: it.qty, price_per_unit: Q10_OPTIONS[i].pricePerUnit });
      return acc;
    }, []);
    payload.osItems = state.q11.reduce<typeof payload.osItems>((acc, it, i) => {
      if (it.checked) acc.push({ label: Q11_OPTIONS[i].label, qty: it.qty, price_per_unit: Q11_OPTIONS[i].pricePerUnit, warning: Q11_OPTIONS[i].warning });
      return acc;
    }, []);

    try {
      const res = await fetch("/api/send-assessment-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Szerver hiba");
      trackAssessmentDecision(acc, final);
      trackFormSubmit("assessment");
      setSent(true);
    } catch (e) {
      const msg = "Hiba az e-mail küldésekor. Kérjük, vegye fel velünk a kapcsolatot közvetlenül.";
      trackFormError("assessment", String(e));
      setSendError(msg);
    } finally {
      setSending(false);
    }
  };

  const { final, low, high } = calcPrice(state);
  const progress = ((stepIdx + 1) / totalSteps) * 100;

  // OS warnings for Q11
  const osWarnings = state.q11.reduce<string[]>((acc, it, i) => {
    if (it.checked && Q11_OPTIONS[i].warning) acc.push(Q11_OPTIONS[i].warning);
    return acc;
  }, []);

  // Speed warnings for Q13
  const speedWarnings: string[] = [];
  if (state.download !== "" && Number(state.download) < 20)
    speedWarnings.push("Alacsony letöltési sebesség – hálózatfejlesztést javaslunk.");
  if (state.upload !== "" && Number(state.upload) < 5)
    speedWarnings.push("Alacsony feltöltési sebesség – hálózatfejlesztést javaslunk.");

  if (phase === "result") {
    const allWarnings = [...osWarnings, ...speedWarnings];
    const devNeeds = Q15_CHECKBOXES.filter((_, i) => state.q15checks[i]);
    return (
      <div className={styles.resultWrap}>
        {sent ? (
          <div className={styles.successBox}>
            <CheckCircle2 size={48} className={styles.successIcon} />
            <h3 className="heading-2">Köszönjük!</h3>
            <p className="body-lg" style={{ textAlign: "center", maxWidth: 460 }}>
              {acceptance === "accepted"
                ? "Kollégánk 1 munkanapon belül felveszi Önnel a kapcsolatot az elfogadott ajánlattal kapcsolatban."
                : "Megőriztük az ajánlatát. Ha bármikor kérdése merül fel, keressen minket!"}
            </p>
            <button
              className="btn btn-outline"
              onClick={() => { setState(initWizard()); setStepIdx(0); setPhase("wizard"); setSent(false); setAcceptance(null); }}
            >
              <RotateCcw size={14} /> Új felmérés indítása
            </button>
          </div>
        ) : (
          <>
            <div className={styles.priceBox}>
              <span className={styles.priceLabel}>Hozzávetőleges havi üzemeltetési díj</span>
              <span className={styles.priceRange}>
                {formatHuf(low)} – {formatHuf(high)}
                <small> / hó + ÁFA</small>
              </span>
              <span className={styles.priceDisclaimer}>
                Ez egy tájékoztató ártartomány az Ön által megadott adatok alapján.
                A pontos ajánlathoz kollégánk 1 munkanapon belül felveszi Önnel a kapcsolatot.
              </span>
            </div>

            <div className={styles.includedServices}>
              <h3 className={styles.includedTitle}>A díjban foglalt szolgáltatások</h3>
              <ul className={styles.serviceList}>
                {["Távolról végzett rendszer-karbantartás és felügyelet",
                  "Hibaelhárítás (remote support)",
                  "Havi állapotjelentés",
                  "Dedikált kapcsolattartó"
                ].map((s, i) => (
                  <li key={i}><CheckCircle2 size={14} /> {s}</li>
                ))}
              </ul>
            </div>

            {allWarnings.length > 0 && (
              <WarningBox messages={allWarnings} />
            )}

            {devNeeds.length > 0 && (
              <div className={styles.devNeedsBox}>
                <h3 className={styles.includedTitle}>Fejlesztési igények (külön ajánlat)</h3>
                <ul className={styles.serviceList}>
                  {devNeeds.map((n, i) => <li key={i}><ChevronRight size={14} /> {n}</li>)}
                  {state.q15free && <li><ChevronRight size={14} /> Egyéb: {state.q15free}</li>}
                </ul>
              </div>
            )}

            <div className={styles.acceptanceBlock}>
              <h3 className={styles.acceptanceTitle}>Mit szeretne tenni az ajánlattal?</h3>
              {sendError && <p className={styles.sendError}>{sendError}</p>}
              <div className={styles.acceptanceButtons}>
                <button
                  className={`btn btn-primary btn-lg ${sending ? "disabled" : ""}`}
                  disabled={sending}
                  onClick={() => handleAccept("accepted")}
                >
                  <CheckCircle2 size={16} />
                  Elfogadom, kérem vegyék fel velem a kapcsolatot
                </button>
                <button
                  className={`btn btn-outline ${sending ? "disabled" : ""}`}
                  disabled={sending}
                  onClick={() => handleAccept("declined")}
                >
                  Egyelőre csak tájékozódtam, de elmentem az ajánlatot
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── Step rendering ──────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Céges adatok</h3>
            <div className={styles.fieldGrid}>
              <div className="form-group">
                <label className="form-label">Cégnév *</label>
                <input className="form-input" value={state.companyName}
                  onChange={e => update("companyName", e.target.value)} placeholder="Sironic Kft." />
              </div>
              <div className="form-group">
                <label className="form-label">Kapcsolattartó neve *</label>
                <input className="form-input" value={state.contactName}
                  onChange={e => update("contactName", e.target.value)} placeholder="Kovács János" />
              </div>
              <div className="form-group">
                <label className="form-label">E-mail cím *</label>
                <input type="email" className="form-input" value={state.email}
                  onChange={e => update("email", e.target.value)} placeholder="pelda@ceg.hu" />
              </div>
              <div className="form-group">
                <label className="form-label">Telefonszám *</label>
                <input type="tel" className="form-input" value={state.phone}
                  onChange={e => update("phone", e.target.value)} placeholder="+36 70 273 5532" />
              </div>
              <div className="form-group">
                <label className="form-label">Megye *</label>
                <select className="form-select" value={state.county}
                  onChange={e => update("county", e.target.value)}>
                  <option value="">Válasszon megyét...</option>
                  {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Város / Település *</label>
                <input className="form-input" value={state.city}
                  onChange={e => update("city", e.target.value)} placeholder="Kezdjen el gépelni..." />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Mi a cég fő tevékenységi köre?</h3>
            <HelperText text="Ez segít megbecsülni, mekkora IT terhelést és kockázatot jelent a rendszer üzemeltetése." />
            <SingleSelect options={Q2_OPTIONS} value={state.q2} onChange={v => update("q2", v)} />
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Hány fő dolgozik a vállalkozásnál?</h3>
            <SingleSelect options={Q3_OPTIONS} value={state.q3} onChange={v => update("q3", v)} />
          </div>
        );

      case 4:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Milyen jellegű a telephely, ahova az üzemeltetést kéri?</h3>
            <HelperText text="Ha több telephelye is van, válassza azt, amelyikre az ajánlatot kéri. Több telephelyre külön ajánlatot tudunk készíteni." />
            <SingleSelect options={Q4_OPTIONS} value={state.q4} onChange={v => update("q4", v)} />
          </div>
        );

      case 5:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Mekkora a telephely alapterülete?</h3>
            <HelperText text="Nem kell pontos szám – hozzávetőleges méret is tökéletes. Ez segít felmérni a helyszíni munkavégzés várható időigényét." />
            <SingleSelect options={Q5_OPTIONS} value={state.q5} onChange={v => update("q5", v)} />
          </div>
        );

      case 6:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Hány helyiségben találhatók informatikai eszközök?</h3>
            <HelperText text="Például ha 3 irodában és egy tárgyalóban vannak számítógépek, az 4 helyiség." />
            <SingleSelect options={Q6_OPTIONS} value={state.q6} onChange={v => update("q6", v)} />
          </div>
        );

      case 7:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Van a telephelyen szerverszoba vagy szerver?</h3>
            <HelperText text="A szerver egy speciális számítógép, amely adatokat tárol és osztja meg a munkatársak között. Ha nem biztos benne, hogy van-e ilyen, válassza a 'Nem tudom' opciót – kollégánk tisztázza ezt Önnel." />
            <SingleSelect options={Q7_OPTIONS} value={state.q7} onChange={v => update("q7", v)} />
          </div>
        );

      case 8:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Mi található a szerverszobában?</h3>
            <HelperText text="Jelölje be, ami megtalálható a szerverszobában, és adja meg a darabszámot. Ha nem ismeri pontosan, adjon közelítő értéket." />
            <MultiQtySelect
              options={Q8_OPTIONS}
              values={state.q8}
              onChange={(i, field, val) => {
                const next = [...state.q8];
                next[i] = { ...next[i], [field]: val };
                update("q8", next);
              }}
            />
          </div>
        );

      case 9:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Hány munkaállomás van a telephelyen?</h3>
            <HelperText text="Adja meg külön a laptopok és az asztali számítógépek számát." />
            <div className={styles.quantitySplit}>
              {[{ key: "laptop" as const, label: "Laptop", price: 1800 },
              { key: "pc" as const, label: "Asztali PC", price: 1500 }].map(it => (
                <div key={it.key} className={styles.qtySplitItem}>
                  <div className={styles.qtySplitLabel}>
                    <span>{it.label}</span>
                  </div>
                  <div className={styles.qtyRow}>
                    <button type="button" className={styles.qtyBtn}
                      onClick={() => update("q9", { ...state.q9, [it.key]: Math.max(0, state.q9[it.key] - 1) })}>−</button>
                    <span className={styles.qtyNum}>{state.q9[it.key]} db</span>
                    <button type="button" className={styles.qtyBtn}
                      onClick={() => update("q9", { ...state.q9, [it.key]: state.q9[it.key] + 1 })}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Milyen hálózati eszközök találhatók a telephelyen?</h3>
            <HelperText text="Jelölje be, ami megtalálható, és adja meg a darabszámot. Ezek azok a dobozok, amelyekbe a hálózati kábelek csatlakoznak, vagy amelyek a Wi-Fi jelet sugározzák." />
            <MultiQtySelect
              options={Q10_OPTIONS}
              values={state.q10}
              onChange={(i, field, val) => {
                const next = [...state.q10];
                next[i] = { ...next[i], [field]: val };
                update("q10", next);
              }}
            />
          </div>
        );

      case 11:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Milyen operációs rendszer fut a számítógépeken?</h3>
            <HelperText text="Az operációs rendszer az a szoftver, ami a számítógépet működteti (pl. Windows). Ha többféle is van, mindegyiket jelölje be és adja meg a darabszámot." />
            <MultiQtySelect
              options={Q11_OPTIONS}
              values={state.q11}
              onChange={(i, field, val) => {
                const next = [...state.q11];
                next[i] = { ...next[i], [field]: val };
                update("q11", next);
              }}
            />
            {osWarnings.length > 0 && <WarningBox messages={osWarnings} />}
          </div>
        );

      case 12:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Milyen típusú internet-kapcsolata van a telephelynek?</h3>
            <HelperText text="Ha nem tudja biztosan, nézze meg az internetkábelt vagy kérdezze meg az internet-szolgáltatóját. Az optikai kapcsolat a legstabilabb, a mikrohullámú (antenna alapú) a legkevésbé megbízható." />
            <SingleSelect options={Q12_OPTIONS} value={state.q12} onChange={v => update("q12", v)} />
          </div>
        );

      case 13:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Milyen az internet sebessége?</h3>
            <HelperText text="Mérje meg a sebességet a speedtest.net oldalon (ingyenes, 1 perc alatt elvégezhető). Kattintson a 'Go' gombra, és az eredményt írja be ide." />
            <div className={styles.fieldGrid}>
              <div className="form-group">
                <label className="form-label">Letöltési sebesség (Mbps)</label>
                <input type="number" className="form-input" value={state.download}
                  onChange={e => update("download", e.target.value)}
                  placeholder="pl. 100" min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Feltöltési sebesség (Mbps)</label>
                <input type="number" className="form-input" value={state.upload}
                  onChange={e => update("upload", e.target.value)}
                  placeholder="pl. 20" min="0" />
              </div>
            </div>
            {speedWarnings.length > 0 && <WarningBox messages={speedWarnings} />}
          </div>
        );

      case 14: {
        const cnt = countProblems(state.problems);
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Szoktak-e előfordulni rendszeres IT-problémák?</h3>
            <HelperText text="Sorolja fel azokat a hibákat vagy bosszúságokat, amelyek rendszeresen előfordulnak. Nem kell részletesen leírni – elég egy-egy rövid mondat." />
            <textarea
              className="form-textarea"
              style={{ minHeight: 120 }}
              value={state.problems}
              onChange={e => update("problems", e.target.value)}
              placeholder="Pl. Lassú a gép reggel, a nyomtató sokszor nem kapcsolódik..."
            />
            {cnt > 0 && (
              <p className={styles.counterNote}>
                {cnt} tétel azonosítva
                {cnt >= 3 && cnt <= 5 && " (×1.05 szorzó)"}
                {cnt >= 6 && cnt <= 10 && " (×1.10 szorzó)"}
                {cnt > 10 && " (×1.15 szorzó)"}
              </p>
            )}
          </div>
        );
      }

      case 15:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Van-e fejlesztési igény, amire szükség lehet a közeljövőben?</h3>
            <HelperText text="Jelölje be ami érdekes lehet, vagy írja le szabadon. Ez nem befolyásolja az árat – külön ajánlatot készítünk rá." />
            <div className={styles.q15Grid}>
              {Q15_CHECKBOXES.map((label, i) => (
                <label key={i} className={styles.q15Item}>
                  <input
                    type="checkbox"
                    checked={state.q15checks[i]}
                    onChange={e => {
                      const next = [...state.q15checks];
                      next[i] = e.target.checked;
                      update("q15checks", next);
                    }}
                    className={styles.multiQtyCheckbox}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <label className="form-label">Egyéb fejlesztési igény (szabadon leírva)</label>
              <textarea className="form-textarea" style={{ minHeight: 80 }}
                value={state.q15free}
                onChange={e => update("q15free", e.target.value)}
                placeholder="Pl. Egyedi belső szoftver fejlesztése..." />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.wizardWrap}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.stepCounter}>{stepIdx + 1}. lépés / {totalSteps}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className={styles.stepNav}>
        {stepIdx > 0 && (
          <button type="button" className="btn btn-outline" onClick={handleBack}>
            <ChevronLeft size={15} /> Vissza
          </button>
        )}
        <button
          type="button"
          className={`btn btn-primary ${styles.stepNavNext}`}
          disabled={!canNext}
          onClick={handleNext}
        >
          {stepIdx === totalSteps - 1 ? "Eredmény megtekintése" : "Tovább"} <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── CONTACT FORM ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Kötelező mező";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Érvénytelen e-mail";
    if (!form.message.trim() || form.message.length < 10) e.message = "Legalább 10 karakter szükséges";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Szerver hiba");
      setSent(true);
    } catch (e) {
      setSendError("Hiba az e-mail küldésekor. Kérjük próbálja újra később.");
    } finally {
      setSending(false);
    }
  };

  if (sent) return (
    <div className={styles.successBox} style={{ padding: "3rem 1rem" }}>
      <CheckCircle2 size={44} className={styles.successIcon} />
      <h3 className="heading-2">Köszönjük!</h3>
      <p className="body-lg" style={{ textAlign: "center" }}>Hamarosan felvesszük Önnel a kapcsolatot.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.simpleForm}>
      <div className={styles.fieldGrid}>
        <div className="form-group">
          <label className="form-label">Neve *</label>
          <input className="form-input" value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Kovács János" />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">E-mail cím *</label>
          <input type="email" className="form-input" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="pelda@ceg.hu" />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Telefonszám</label>
          <input type="tel" className="form-input" value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+36 70 273 5532" />
        </div>
        <div className="form-group">
          <label className="form-label">Cég neve</label>
          <input className="form-input" value={form.company}
            onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Cég Kft." />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Üzenet *</label>
        <textarea className="form-textarea" value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          placeholder="Miben segíthetünk?" />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>
      {sendError && <div className="form-error" style={{textAlign: "center", marginTop: "1rem"}}>{sendError}</div>}
      <button type="submit" className="btn btn-primary" disabled={sending} style={{ marginTop: "0.5rem" }}>
        {sending ? "Küldés..." : "Üzenet küldése"} <Send size={14} />
      </button>
    </form>
  );
}

// ─── INCIDENT FORM ─────────────────────────────────────────────────────────────
// ─── INCIDENT FORM (full one-page implementation) ─────────────────────────────

const WHEN_OPTIONS = [
  "Az elmúlt 1 órában", "Ma, de korábban", "Tegnap", "Néhány napja", "Nem tudom pontosan",
];

const URGENCY_OPTIONS = [
  {
    value: "normal" as const, label: "Normál", color: "green",
    description: "A hiba kellemetlen, de a munka folytatható. Néhány napon belül megoldható.",
    response: "1–2 munkanapon belül felvesszük Önnel a kapcsolatot."
  },
  {
    value: "urgent" as const, label: "Sürgős", color: "amber",
    description: "A hiba jelentősen lassítja a munkát, de nem áll le teljesen. Aznapi vagy másnapi megoldás szükséges.",
    response: "Aznap vagy másnap reggelig keressük."
  },
  {
    value: "critical" as const, label: "Kritikus", color: "red",
    description: "A rendszer vagy egy kulcsfontosságú eszköz teljesen leállt. Azonnali beavatkozás szükséges.",
    response: "Azonnal foglalkozunk az esettel – ha nem hallott felőlünk 30 percen belül, hívjon minket."
  },
];

interface IncidentState {
  name: string; company: string; email: string; phone: string; isContract: boolean;
  device: string; whenStarted: string; description: string; attempted: string;
  urgency: "normal" | "urgent" | "critical" | "";
  file: File | null;
}

function IncidentForm() {
  const [form, setForm] = useState<IncidentState>({
    name: "", company: "", email: "", phone: "", isContract: false,
    device: "", whenStarted: "", description: "", attempted: "",
    urgency: "", file: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [ticketId, setTicketId] = useState("");

  const sirobPhoneNum = process.env.NEXT_PUBLIC_SIRONIC_PHONE ?? "+36 70 273 5532";

  const upd = <K extends keyof IncidentState>(k: K, v: IncidentState[K]) =>
    setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Kötelező mező";
    if (!form.company.trim()) e.company = "Kötelező mező";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Érvénytelen e-mail cím";
    if (form.phone.trim().length < 6) e.phone = "Kötelező mező";
    if (!form.device.trim()) e.device = "Kötelező mező";
    if (!form.whenStarted) e.whenStarted = "Kötelező mező";
    if (form.description.trim().length < 10) e.description = "Kérjük legalább röviden írja le";
    if (!form.urgency) e.urgency = "Válasszon sürgősségi szintet";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrors(p => ({ ...p, file: "Maximum 10 MB méretű fájl tölthető fel." }));
      return;
    }
    setErrors(p => { const n = { ...p }; delete n.file; return n; });
    upd("file", file);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError("");
    let fileData: string | undefined;
    if (form.file) {
      fileData = await new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.readAsDataURL(form.file!);
      });
    }
    try {
      const res = await fetch("/api/send-incident-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, company: form.company, email: form.email, phone: form.phone,
          isContract: form.isContract, device: form.device, whenStarted: form.whenStarted,
          description: form.description, attempted: form.attempted, urgency: form.urgency,
          ...(form.file && fileData ? { fileName: form.file.name, fileType: form.file.type, fileData } : {}),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Szerver hiba");
      setTicketId(json.ticketId);
    } catch {
      setSendError("Hiba a küldés során. Kérjük, vegye fel velünk a kapcsolatot közvetlenül.");
    } finally {
      setSending(false);
    }
  };

  const canSubmit = !!(form.name && form.company && /\S+@\S+\.\S+/.test(form.email)
    && form.phone.length >= 6 && form.device && form.whenStarted
    && form.description.length >= 10 && form.urgency);

  // Success screen
  if (ticketId) {
    const urgOption = URGENCY_OPTIONS.find(o => o.value === form.urgency);
    return (
      <div className={styles.incidentSuccess}>
        <CheckCircle2 size={52} className={styles.successIcon} />
        <h3 className="heading-2">Hibabejelentés rögzítve</h3>
        <div className={styles.ticketBox}>
          <span className={styles.ticketLabel}>Az Ön azonosítója</span>
          <span className={styles.ticketId}>{ticketId}</span>
          <span className={styles.ticketNote}>
            Kérjük, jegyezze fel vagy mentse el ezt az azonosítót – erre hivatkozva tudja nyomon követni az ügyét.
          </span>
        </div>
        <div className={styles.ticketResponse}>
          <strong>Várható reakcióidő:</strong><br />{urgOption?.response}
        </div>
        <button type="button" className="btn btn-outline" onClick={() => {
          setForm({
            name: "", company: "", email: "", phone: "", isContract: false,
            device: "", whenStarted: "", description: "", attempted: "", urgency: "", file: null
          });
          setTicketId(""); setSendError("");
        }}>
          <RotateCcw size={14} /> Újabb hiba bejelentése
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.simpleForm}>

      {/* SECTION 1 – Kapcsolati adatok */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}><span>1</span> Kapcsolati adatok</h3>
        <div className={styles.fieldGrid}>
          <div className="form-group">
            <label className="form-label">Teljes név *</label>
            <input className="form-input" value={form.name} placeholder="Kovács János"
              onChange={e => upd("name", e.target.value)} />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Cégnév *</label>
            <input className="form-input" value={form.company} placeholder="Példa Kft."
              onChange={e => upd("company", e.target.value)} />
            {errors.company && <span className="form-error">{errors.company}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">E-mail cím *</label>
            <input type="email" className="form-input" value={form.email} placeholder="info@pelda.hu"
              onChange={e => upd("email", e.target.value)} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Telefonszám *</label>
            <input type="tel" className="form-input" value={form.phone} placeholder="+36 70 273 5532"
              onChange={e => upd("phone", e.target.value)} />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
        </div>
        <label className={styles.contractCheck}>
          <input type="checkbox" checked={form.isContract}
            onChange={e => upd("isContract", e.target.checked)} className={styles.multiQtyCheckbox} />
          <span>
            <strong>Szerződéses ügyfél vagyok</strong>
            <span className={styles.checkHelper}> – Ha aktív szerződése van velünk, jelölje be – priorizált kezelést kap.</span>
          </span>
        </label>
      </div>

      {/* SECTION 2 – Hiba leírása */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}><span>2</span> A hiba leírása</h3>
        <div className="form-group">
          <label className="form-label">Milyen eszközt vagy rendszert érint a hiba? *</label>
          <input className="form-input" value={form.device}
            placeholder="Pl. irodai számítógép, hálózat, nyomtató, szerver..."
            onChange={e => upd("device", e.target.value)} />
          {errors.device && <span className="form-error">{errors.device}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Mikor kezdődött a probléma? *</label>
          <select className="form-select" value={form.whenStarted}
            onChange={e => upd("whenStarted", e.target.value)}>
            <option value="">Válasszon...</option>
            {WHEN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.whenStarted && <span className="form-error">{errors.whenStarted}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Hiba részletes leírása *</label>
          <textarea className="form-textarea" style={{ minHeight: 120 }} value={form.description}
            placeholder={"Írja le minél pontosabban mi történik, mi nem működik,\nés ha tudja, mi előzte meg a hibát."}
            onChange={e => upd("description", e.target.value)} />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">
            Próbált-e már valamit a hiba megoldására?{" "}
            <span style={{ color: "var(--text-subtle)", fontWeight: 400 }}>(opcionális)</span>
          </label>
          <textarea className="form-textarea" style={{ minHeight: 80 }} value={form.attempted}
            placeholder="Pl. újraindítottam a gépet, kihúztam a routert..."
            onChange={e => upd("attempted", e.target.value)} />
        </div>
      </div>

      {/* SECTION 3 – Sürgősség */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}><span>3</span> Sürgősség</h3>
        <p className={styles.helperText}>Válassza ki, melyik szint illik legjobban a helyzetére.</p>
        <div className={styles.urgencyGrid}>
          {URGENCY_OPTIONS.map(opt => (
            <button key={opt.value} type="button"
              className={`${styles.urgencyCard} ${styles[`urgency_${opt.color}`]} ${form.urgency === opt.value ? styles.urgencySelected : ""}`}
              onClick={() => upd("urgency", opt.value)}>
              <span className={styles.urgencyLabel}>{opt.label}</span>
              <span className={styles.urgencyDesc}>{opt.description}</span>
            </button>
          ))}
        </div>
        {errors.urgency && <span className="form-error" style={{ marginTop: "0.25rem", display: "block" }}>{errors.urgency}</span>}
        {form.urgency === "critical" && (
          <div className={styles.criticalCallout}>
            <AlertTriangle size={17} style={{ flexShrink: 0 }} />
            <span>
              <strong>Kritikus esetben ne csak a formot töltse ki – hívjon minket most:</strong>{" "}
              <strong style={{ fontSize: "1.05rem" }}>{sirobPhoneNum}</strong>
            </span>
          </div>
        )}
      </div>

      {/* SECTION 4 – Fájl */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <span>4</span> Fájl csatolása{" "}
          <span style={{ color: "var(--text-subtle)", fontSize: "0.85rem", fontWeight: 400 }}>(opcionális)</span>
        </h3>
        <p className={styles.helperText}>Ha tud képernyőképet készíteni a hibaüzenetről, az sokat segít a gyors megoldásban. Max. 10 MB, kép vagy PDF.</p>
        <div
          className={`${styles.fileZone} ${dragOver ? styles.fileZoneDrag : ""} ${form.file ? styles.fileZoneHasFile : ""}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => document.getElementById("incident-file-input")?.click()}
        >
          <input id="incident-file-input" type="file" accept="image/*,.pdf" style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {form.file ? (
            <div className={styles.fileInfo}>
              <CheckCircle2 size={18} style={{ color: "var(--primary)" }} />
              <span>{form.file.name}</span>
              <button type="button" className={styles.fileRemove}
                onClick={e => { e.stopPropagation(); upd("file", null); }}>✕</button>
            </div>
          ) : (
            <div className={styles.filePrompt}>
              <FileText size={26} />
              <span>Húzza ide a fájlt, vagy <strong>kattintson a tallózáshoz</strong></span>
              <span className={styles.fileHint}>Kép vagy PDF – max. 10 MB</span>
            </div>
          )}
        </div>
        {errors.file && <span className="form-error">{errors.file}</span>}
      </div>

      {sendError && <p className={styles.sendError}>{sendError}</p>}

      <button type="submit" className="btn btn-primary btn-lg"
        disabled={!canSubmit || sending}
        style={{ width: "100%", justifyContent: "center" }}>
        {sending ? "Küldés folyamatban..." : "Hibabejelentés elküldése"} <AlertTriangle size={16} />
      </button>
    </form>
  );
}

// ─── TAB CONFIG ────────────────────────────────────────────────────────────────
const TABS: { key: Tab; icon: React.ReactNode; label: string; badge?: string; desc: string }[] = [
  {
    key: "assessment",
    icon: <Zap size={20} />,
    label: "Intelligens igényfelmérés",
    badge: "Ajánlott",
    desc: "15 kérdéses wizard – hozzávetőleges árat kap azonnal",
  },
  {
    key: "contact",
    icon: <Mail size={20} />,
    label: "Kapcsolatfelvétel",
    desc: "Általános megkeresés, együttműködési érdeklődés",
  },
  {
    key: "incident",
    icon: <AlertTriangle size={20} />,
    label: "Eseti hibabejelentő",
    desc: "Azonnali vagy eseti IT-probléma bejelentése",
  },
];

// ─── MARKETING INTROS ─────────────────────────────────────────────────────────
const FEATURE_CARDS = [
  {
    icon: <TrendingUp size={24} />,
    title: "Azonnali árbecslés",
    desc: "Töltse ki az igényfelmérőt, és másodpercek alatt megtudja, mennyibe kerülhet az IT-üzemeltetés. Kötelezettség nélkül.",
  },
  {
    icon: <Building2 size={24} />,
    title: "Személyre szabott ajánlat",
    desc: "Az ár igazodik az Ön vállalkozásához – méret, telephely, eszközpark és tevékenység szerint számítjuk.",
  },
  {
    icon: <Server size={24} />,
    title: "Szakértői visszajelzés",
    desc: "Kollégánk 1 munkanapon belül felveszi Önnel a kapcsolatot, és részletes, tételes ajánlatot küld.",
  },
];

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function SmartFormClient() {
  const [activeTab, setActiveTab] = useState<Tab>("assessment");

  return (
    <section className="section" style={{ paddingTop: "1.5rem" }}>
      <div className="container">

        {/* Feature cards */}
        <div className={styles.featureCards}>
          {FEATURE_CARDS.map((card, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{card.icon}</div>
              <h3 className={styles.featureTitle}>{card.title}</h3>
              <p className={styles.featureDesc}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.wrapper}>
          {/* Tab bar */}
          <div className={styles.tabBar} role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                id={`tab-${tab.key}`}
                aria-controls={`panel-${tab.key}`}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                onClick={() => {
                  setActiveTab(tab.key);
                  trackTabSwitch(tab.key);
                  if (tab.key === "assessment") trackAssessmentStart();
                }}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabContent}>
                  <span className={styles.tabLabel}>
                    {tab.label}
                    {tab.badge && <span className={styles.tabBadge}>{tab.badge}</span>}
                  </span>
                  <span className={styles.tabDesc}>{tab.desc}</span>
                </span>
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === "assessment" && (
                <>
                  <div className={styles.panelHeader}>
                    <span className="badge"><Zap size={12} /> Intelligens Igényfelmérő</span>
                    <h2 className="heading-1">Mennyi az IT-üzemeltetés havi díja?</h2>
                    <p className="body-lg">Töltse ki a 15 kérdéses igényfelmérőt – azonnal kap egy hozzávetőleges ártartományt, kötelezettség nélkül.</p>
                  </div>
                  <AssessmentWizard />
                </>
              )}
              {activeTab === "contact" && (
                <>
                  <div className={styles.panelHeader}>
                    <span className="badge"><Mail size={12} /> Kapcsolatfelvétel</span>
                    <h2 className="heading-1">Írjon nekünk</h2>
                    <p className="body-lg">Általános érdeklődés, együttműködési megkeresés vagy bármilyen kérdés esetén. 1 munkanapon belül válaszolunk.</p>
                  </div>
                  <ContactForm />
                </>
              )}
              {activeTab === "incident" && (
                <>
                  <div className={styles.panelHeader}>
                    <span className="badge"><AlertTriangle size={12} /> Hibabejelentő</span>
                    <h2 className="heading-1">Eseti hibabejelentés</h2>
                    <p className="body-lg">Akár szerződéses ügyfél, akár eseti segítséget keres – töltse ki a hibajegyet, és hamarosan felvesszük Önnel a kapcsolatot.</p>
                  </div>
                  <IncidentForm />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
