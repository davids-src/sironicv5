import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hu", "en"],
  defaultLocale: "hu",
  pathnames: {
    "/": "/",
    "/szolgaltatasok": {
      hu: "/szolgaltatasok",
      en: "/services",
    },
    "/partnereink": {
      hu: "/partnereink",
      en: "/partners",
    },
    "/referenciak": {
      hu: "/referenciak",
      en: "/references",
    },
    "/rolunk": {
      hu: "/rolunk",
      en: "/about",
    },
    "/intelligens-urlap": {
      hu: "/intelligens-urlap",
      en: "/intelligent-form",
    },
    "/kapcsolat": {
      hu: "/kapcsolat",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
