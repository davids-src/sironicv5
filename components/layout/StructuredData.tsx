export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SIRONIC – IT Üzemeltetés és Rendszerintegráció",
    url: "https://sironic.eu",
    logo: "https://sironic.eu/logo.png",
    telephone: "+36-70-273-5532",
    email: "hello@sironic.hu",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lövölde utca 24 4/15",
      addressLocality: "Székesfehérvár",
      addressRegion: "Fejér megye",
      postalCode: "8000",
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "47.1883",
      longitude: "18.4133",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Székesfehérvár" },
      { "@type": "AdministrativeArea", name: "Fejér megye" },
      { "@type": "Country", name: "Magyarország" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+36-70-273-5532",
      contactType: "customer service",
      areaServed: "HU",
      availableLanguage: ["Hungarian", "English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Szolgáltatások & Állapotfelmérés",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ingyenes Informatikai Állapotfelmérés",
            description: "Díjmentes és kötelezettségmentes IT audit, hardver-szoftver leltár, hálózati és NIS2 hiányelemzés.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT Üzemeltetés & Rendszergazda Szolgáltatás",
            description: "Teljes körű kiszervezett IT üzemeltetés és rendszerfelügyelet KKV-knak.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
