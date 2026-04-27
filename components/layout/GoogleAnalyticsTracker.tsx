"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { setupScrollTracking } from "@/lib/analytics";

export default function GoogleAnalyticsTracker({ gaId }: { gaId: string }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check existing consent on mount
    const existing = localStorage.getItem("sironic_cookie_consent");
    if (existing === "accepted") {
      setHasConsent(true);
    }

    // Listen for consent granted dynamically (no page reload needed)
    const handleConsent = (e: CustomEvent) => {
      if (e.detail === "accepted") setHasConsent(true);
    };
    window.addEventListener("sironic_consent" as any, handleConsent);
    return () => window.removeEventListener("sironic_consent" as any, handleConsent);
  }, []);

  // Set up scroll depth tracking once GA is active
  useEffect(() => {
    if (!hasConsent) return;
    const cleanup = setupScrollTracking();
    return cleanup;
  }, [hasConsent]);

  if (!hasConsent || !gaId || gaId === "G-PLACEHOLDER") return null;

  return <GoogleAnalytics gaId={gaId} />;
}

