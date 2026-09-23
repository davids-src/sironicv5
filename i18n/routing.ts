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
    "/aszf": {
      hu: "/aszf",
      en: "/terms",
    },
    "/adatkezeles": {
      hu: "/adatkezeles",
      en: "/privacy",
    },
    "/ingyenes-felmeres": {
      hu: "/ingyenes-felmeres",
      en: "/free-assessment",
    },
    "/blog": {
      hu: "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      hu: "/blog/[slug]",
      en: "/blog/[slug]",
    },
    "/partneri-egyuttmukodes": {
      hu: "/partneri-egyuttmukodes",
      en: "/partnership",
    },
    "/megoldasok": {
      hu: "/megoldasok",
      en: "/solutions",
    },
    "/megoldasok/uj-iroda-it": {
      hu: "/megoldasok/uj-iroda-it",
      en: "/solutions/new-office-it",
    },
    "/megoldasok/uj-telephely-it": {
      hu: "/megoldasok/uj-telephely-it",
      en: "/solutions/new-site-it",
    },
    "/megoldasok/halozatbovites": {
      hu: "/megoldasok/halozatbovites",
      en: "/solutions/network-expansion",
    },
    "/megoldasok/irodakoltozes": {
      hu: "/megoldasok/irodakoltozes",
      en: "/solutions/office-relocation",
    },
    "/megoldasok/it-modernizacio": {
      hu: "/megoldasok/it-modernizacio",
      en: "/solutions/it-modernization",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
