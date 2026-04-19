export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SIRONIC",
    "url": "https://sironic.eu",
    "logo": "https://sironic.eu/sironic_logo.png",
    "sameAs": [
        // Optional social links can be placed here
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+36-70-273-5532", // Update with real phone number
      "contactType": "customer service"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
