/**
 * Portfolio projekti.
 *
 * PRAVILO: `results` se popunjava SAMO kada brojku možemo da potkrepimo
 * (Search Console, Analytics, izveštaj iz Ads-a). Projekat bez brojke je
 * potpuno u redu — izmišljena brojka nije.
 *
 * `ownership` razdvaja sopstvene projekte od klijentskih, jer se drugačije
 * predstavljaju. Većina je "own" — sajtovi koje Milan vodi kao svoje.
 * Klijentski su slepsluzbarapaic.rs, rapaicprevoz.rs i sasaavakumovic.com
 * (potvrdio Milan).
 */

export type Project = {
  slug: string;
  name: string;
  /** Kratak opis — jedna rečenica */
  summary: string;
  /** Delatnost */
  industry: string;
  /** Sopstveni projekat ili rad za klijenta */
  ownership: "own" | "client";
  /** Usluge koje su rađene na projektu */
  services: string[];
  /** Tehnologije / platforma */
  stack: string[];
  /** Merljivi rezultati — izostavi ako brojka nije proverljiva */
  results?: { value: string; label: string }[];
  year: string;
  url?: string;
  image?: string;
  /** Boje gradijenta ako nema slike */
  accent: [string, string];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sasa-avakumovic",
    name: "Saša Avakumović",
    summary:
      "Sajt za prodaju digitalnih proizvoda — dizajn, tekstovi i povezivanje sa platnim procesorom Raiffeisen banke, tako da kupac plati karticom i odmah dobije proizvod.",
    industry: "Digitalni proizvodi",
    ownership: "client",
    services: [
      "Izrada web sajta",
      "Dizajn",
      "SEO optimizacija",
      "Kartično plaćanje",
    ],
    stack: [
      "WordPress",
      "WooCommerce",
      "Elementor Pro",
      "Raiffeisen payment gateway",
    ],
    year: "2025",
    url: "https://sasaavakumovic.com/",
    image: "/sasa-avakumovic.webp",
    accent: ["#6366f1", "#06b6d4"],
    featured: true,
  },
  {
    slug: "slep-sluzba-rapaic",
    name: "Šlep služba Rapaić",
    summary:
      "Šlepanje u Beogradu i po Srbiji, 24 sata dnevno. Sajt je napravljen oko jednog poteza — da čovek u kvaru sa telefona pozove u jednom kliku.",
    industry: "Auto usluge",
    ownership: "client",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Elementor Pro"],
    year: "2024",
    url: "https://slepsluzbarapaic.rs",
    image: "/slep-sluzba-rapaic.webp",
    accent: ["#0ea5e9", "#6366f1"],
  },
  {
    slug: "mini-bager-iskop",
    name: "Mini Bager Iskop Beograd",
    summary:
      "Iskopi mini bagerom — sajt sa jasno razdvojenim vrstama radova i optimizacijom za pretrage tipa „mini bager Beograd cena“.",
    industry: "Građevinarstvo",
    ownership: "client",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Elementor Pro"],
    year: "2024",
    url: "https://minibageriskop.rs",
    image: "/mini-bager-iskop.webp",
    accent: ["#f97316", "#eab308"],
    featured: true,
  },
  {
    slug: "rapaic-prevoz",
    name: "Selidbe i kombi prevoz Rapaić",
    summary:
      "Selidbe u Beogradu i kombi prevoz — sajt sa cenovnikom i formom za brzu procenu, jer kupac prvo pita koliko košta.",
    industry: "Transport i selidbe",
    ownership: "client",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Elementor Pro"],
    year: "2024",
    url: "https://rapaicprevoz.rs",
    image: "/rapaic-prevoz.webp",
    accent: ["#14b8a6", "#0ea5e9"],
  },
  {
    slug: "zdrav-ritual",
    name: "Zdrav Ritual",
    summary:
      "Sadržajni sajt o prirodnom zdravlju, napravljen AI vibe kodiranjem umesto na CMS-u — statički Next.js sajt bez baze, bez dodataka i bez mesečnog održavanja platforme.",
    industry: "Zdravlje i ishrana",
    ownership: "own",
    services: [
      "Sajt za jedan dan",
      "AI vibe kodiranje",
      "Blog strategija",
      "SEO optimizacija",
    ],
    stack: ["Next.js", "AI vibe kodiranje", "GitHub Pages"],
    year: "2025",
    url: "https://zdravritual.com",
    image: "/zdrav-ritual-hero.webp",
    accent: ["#10b981", "#84cc16"],
    featured: true,
  },
  {
    slug: "beograd-shop",
    name: "Beograd Shop",
    summary:
      "Prodavnica prirodnih proizvoda iz Phytoremedy programa — katalog, korpa i naplata, uz optimizovane stranice proizvoda.",
    industry: "E-commerce",
    ownership: "own",
    services: ["Izrada web prodavnice", "SEO optimizacija"],
    stack: ["WordPress", "WooCommerce"],
    year: "2024",
    url: "https://beogradshop.com",
    image: "/beograd-shop.webp",
    accent: ["#22c55e", "#84cc16"],
  },
  {
    slug: "esuplementi",
    name: "eSuplementi",
    summary:
      "Web prodavnica za Phytoremedy proizvode — širok katalog suplemenata sa strukturom kategorija koja se lako širi kako se dodaju novi artikli.",
    industry: "E-commerce",
    ownership: "own",
    services: ["Izrada web prodavnice", "SEO optimizacija"],
    stack: ["WordPress", "WooCommerce"],
    year: "2024",
    url: "https://esuplementi.com",
    image: "/esuplementi.webp",
    accent: ["#ef4444", "#f97316"],
    featured: true,
  },
  {
    slug: "kombi-prevoz-cena",
    name: "Kombi prevoz putnika Niš",
    summary:
      "Prevoz putnika iz Niša — sajt ciljan na drugi grad, sa sadržajem pisanim za lokalne pretrage van Beograda.",
    industry: "Transport",
    ownership: "client",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Elementor Pro"],
    year: "2023",
    url: "https://kombiprevozcena.com",
    image: "/kombi-prevoz-cena.webp",
    accent: ["#8b5cf6", "#6366f1"],
    featured: true,
  },
  {
    slug: "internet-oglasi",
    name: "Internet Oglasi",
    summary:
      "Oglasnik sa korisničkim nalozima i objavom oglasa — drugačiji tip posla od prezentacionih sajtova, sa logikom koju korisnici sami koriste.",
    industry: "Portal / oglasnik",
    ownership: "own",
    services: ["Izrada web sajta", "Korisnički nalozi", "SEO optimizacija"],
    stack: ["WordPress"],
    year: "2023",
    url: "https://internet-oglasi.com",
    image: "/internet-oglasi.webp",
    accent: ["#0f172a", "#334155"],
    featured: true,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
