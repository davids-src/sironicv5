"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalyticsTracker({ gaId }: { gaId: string }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sironic_cookie_consent");
    if (consent === "accepted") {
      setHasConsent(true);
    }
  }, []);

  if (!hasConsent) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
