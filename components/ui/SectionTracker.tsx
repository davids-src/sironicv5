"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface SectionTrackerProps {
  id: string;
  page: string;
  children: React.ReactNode;
}

export default function SectionTracker({ id, page, children }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (hasTracked || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent("section_view", { section: id, page });
          setHasTracked(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Track when at least 20% of the section is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [id, page, hasTracked]);

  return <div ref={ref} style={{ display: "contents" }}>{children}</div>;
}
