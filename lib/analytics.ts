/**
 * SIRONIC – Google Analytics 4 Event Tracking Utility
 *
 * Usage: import { trackEvent, trackFormStep, ... } from "@/lib/analytics";
 * All functions are safe to call in SSR (no-op if window is missing).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Low-level GA4 event sender */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

// ─── PAGE / NAVIGATION ────────────────────────────────────────────────────────

/** Track a virtual page view (called automatically by @next/third-parties on route change) */
export function trackPageView(url: string, title?: string) {
  trackEvent("page_view", { page_location: url, page_title: title ?? "" });
}

// ─── CTA / BUTTON CLICKS ─────────────────────────────────────────────────────

/**
 * Track any CTA button click.
 * @param label  Human-readable label, e.g. "Intelligens igényfelmérés hero CTA"
 * @param destination  URL the button leads to (optional)
 */
export function trackCtaClick(label: string, destination?: string) {
  trackEvent("cta_click", { cta_label: label, destination: destination ?? "" });
}

/** Track outbound link clicks (e.g. to siroved.hu) */
export function trackOutboundLink(url: string, label?: string) {
  trackEvent("click", {
    link_url: url,
    link_text: label ?? url,
    outbound: true,
  });
}

// ─── SMART FORM / ASSESSMENT WIZARD ──────────────────────────────────────────

/**
 * Track when a user starts the Assessment Wizard (opens the tab).
 */
export function trackAssessmentStart() {
  trackEvent("assessment_start");
}

/**
 * Track each wizard step completion.
 * @param stepNumber  1-based step number (1–15)
 * @param stepTitle   Short label describing the step, e.g. "Céges adatok"
 */
export function trackFormStep(stepNumber: number, stepTitle: string) {
  trackEvent("assessment_step_complete", {
    step_number: stepNumber,
    step_title: stepTitle,
  });
}

/**
 * Track when the wizard reaches the result/price screen.
 * @param priceLow    Lower bound of the estimate in HUF
 * @param priceHigh   Upper bound of the estimate in HUF
 */
export function trackAssessmentResult(priceLow: number, priceHigh: number) {
  trackEvent("assessment_result_view", {
    price_low: priceLow,
    price_high: priceHigh,
  });
}

/**
 * Track the user's decision on the result screen.
 * @param decision  "accepted" | "declined"
 * @param priceFinal  Calculated final price
 */
export function trackAssessmentDecision(
  decision: "accepted" | "declined",
  priceFinal: number
) {
  trackEvent("assessment_decision", {
    decision,
    price_final: priceFinal,
  });
}

/**
 * Track successful form submission (email sent).
 * @param formType  "assessment" | "contact" | "incident"
 */
export function trackFormSubmit(formType: "assessment" | "contact" | "incident") {
  trackEvent("form_submit", { form_type: formType });
}

/**
 * Track form submission errors.
 */
export function trackFormError(formType: string, errorMessage: string) {
  trackEvent("form_error", { form_type: formType, error_message: errorMessage });
}

// ─── TAB SWITCHES ─────────────────────────────────────────────────────────────

/**
 * Track when a user switches between Smart Form tabs.
 * @param tab  "assessment" | "contact" | "incident"
 */
export function trackTabSwitch(tab: string) {
  trackEvent("smart_form_tab_switch", { tab_selected: tab });
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

export function trackContactFormStart() {
  trackEvent("contact_form_start");
}

export function trackContactFormSubmit() {
  trackEvent("form_submit", { form_type: "contact" });
}

// ─── INCIDENT FORM ────────────────────────────────────────────────────────────

export function trackIncidentFormSubmit() {
  trackEvent("form_submit", { form_type: "incident" });
}

// ─── ENGAGEMENT ───────────────────────────────────────────────────────────────

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%).
 * Add this to any page component with useEffect.
 */
export function setupScrollTracking() {
  if (typeof window === "undefined") return;
  const milestones = [25, 50, 75, 100];
  const fired = new Set<number>();

  const handler = () => {
    const scrolled =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    for (const m of milestones) {
      if (scrolled >= m && !fired.has(m)) {
        fired.add(m);
        trackEvent("scroll_depth", { percent: m, page: window.location.pathname });
      }
    }
  };

  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}
