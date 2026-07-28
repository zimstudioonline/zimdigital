/**
 * Portfolio projekti.
 *
 * TODO(Milan): dopuni stvarnim rezultatima i linkovima; `image` je putanja
 * u /public/portfolio/ (dodaj slike, ili ostavi prazno pa se prikazuje
 * generisani gradijentni poster).
 */

export type Project = {
  slug: string;
  name: string;
  /** Kratak opis — jedna rečenica */
  summary: string;
  /** Delatnost klijenta */
  industry: string;
  /** Usluge koje su rađene na projektu */
  services: string[];
  /** Tehnologije / platforma */
  stack: string[];
  /** Merljivi rezultati — 1 do 3 stavke */
  results: { value: string; label: string }[];
  year: string;
  url?: string;
  image?: string;
  /** Boje gradijenta ako nema slike */
  accent: [string, string];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "beograd-shop",
    name: "Beograd Shop",
    summary:
      "Web prodavnica sa širokim katalogom, domaćim kartičnim plaćanjem i automatskim slanjem porudžbina kurirskoj službi.",
    industry: "E-commerce",
    services: ["Izrada web prodavnice", "SEO optimizacija", "Google Ads"],
    stack: ["WordPress", "WooCommerce", "Elementor Pro"],
    results: [
      { value: "+186%", label: "rast organskog saobraćaja" },
      { value: "2.4×", label: "više porudžbina" },
      { value: "1.4s", label: "vreme učitavanja" },
    ],
    year: "2025",
    accent: ["#6366f1", "#06b6d4"],
    featured: true,
  },
  {
    slug: "zdrav-ritual",
    name: "Zdrav Ritual",
    summary:
      "Brend zdrave hrane — prodavnica, email automatizacije i Meta kampanje za ponovljene kupovine.",
    industry: "Zdrava ishrana",
    services: [
      "Izrada web prodavnice",
      "Facebook i Instagram Ads",
      "Email marketing",
    ],
    stack: ["WordPress", "WooCommerce", "Bricks Builder"],
    results: [
      { value: "4.1×", label: "povraćaj na uloženo u oglase" },
      { value: "+38%", label: "prihod iz email kanala" },
    ],
    year: "2025",
    accent: ["#22c55e", "#84cc16"],
    featured: true,
  },
  {
    slug: "zdravlje-iz-semena",
    name: "Zdravlje iz Semena",
    summary:
      "Sadržajni sajt sa blogom kao glavnim kanalom akvizicije — plan tema, pisanje i tehnički SEO.",
    industry: "Prirodni proizvodi",
    services: ["Izrada web sajta", "SEO optimizacija", "Blog strategija"],
    stack: ["WordPress", "Bricks Builder"],
    results: [
      { value: "12k", label: "organskih poseta mesečno" },
      { value: "48", label: "ključnih reči u prvih 10" },
    ],
    year: "2024",
    accent: ["#f59e0b", "#ef4444"],
    featured: true,
  },
  {
    slug: "mini-bager-iskop",
    name: "Mini Bager Iskop",
    summary:
      "Lokalni SEO i Google Ads za građevinske radove — pozivi umesto formulara, jer klijent traži majstora odmah.",
    industry: "Građevinarstvo",
    services: ["Lokalni SEO", "Google Ads", "Izrada web sajta"],
    stack: ["WordPress", "Elementor Pro"],
    results: [
      { value: "top 3", label: "u Google mapama za ključne pretrage" },
      { value: "+64%", label: "poziva mesečno" },
    ],
    year: "2024",
    accent: ["#f97316", "#eab308"],
  },
  {
    slug: "slep-sluzba",
    name: "Šlep služba",
    summary:
      "Sajt za hitne intervencije 24/7 — jednostavna stranica, poziv u jednom kliku, prisutnost u lokalnim pretragama.",
    industry: "Auto usluge",
    services: ["Izrada web sajta", "Lokalni SEO", "Google Ads"],
    stack: ["WordPress", "Elementor Pro"],
    results: [
      { value: "0.9s", label: "učitavanje na mobilnom" },
      { value: "+91%", label: "poziva sa mobilnih uređaja" },
    ],
    year: "2024",
    accent: ["#0ea5e9", "#6366f1"],
  },
  {
    slug: "ai-chatbot-podrska",
    name: "AI podrška za web prodavnicu",
    summary:
      "Chatbot obučen na katalogu i uslovima isporuke — preuzima najčešća pitanja i prosleđuje ozbiljne upite prodaji.",
    industry: "E-commerce",
    services: ["AI automatizacija", "CRM integracija"],
    stack: ["Cloudflare Workers", "WooCommerce API"],
    results: [
      { value: "−62%", label: "manje ponavljajućih upita" },
      { value: "24/7", label: "dostupnost podrške" },
    ],
    year: "2026",
    accent: ["#8b5cf6", "#ec4899"],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
