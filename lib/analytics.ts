/**
 * SIRONIC – Google Analytics 4 Event Tracking & First-Party Attribution Engine
 *
 * Usage: import { trackEvent, trackLeadGenerated, getAttributionData, ... } from "@/lib/analytics";
 * All functions are SSR-safe (no-op if window is missing).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface TouchpointData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  landing_page: string;
  referrer: string;
  timestamp: string;
}

export interface AttributionStore {
  first_touch?: TouchpointData;
  last_touch?: TouchpointData;
}

const ATTR_STORAGE_KEY = "sironic_attribution_v1";

/** Low-level GA4 event sender */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // Clean null/undefined values
  const cleanParams: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (val !== null && val !== undefined) {
        cleanParams[key] = val;
      }
    }
  }
  window.gtag("event", eventName, cleanParams);
}

// ─── ATTRIBUTION ENGINE ────────────────────────────────────────────────────────

/**
 * Initializes client-side first-party attribution tracking.
 * Captures UTM params, GCLID, referrer, landing page timestamp in localStorage.
 * No PII stored. Safe for GDPR / Privacy compliance.
 */
export function initAttributionTracking(): AttributionStore | null {
  if (typeof window === "undefined") return null;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hasUtmOrGclid =
      urlParams.has("utm_source") ||
      urlParams.has("gclid") ||
      urlParams.has("gbraid") ||
      urlParams.has("wbraid");

    const currentTouch: TouchpointData = {
      utm_source: urlParams.get("utm_source") || undefined,
      utm_medium: urlParams.get("utm_medium") || undefined,
      utm_campaign: urlParams.get("utm_campaign") || undefined,
      utm_content: urlParams.get("utm_content") || undefined,
      utm_term: urlParams.get("utm_term") || undefined,
      gclid: urlParams.get("gclid") || undefined,
      gbraid: urlParams.get("gbraid") || undefined,
      wbraid: urlParams.get("wbraid") || undefined,
      landing_page: window.location.pathname + window.location.search,
      referrer: document.referrer || "direct",
      timestamp: new Date().toISOString(),
    };

    let store: AttributionStore = {};
    const raw = localStorage.getItem(ATTR_STORAGE_KEY);
    if (raw) {
      try {
        store = JSON.parse(raw);
      } catch {
        store = {};
      }
    }

    // Set first_touch only once
    if (!store.first_touch) {
      store.first_touch = currentTouch;
    }

    // Update last_touch if new campaign params exist or if last_touch is missing
    if (hasUtmOrGclid || !store.last_touch) {
      store.last_touch = currentTouch;
    }

    localStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(store));
    return store;
  } catch (err) {
    console.error("Attribution tracking error:", err);
    return null;
  }
}

/** Retrieve current attribution store from localStorage */
export function getAttributionData(): AttributionStore | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ATTR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : initAttributionTracking();
  } catch {
    return null;
  }
}

// ─── RECOMMENDED GA4 CONVERSION EVENT ──────────────────────────────────────────

export interface LeadGeneratedParams {
  lead_source?: string;
  form_type: "contact" | "assessment" | "incident" | string;
  customer_type?: "b2b" | "b2c" | string;
  request_type?: string;
  project_type?: string;
  service?: string;
  region?: string;
  cta_location?: string;
  source_site?: string;
  landing_page?: string;
}

/**
 * Primary conversion event: generate_lead
 * Triggered ONLY after successful server-side form submission response.
 */
export function trackLeadGenerated(params: LeadGeneratedParams) {
  const landing = typeof window !== "undefined" ? window.location.pathname : "";
  trackEvent("generate_lead", {
    lead_source: params.lead_source || "website_form",
    form_type: params.form_type,
    customer_type: params.customer_type || "b2b",
    request_type: params.request_type || "general",
    project_type: params.project_type || "",
    service: params.service || "",
    region: params.region || "HU",
    cta_location: params.cta_location || "page_form",
    source_site: params.source_site || "sironic.eu",
    landing_page: params.landing_page || landing,
  });
}

// ─── CUSTOM EVENTS ────────────────────────────────────────────────────────────

/** Track first user interaction with any form */
export function trackFormStart(formType: string, ctaLocation?: string) {
  trackEvent("form_start", { form_type: formType, cta_location: ctaLocation || "page" });
}

/** Track multi-step form progress */
export function trackFormStepComplete(params: {
  form_type: string;
  step_name: string;
  step_number: number;
}) {
  trackEvent("form_step_complete", {
    form_type: params.form_type,
    step_name: params.step_name,
    step_number: params.step_number,
  });
}

/** Track validation or server API errors */
export function trackFormError(formType: string, errorType: string) {
  trackEvent("form_error", { form_type: formType, error_type: errorType });
}

/** Track phone link click */
export function trackPhoneClick(params: {
  cta_location: string;
  page_type: string;
  service?: string;
  request_type?: string;
}) {
  trackEvent("phone_click", {
    cta_location: params.cta_location,
    page_type: params.page_type,
    service: params.service || "",
    request_type: params.request_type || "",
  });
}

/** Track mailto link click */
export function trackEmailClick(params: { cta_location: string; page_type: string }) {
  trackEvent("email_click", {
    cta_location: params.cta_location,
    page_type: params.page_type,
  });
}

/** Track business CTA click */
export function trackCtaClick(
  label: string,
  destination?: string,
  ctaLocation?: string,
  ctaType?: string,
  pageType?: string
) {
  trackEvent("cta_click", {
    cta_label: label,
    destination: destination || "",
    cta_location: ctaLocation || "page_body",
    cta_type: ctaType || "button",
    page_type: pageType || "landing",
  });
}

/** Track request type selection (új / bővítés / üzemeltetés / hiba) */
export function trackRequestTypeSelect(requestType: string) {
  trackEvent("request_type_select", { request_type: requestType });
}

/** Track customer type selection (B2B / B2C) */
export function trackCustomerTypeSelect(customerType: string) {
  trackEvent("customer_type_select", { customer_type: customerType });
}

/** Track service selection */
export function trackServiceSelect(service: string) {
  trackEvent("service_select", { service });
}

/** Track outbound links to other SIROTECH brand websites */
export function trackOutboundDivisionClick(params: {
  destination_brand: string;
  context: string;
  cta_location: string;
}) {
  trackEvent("outbound_division_click", {
    destination_brand: params.destination_brand,
    context: params.context,
    cta_location: params.cta_location,
  });
}

// ─── BACKWARDS COMPATIBILITY HELPERS ─────────────────────────────────────────

export function trackPageView(url: string, title?: string) {
  trackEvent("page_view", { page_location: url, page_title: title ?? "" });
}

export function trackOutboundLink(url: string, label?: string) {
  trackEvent("click", {
    link_url: url,
    link_text: label ?? url,
    outbound: true,
  });
}

export function trackAssessmentStart() {
  trackFormStart("assessment");
}

export function trackFormStep(stepNumber: number, stepTitle: string) {
  trackFormStepComplete({
    form_type: "assessment",
    step_name: stepTitle,
    step_number: stepNumber,
  });
}

export function trackAssessmentResult(priceLow: number, priceHigh: number) {
  trackEvent("assessment_result_view", { price_low: priceLow, price_high: priceHigh });
}

export function trackAssessmentDecision(decision: "accepted" | "declined", priceFinal: number) {
  trackEvent("assessment_decision", { decision, price_final: priceFinal });
}

export function trackFormSubmit(formType: "assessment" | "contact" | "incident") {
  trackEvent("form_submit", { form_type: formType });
}

export function trackTabSwitch(tab: string) {
  trackEvent("smart_form_tab_switch", { tab_selected: tab });
}

export function trackContactFormStart() {
  trackFormStart("contact");
}

export function trackContactFormSubmit() {
  trackEvent("form_submit", { form_type: "contact" });
}

export function trackIncidentFormSubmit() {
  trackEvent("form_submit", { form_type: "incident" });
}

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
