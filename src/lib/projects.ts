/**
 * Portfolio projekti.
 *
 * PRAVILO: `results` se popunjava SAMO kada brojku možemo da potkrepimo
 * (Search Console, Analytics, izveštaj iz Ads-a). Projekat bez brojke je
 * potpuno u redu — izmišljena brojka nije.
 *
 * TODO(Milan): za svaki projekat potvrdi `summary`, `services` i `stack`.
 * Opisi ispod su napisani na osnovu naziva projekta i treba ih uskladiti sa
 * onim što je zaista rađeno.
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
      "Sajt za prodaju digitalnih proizvoda — dizajn, tekstovi, tehnički SEO i povezivanje sa platnim procesorom Raiffeisen banke, tako da kupac plati karticom i odmah dobije proizvod.",
    industry: "Digitalni proizvodi",
    services: [
      "Izrada web sajta",
      "SEO optimizacija",
      "Dizajn",
      "Integracija kartičnog plaćanja",
    ],
    stack: ["WordPress", "Elementor Pro", "Raiffeisen payment gateway"],
    year: "2025", // TODO(Milan): potvrdi godinu
    url: "https://sasaavakumovic.com/",
    accent: ["#6366f1", "#06b6d4"],
    featured: true,
  },
  {
    slug: "beograd-shop",
    name: "Beograd Shop",
    summary:
      "Web prodavnica sa širokim katalogom — postavka proizvoda, korpe i naplate, uz optimizaciju stranica proizvoda za pretragu.",
    industry: "E-commerce",
    services: ["Izrada web prodavnice", "SEO optimizacija"],
    stack: ["WordPress", "WooCommerce", "Elementor Pro"],
    year: "2025",
    accent: ["#0ea5e9", "#6366f1"],
    featured: true,
  },
  {
    slug: "zdrav-ritual",
    name: "Zdrav Ritual",
    summary:
      "Brend zdrave ishrane — prodavnica, vizuelni identitet na sajtu i priprema kataloga za oglašavanje na Facebook-u i Instagram-u.",
    industry: "Zdrava ishrana",
    services: [
      "Izrada web prodavnice",
      "Facebook i Instagram Ads",
      "Email marketing",
    ],
    stack: ["WordPress", "WooCommerce"],
    year: "2025",
    accent: ["#22c55e", "#84cc16"],
    featured: true,
  },
  {
    slug: "zdravlje-iz-semena",
    name: "Zdravlje iz Semena",
    summary:
      "Sajt sa blogom kao glavnim kanalom dolaska posetilaca — struktura sadržaja, plan tema i optimizacija tekstova za pretragu.",
    industry: "Prirodni proizvodi",
    services: ["Izrada web sajta", "SEO optimizacija", "Blog strategija"],
    stack: ["WordPress", "Elementor Pro"],
    year: "2024",
    accent: ["#f59e0b", "#ef4444"],
  },
  {
    slug: "mini-bager-iskop",
    name: "Mini Bager Iskop",
    summary:
      "Sajt za građevinske radove sa naglaskom na lokalnu pretragu — kupac traži majstora u svom kraju i mora da te nađe i pozove u dva klika.",
    industry: "Građevinarstvo",
    services: ["Izrada web sajta", "Lokalni SEO", "Google Ads"],
    stack: ["WordPress", "Elementor Pro"],
    year: "2024",
    accent: ["#f97316", "#eab308"],
  },
  {
    slug: "slep-sluzba",
    name: "Šlep služba",
    summary:
      "Sajt za hitne intervencije 24/7 — jednostavna struktura, poziv u jednom kliku sa telefona i prisutnost u lokalnim pretragama.",
    industry: "Auto usluge",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Elementor Pro"],
    year: "2024",
    accent: ["#64748b", "#0ea5e9"],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
