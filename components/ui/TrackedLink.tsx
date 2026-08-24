"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  ctaLocation: string;
  ctaLabel: string;
}

export default function TrackedLink({ ctaLocation, ctaLabel, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent("cta_click", { cta_location: ctaLocation, cta_label: ctaLabel });
        if (onClick) onClick(e);
      }}
    />
  );
}
