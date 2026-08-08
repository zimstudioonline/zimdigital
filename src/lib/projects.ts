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
  /**
   * Sadržaj case study stranice `/portfolio/<slug>`. Opisuje zadatak i
   * rešenje — brojke idu isključivo u `results`, po pravilu iznad.
   * Projekat bez `caseStudy` se prikazuje samo kao kartica u listi.
   */
  caseStudy?: {
    /** Sa čime se krenulo i šta je trebalo rešiti */
    challenge: string;
    /** Šta smo konkretno uradili */
    approach: { title: string; body: string }[];
    /** Šta je merilo uspeha za klijenta */
    goal: string;
  };
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
    caseStudy: {
      challenge:
        "Prodaja digitalnih proizvoda traži da se ceo lanac zatvori bez ljudske intervencije: kupac plati karticom i istog trenutka dobije proizvod. Svako ručno slanje posle uplate je mesto na kom se gubi vreme i poverenje.",
      approach: [
        {
          title: "Sajt i tekstovi oko jedne odluke",
          body: "Struktura i copy vođeni su ka kupovini — svaka stranica postoji da odgovori na pitanje koje kupca deli od odluke.",
        },
        {
          title: "WooCommerce za digitalne proizvode",
          body: "Katalog, korpa i automatska isporuka fajla nakon uspešne uplate, bez međukoraka.",
        },
        {
          title: "Integracija sa platnim procesorom Raiffeisen banke",
          body: "Domaći kartični gateway povezan sa prodavnicom i testiran do kraja, uključujući odustale i neuspele transakcije.",
        },
        {
          title: "SEO temelj",
          body: "Naslovi, meta opisi i struktura stranica postavljeni pre lansiranja, da sajt ne kreće od nule kada Google naiđe.",
        },
      ],
      goal: "Kupovina koja se završi sama — od klika na proizvod do isporuke, bez poruke „poslaću vam u toku dana“.",
    },
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
    caseStudy: {
      challenge:
        "Čovek kome je vozilo stalo ne čita sajt. Ima jedan cilj — da nekoga pozove, odmah, sa telefona, često po mraku i po kiši. Sve što stoji između njega i broja telefona je smetnja.",
      approach: [
        {
          title: "Sajt napravljen oko jednog poteza",
          body: "Broj telefona i dugme za poziv stoje na vrhu svake stranice i vide se bez skrolovanja.",
        },
        {
          title: "Sadržaj po vrstama intervencije",
          body: "Šlepanje, prevoz vozila i pomoć na putu razdvojeni su kao zasebne teme, jer se tako i pretražuju.",
        },
        {
          title: "Lokalni SEO",
          body: "Optimizacija za pretrage vezane za Beograd i okolinu, uz usklađene podatke o firmi na sajtu i van njega.",
        },
        {
          title: "Dostupnost 24 sata jasno naznačena",
          body: "U ovoj delatnosti je to najjači argument, pa je istaknut svuda gde ga čovek gleda.",
        },
      ],
      goal: "Poziv sa mobilnog telefona u što manje klikova, u trenutku kada je čoveku najhitnije.",
    },
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
    caseStudy: {
      challenge:
        "Iskop mini bagerom nije jedna usluga nego desetak različitih poslova — temelji, bazeni, kanalizacija, rušenje. Kupac pretražuje tačno onaj koji mu treba, a sajt koji sve trpa na jednu stranicu ne rangira se ni za jedan.",
      approach: [
        {
          title: "Zasebna stranica po vrsti radova",
          body: "Svaki tip iskopa dobio je svoju stranicu sa opisom, primerima i pozivom na akciju.",
        },
        {
          title: "Sadržaj pisan prema stvarnim pretragama",
          body: "Tekstovi su građeni oko fraza tipa „mini bager Beograd cena“, onako kako ljudi zaista kucaju.",
        },
        {
          title: "Fotografije sa terena",
          body: "Stvarni radovi umesto stock slika — u građevini je to jedini dokaz koji nešto znači.",
        },
        {
          title: "Lokalni SEO",
          body: "Optimizacija za Beograd i okolinu, uz doslednost podataka o firmi.",
        },
      ],
      goal: "Upiti od ljudi koji već znaju koji im posao treba — dakle upiti koji se češće završe poslom.",
    },
    name: "Mini Bager Iskop Beograd",
    summary:
      "Iskopi mini bagerom — sajt sa jasno razdvojenim vrstama radova i optimizacijom za pretrage tipa „mini bager Beograd cena“.",
    industry: "Građevinarstvo",
    ownership: "client",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Bricks Builder"],
    year: "2024",
    url: "https://minibageriskop.rs",
    image: "/mini-bager-iskop.webp",
    accent: ["#f97316", "#eab308"],
    featured: true,
  },
  {
    slug: "rapaic-prevoz",
    caseStudy: {
      challenge:
        "Kod selidbi kupac prvo pita koliko košta, a tek onda sve ostalo. Sajt koji taj odgovor krije iza forme gubi čoveka koji je već otvorio tri konkurentska sajta.",
      approach: [
        {
          title: "Cenovnik odmah vidljiv",
          body: "Cene i ono što na njih utiče izneti su otvoreno, umesto da se kriju iza „kontaktirajte nas“.",
        },
        {
          title: "Forma za brzu procenu",
          body: "Kratka forma sa podacima koji su stvarno potrebni za procenu — ne duži upitnik nego što posao traži.",
        },
        {
          title: "Razdvojene usluge",
          body: "Selidbe i kombi prevoz su odvojeni, jer ih traže različiti ljudi u različitim trenucima.",
        },
        {
          title: "Lokalni SEO",
          body: "Optimizacija za beogradske pretrage i usklađeni podaci o firmi.",
        },
      ],
      goal: "Manje telefonskih poziva tipa „koliko košta“, više upita sa podacima dovoljnim za ponudu.",
    },
    name: "Selidbe i kombi prevoz Rapaić",
    summary:
      "Selidbe u Beogradu i kombi prevoz — sajt sa cenovnikom i formom za brzu procenu, jer kupac prvo pita koliko košta.",
    industry: "Transport i selidbe",
    ownership: "client",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Blocksy"],
    year: "2024",
    url: "https://rapaicprevoz.rs",
    image: "/rapaic-prevoz.webp",
    accent: ["#14b8a6", "#0ea5e9"],
  },
  {
    slug: "zdrav-ritual",
    caseStudy: {
      challenge:
        "Sadržajni sajt sa mnogo tekstova obično znači CMS, bazu, dodatke i mesečno održavanje platforme. Za projekat koji živi od pisanja, to je trošak i rizik koji čitaocu ne donosi ništa.",
      approach: [
        {
          title: "Statički Next.js sajt bez baze",
          body: "Sve stranice se generišu unapred — nema baze koja može pasti ni dodataka koji se moraju ažurirati.",
        },
        {
          title: "AI vibe kodiranje",
          body: "Kod i prve verzije tekstova pisani su uz AI alate, što je skratilo izradu, dok je strukturu i finalni kvalitet određivao čovek.",
        },
        {
          title: "Blog strategija",
          body: "Sadržaj planiran u temama, sa pravilom jedan tekst = jedno pitanje = jedna pretraga.",
        },
        {
          title: "SEO od početka",
          body: "Struktura, interno povezivanje i tehnički temelj postavljeni pre prvog objavljenog teksta.",
        },
      ],
      goal: "Sajt koji raste sa svakim novim tekstom, a ne poskupljuje sa svakim novim mesecom.",
    },
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
    caseStudy: {
      challenge:
        "Prodavnica prirodnih proizvoda mora da objasni šta proizvod radi pre nego što ga proda. Gola galerija artikala sa cenom u ovoj delatnosti ne prodaje.",
      approach: [
        {
          title: "WooCommerce prodavnica",
          body: "Katalog, korpa i naplata postavljeni tako da se katalog kasnije širi bez prepravki.",
        },
        {
          title: "Optimizovane stranice proizvoda",
          body: "Svaki proizvod ima sadržaj pisan za kupca i za pretragu, ne samo naziv i cenu.",
        },
        {
          title: "Struktura kategorija",
          body: "Kategorije postavljene prema tome kako kupci traže, ne prema internoj podeli programa.",
        },
      ],
      goal: "Prodavnica koju kupac razume bez dodatnog objašnjenja i koja se lako dopunjava novim artiklima.",
    },
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
    caseStudy: {
      challenge:
        "Širok katalog suplemenata brzo postane nepregledan. Ako se struktura postavi loše na početku, svako dodavanje nove grupe artikala kasnije znači prepravku celog sajta.",
      approach: [
        {
          title: "Struktura koja se širi",
          body: "Kategorije i podkategorije postavljene tako da novi artikli i grupe ulaze bez diranja postojećeg.",
        },
        {
          title: "WooCommerce katalog",
          body: "Prodavnica sa pregledom i filtriranjem prilagođenim velikom broju artikala.",
        },
        {
          title: "SEO na nivou kategorija",
          body: "Kategorije optimizovane kao ulazne tačke iz pretrage, jer se suplementi najčešće traže po grupi, a ne po nazivu artikla.",
        },
      ],
      goal: "Katalog koji može da raste godinama bez ponovne izrade sajta.",
    },
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
    caseStudy: {
      challenge:
        "Prevoz putnika iz Niša ne može se pokriti sajtom optimizovanim za Beograd. Lokalna pretraga je vezana za mesto, a ne za želju — polje „područje rada“ tu ne pomaže.",
      approach: [
        {
          title: "Sajt ciljan na drugo tržište",
          body: "Zaseban sajt za niško područje, umesto pokušaja da beogradski sajt pokrije i taj grad.",
        },
        {
          title: "Sadržaj pisan za lokalne pretrage",
          body: "Relacije, polasci i tekstovi napisani onako kako ljudi iz tog kraja pretražuju prevoz.",
        },
        {
          title: "Lokalni SEO",
          body: "Optimizacija i podaci o firmi usklađeni sa tržištem koje se cilja.",
        },
      ],
      goal: "Vidljivost u gradu u kom firma stvarno radi, bez oslanjanja na pretrage iz drugog grada.",
    },
    name: "Kombi prevoz putnika Niš",
    summary:
      "Prevoz putnika iz Niša — sajt ciljan na drugi grad, sa sadržajem pisanim za lokalne pretrage van Beograda.",
    industry: "Transport",
    ownership: "client",
    services: ["Izrada web sajta", "Lokalni SEO"],
    stack: ["WordPress", "Divi"],
    year: "2023",
    url: "https://kombiprevozcena.com",
    image: "/kombi-prevoz-cena.webp",
    accent: ["#8b5cf6", "#6366f1"],
    featured: true,
  },
  {
    slug: "internet-oglasi",
    caseStudy: {
      challenge:
        "Oglasnik nije prezentacioni sajt. Sadržaj prave korisnici, nalozi moraju biti sigurni, a stranice se množe same — i sve to mora da radi kada niko ne nadgleda.",
      approach: [
        {
          title: "Korisnički nalozi",
          body: "Registracija, prijava i upravljanje sopstvenim oglasima, sa jasnim ograničenjima šta ko sme.",
        },
        {
          title: "Objava oglasa",
          body: "Tok objave napravljen da ga završi i korisnik koji prvi put koristi sajt.",
        },
        {
          title: "SEO za sadržaj koji raste",
          body: "Struktura kategorija i stranica postavljena tako da novi oglasi ulaze u pretragu bez ručnog rada.",
        },
      ],
      goal: "Platforma koju korisnici sami pune sadržajem, uz što manje svakodnevne administracije.",
    },
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

/**
 * Veza između slobodno pisanih naziva u `services` i stranica usluga.
 * Naziv koji ovde ne postoji prikazuje se kao običan tekst, bez linka —
 * npr. „Dizajn“ ili „Kartično plaćanje“, koji nisu zasebne usluge.
 */
export const serviceSlugByLabel: Record<string, string> = {
  "Izrada web sajta": "izrada-web-sajtova",
  "Izrada web prodavnice": "izrada-web-prodavnica",
  "Sajt za jedan dan": "sajt-za-jedan-dan",
  "SEO optimizacija": "seo-optimizacija",
  "Lokalni SEO": "lokalni-seo",
};

/**
 * Projekti na kojima je rađena data usluga — prikazuju se na stranici usluge
 * kao dokaz. Veza ide preko `serviceSlugByLabel`, pa projekat bez poznatog
 * naziva usluge jednostavno ne uđe u listu.
 */
export function getProjectsByService(serviceSlug: string): Project[] {
  return projects.filter((project) =>
    project.services.some((label) => serviceSlugByLabel[label] === serviceSlug),
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Projekti koji imaju case study — samo oni dobijaju svoju stranicu. */
export function getCaseStudies(): Project[] {
  return projects.filter((project) => project.caseStudy);
}
