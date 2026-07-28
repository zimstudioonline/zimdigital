/**
 * Centralna konfiguracija sajta.
 *
 * TODO(Milan): zameni vrednosti označene sa `PLACEHOLDER` stvarnim podacima.
 * Sve ostalo na sajtu (header, footer, kontakt, schema.org, sitemap) čita odavde.
 */

export const site = {
  name: "ZIM Digital",
  legalName: "ZIM Digital",
  // Koristi se za apsolutne URL-ove (OG slike, sitemap, canonical).
  url: "https://zimdigital.rs",
  tagline: "Digitalna agencija koja povećava prodaju, a ne samo broj poseta.",
  description:
    "Digitalna agencija iz Srbije: SEO optimizacija, izrada sajtova i web prodavnica, Google Ads, Facebook i Instagram oglašavanje i AI automatizacija. Fokus na merljive rezultate.",
  locale: "sr_RS",
  founded: "2018", // PLACEHOLDER

  contact: {
    email: "info@zimdigital.rs", // PLACEHOLDER
    phone: "+381 63 342 380",
    // E.164 format bez razmaka i plusa — za wa.me i viber linkove
    phoneRaw: "38163342380",
    whatsapp: "38163342380",
    address: {
      street: "Ulica i broj", // PLACEHOLDER
      city: "Beograd", // PLACEHOLDER
      postalCode: "11000", // PLACEHOLDER
      country: "Srbija",
      countryCode: "RS",
    },
    // Embed URL Google mape — zameni svojim (Google Maps → Share → Embed a map)
    mapEmbedUrl:
      "https://www.google.com/maps?q=Beograd,Srbija&output=embed", // PLACEHOLDER
    workingHours: "Ponedeljak – Petak, 09:00 – 17:00",
  },

  social: {
    facebook: "https://facebook.com/", // PLACEHOLDER
    instagram: "https://instagram.com/", // PLACEHOLDER
    linkedin: "https://linkedin.com/", // PLACEHOLDER
  },

  /** Brojke koje se prikazuju na početnoj. PLACEHOLDER — uskladi sa stvarnim. */
  stats: [
    { value: "120+", label: "izrađenih sajtova" },
    { value: "7", label: "godina iskustva u SEO-u" },
    { value: "3.4×", label: "prosečan rast organskog saobraćaja" },
    { value: "14", label: "dana do lansiranja sajta" },
  ],
} as const;

/** Gradovi/regioni za lokalni SEO — koristi se u schema.org i tekstovima. */
export const serviceAreas = [
  "Beograd",
  "Novi Sad",
  "Niš",
  "Kragujevac",
  "Cela Srbija",
]; // PLACEHOLDER
