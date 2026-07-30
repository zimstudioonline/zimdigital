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
  // Ide u <title> — zato nosi ključne reči, a ne slogan.
  tagline: "Izrada sajtova, SEO i digitalni marketing",
  // Rečenica kojom se predstavljamo u tekstu, ne u naslovu.
  claim: "Sajtove pravimo nas dvoje, od prve skice do prvog kupca.",
  description:
    "Zvezdana i Milan: izrada sajtova i web prodavnica, SEO optimizacija, Google i Meta oglašavanje, AI automatizacija. Deset godina iskustva i preko 100 izrađenih sajtova.",
  locale: "sr_RS",
  founded: "2016", // Digitalom se Milan bavio i ranije; 2016. je počeo profilisano.

  /**
   * Prekidač za indeksiranje. Dok je `false`, sajt šalje noindex i robots.txt
   * zabranjuje sve — da Google ne pokupi placeholder podatke iz portfolija.
   *
   * Kada sadržaj bude tačan: prebaci na `true`, `npm run deploy`, pa prijavi
   * sitemap u Google Search Console.
   */
  indexable: false,

  /**
   * Google Tag Manager. Skripta se učitava tek kada posetilac prihvati
   * kolačiće — vidi src/components/analytics.tsx.
   *
   * GA4 (G-133J4BNK6K) je tag unutar ovog kontejnera, ne zasebna skripta.
   * Ne dodaji ovde gtag.js — merenje bi išlo dvaput.
   */
  gtmId: "GTM-TRJJ3S4V",

  contact: {
    email: "zimstudioonline@gmail.com",
    phone: "+381 63 342 380",
    // E.164 format bez razmaka i plusa — za wa.me i viber linkove
    phoneRaw: "38163342380",
    whatsapp: "38163342380",
    address: {
      street: "Braće Deroko 8",
      city: "Beograd",
      postalCode: "11000",
      country: "Srbija",
      countryCode: "RS",
    },
    // Mapa se centrira na adresu iznad. Ako želiš precizniji pin (npr. ulaz u
    // zgradu), uzmi embed link sa Google Maps → Share → Embed a map i zameni ovaj.
    mapEmbedUrl:
      "https://www.google.com/maps?q=Bra%C4%87e%20Deroko%208,%20Beograd,%20Srbija&output=embed",
    workingHours: "Ponedeljak – Petak, 09:00 – 17:00",
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61569676847167",
    instagram: "", // TODO(Milan): dodaj link ili ostavi prazno da se ikonica ne prikaže
    linkedin: "", // TODO(Milan): dodaj link ili ostavi prazno
  },

  /**
   * Brojke na početnoj. Svaka mora biti proverljiva — ovo je prvo što
   * klijent pomene na sastanku.
   */
  stats: [
    { value: "10", label: "godina rada u digitalu" },
    { value: "100+", label: "izrađenih sajtova" },
    { value: "2", label: "osobe koje rade tvoj projekat" },
    { value: "2–4", label: "nedelje do lansiranja" },
  ],
} as const;

/**
 * Ko stoji iza sajta. ZIM = **Z**vezdana **i** **M**ilan.
 * Koristi se na početnoj, na /o-nama i u schema.org kao `founder`.
 */
export const team = [
  {
    slug: "milan",
    name: "Milan Stanić",
    role: "Sajtovi, SEO i oglašavanje",
    /** Putanja do fotografije u /public. Dok je prazno, prikazuju se inicijali. */
    photo: "/milan-stanic.webp",
    initials: "MS",
    bio: "Digitalom se bavim deset godina. Prošao sam kroz preko sto sajtova — od blogova i prezentacija za male preduzetnike do prodavnica digitalnih proizvoda sa povezanim platnim procesorom. Radim ceo lanac: dizajn u Elementoru i Bricks-u, tehnički SEO, kampanje i integracije koje treba da rade i kada niko ne gleda.",
    accent: ["#6366f1", "#06b6d4"] as [string, string],
  },
  {
    slug: "zvezdana",
    name: "Zvezdana Dunić",
    role: "Sadržaj, komunikacija i projekti",
    photo: "/zvezdana-dunic.webp",
    initials: "ZD",
    bio: "Priključila sam se kasnije i preuzela ono što se najčešće zapostavi — da tekst na sajtu govori jezikom kupca, da projekat ne stoji i da klijent zna šta se dešava. Sa mnom komuniciraš kada ti treba odgovor, a ne kada nekome dođe na red.",
    accent: ["#8b5cf6", "#ec4899"] as [string, string],
  },
];

/** Gradovi/regioni za lokalni SEO — koristi se u schema.org i tekstovima. */
export const serviceAreas = [
  "Beograd",
  "Novi Sad",
  "Niš",
  "Kragujevac",
  "Cela Srbija",
]; // PLACEHOLDER
