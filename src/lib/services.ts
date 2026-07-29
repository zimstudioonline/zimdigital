import type { IconName } from "@/components/icons";
import type { CategorySlug } from "@/lib/categories";

export type Service = {
  slug: string;
  /** Pun naziv — naslov stranice */
  title: string;
  /** Kraći naziv za navigaciju i breadcrumb */
  navTitle: string;
  icon: IconName;
  /** Jedna rečenica — kartica na /usluge i u mega meniju */
  tagline: string;
  metaDescription: string;
  /** Podusluge — čipovi ispod hero sekcije */
  highlights: string[];
  /** Uvodni paragrafi na stranici usluge */
  intro: string[];
  /** Šta konkretno dobijaš */
  deliverables: { title: string; body: string }[];
  /** Kome je namenjeno */
  forWhom: string[];
  /** Kako radimo */
  process: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  /** Kategorija bloga koja se prikazuje na dnu stranice */
  blogCategory?: CategorySlug;
};

export const services: Service[] = [
  {
    slug: "sajt-za-jedan-dan",
    title: "Sajt za jedan dan",
    navTitle: "Sajt za 1 dan",
    icon: "bolt",
    tagline:
      "Prezentacioni sajt gotov i na internetu istog dana — uz AI koji ubrzava rad, ne zamenjuje ga.",
    metaDescription:
      "Izrada prezentacionog sajta za jedan dan uz AI vibe kodiranje. Brz, lagan i optimizovan sajt sa domenom, hostingom i kontakt formom — bez šablona i bez čekanja.",
    highlights: [
      "Gotovo za 24 sata",
      "AI vibe kodiranje",
      "Prezentacioni sajtovi",
      "Fiksna cena",
      "Domen i hosting",
      "Bez mesečne pretplate na platformu",
    ],
    intro: [
      "Najveći deo vremena kod izrade sajta ne odlazi na rad, nego na čekanje — na tekstove, na odobrenja, na treću rundu ispravki boje dugmeta. Ako ti treba prezentacioni sajt koji jednostavno mora da postoji, to čekanje je čist gubitak.",
      "Zato radimo drugačije: rezervišemo jedan dan, sednemo sa tobom ujutru na kratak razgovor, i uveče imaš sajt na svom domenu. AI koristimo da ubrzamo pisanje koda i prve verzije tekstova, ali svaku stranicu pregleda i dovrši čovek. Alat skraćuje sate, ne zamenjuje odluke.",
    ],
    deliverables: [
      {
        title: "Sajt do pet stranica",
        body: "Početna, o nama, usluge, kontakt i po potrebi još jedna. Dovoljno za ozbiljno prisustvo male firme ili samostalnog preduzetnika.",
      },
      {
        title: "Tekstovi napisani istog dana",
        body: "Na osnovu jutarnjeg razgovora pišemo prve verzije, ti ih pregledaš i korigujemo odmah. Ne čekamo da nam pošalješ sadržaj — to je obično razlog zašto sajtovi kasne mesecima.",
      },
      {
        title: "Brz i lagan sajt",
        body: "Bez teških builder-a i gomile dodataka. Sajt se učitava za sekundu i prolazi Core Web Vitals bez naknadne optimizacije.",
      },
      {
        title: "Kontakt forma i klik-na-poziv",
        body: "Forma sa zaštitom od spama, broj telefona i WhatsApp dugme — da poseta može odmah da postane upit.",
      },
      {
        title: "Osnovni SEO i Google prijava",
        body: "Naslovi, meta opisi, sitemap i prijava na Google Search Console, plus Google Business Profile ako ga nemaš.",
      },
      {
        title: "Domen, hosting i predaja",
        body: "Postavljanje na tvoj domen, SSL sertifikat i svi pristupi na tvoje ime. Nema zaključavanja u tuđu platformu.",
      },
    ],
    forWhom: [
      "Zanatlije i samostalni preduzetnici kojima treba sajt „da postoji“",
      "Firme koje su tek registrovane i kreću od nule",
      "Landing stranica za kampanju koja počinje sutra",
      "Svako ko je pokušao sam i odustao na pola",
    ],
    process: [
      {
        title: "Kratak razgovor ujutru",
        body: "Trideset do šezdeset minuta: šta radiš, kome prodaješ, šta posetilac treba da uradi. To je sve što nam treba.",
      },
      {
        title: "Prva verzija do podneva",
        body: "Dobijaš link i gledaš pravi sajt, ne skicu.",
      },
      {
        title: "Ispravke popodne",
        body: "Prolazimo tvoje primedbe u jednom krugu i doterujemo.",
      },
      {
        title: "Lansiranje do kraja dana",
        body: "Sajt ide na tvoj domen, prijavljujemo ga Google-u i predajemo ti pristupe.",
      },
    ],
    faq: [
      {
        q: "Šta znači „AI vibe kodiranje“?",
        a: "Da deo koda i prvih verzija teksta pišemo uz pomoć AI alata, umesto ručno od nule. To skraćuje posao od nedelju dana na jedan dan. Ono što se ne menja: strukturu, poruke i finalni kvalitet i dalje određuje čovek, i svaka stranica se pregleda pre nego što ode uživo.",
      },
      {
        q: "Da li je takav sajt lošijeg kvaliteta?",
        a: "Ne po brzini, kodu ni SEO-u — po tim stavkama je često bolji od sajtova sklepanih na gomili dodataka. Razlika je u obimu: ovo je prezentacioni sajt do pet stranica, ne prodavnica i ne sajt sa složenom logikom.",
      },
      {
        q: "Šta ako mi treba više od pet stranica ili prodavnica?",
        a: "Onda ovo nije prava usluga za tebe i reći ćemo ti to odmah. Za to idu izrada web sajtova ili izrada web prodavnica, gde je rok 2–4 nedelje.",
      },
      {
        q: "Mogu li kasnije da ga proširim?",
        a: "Da. Sajt je tvoj i nije zaključan ni u kakvu platformu, pa se nadograđuje kad zatreba.",
      },
      {
        q: "Šta treba da pripremim?",
        a: "Logo ako ga imaš, fotografije radova i podatke o firmi. Ako nemaš ništa od toga, i to rešavamo u toku dana — samo reci unapred.",
      },
    ],
    blogCategory: "ai",
  },
  {
    slug: "seo-optimizacija",
    title: "SEO optimizacija",
    navTitle: "SEO optimizacija",
    icon: "search",
    tagline:
      "Dugoročan izvor klijenata koji ne prestaje kada isključiš oglase.",
    metaDescription:
      "SEO optimizacija sajta — tehnički SEO, on-page optimizacija, blog strategija i link building. Merljiv rast organskog saobraćaja i upita iz Google pretrage.",
    highlights: [
      "SEO analiza",
      "Tehnički SEO",
      "On-page SEO",
      "Blog strategija",
      "Link building",
      "Mesečni izveštaji",
    ],
    intro: [
      "Oglasi rade samo dok plaćaš. SEO radi i dok spavaš. Zato prvu poziciju u Google pretrazi posmatramo kao imovinu koja se gradi, a ne kao trošak koji se obnavlja svakog meseca.",
      "Ne obećavamo „prvo mesto za mesec dana“. Radimo ono što zaista pomera rangiranje: rešavamo tehničke prepreke, pišemo sadržaj koji odgovara na stvarna pitanja tvojih kupaca i gradimo autoritet domena. Rezultat je stabilan priliv upita od ljudi koji već traže ono što prodaješ.",
    ],
    deliverables: [
      {
        title: "Kompletna SEO analiza",
        body: "Tehnički audit, analiza konkurencije, istraživanje ključnih reči i mapa sadržaja. Dobijaš dokument sa jasnim prioritetima — šta donosi najviše rezultata za najmanje truda.",
      },
      {
        title: "Tehnička optimizacija",
        body: "Brzina učitavanja i Core Web Vitals, indeksiranje, struktura URL-ova, interno povezivanje, structured data, sitemap i robots.txt. Sve što Google mora da razume pre nego što te uopšte rangira.",
      },
      {
        title: "On-page optimizacija",
        body: "Naslovi, meta opisi, hijerarhija naslova, optimizacija slika i tekstova prema ciljanim ključnim rečima — bez prepakivanja ključnih reči koje danas više šteti nego što koristi.",
      },
      {
        title: "Sadržaj koji rangira",
        body: "Plan blog tema baziran na stvarnim pretragama, pisanje i objavljivanje. Svaki tekst ima svrhu: da uhvati pretragu i da čitaoca odvede korak bliže upitu.",
      },
      {
        title: "Link building",
        body: "Kvalitetni backlinkovi sa relevantnih domaćih i stranih sajtova, lokalni katalozi i digitalni PR. Bez kupovanih linkova sa farmi koje donose kaznu umesto rasta.",
      },
      {
        title: "Mesečni izveštaj",
        body: "Pozicije ključnih reči, organski saobraćaj, konverzije i šta je urađeno. Na jednom mestu, na srpskom, bez marketinškog magljenja.",
      },
    ],
    forWhom: [
      "Firme koje već troše na oglase i žele kanal koji ne zavisi od budžeta",
      "Web prodavnice sa velikim brojem proizvoda i kategorija",
      "Uslužne delatnosti koje ciljaju određeni grad ili region",
      "Sajtove koji imaju posete, ali nemaju upite",
    ],
    process: [
      {
        title: "Analiza i prioriteti",
        body: "Prvo merimo gde si sada: pozicije, tehničko stanje, konkurencija. Iz toga izlazi lista prioriteta sortirana po odnosu uticaja i uloženog truda.",
      },
      {
        title: "Tehnički temelji",
        body: "Rešavamo sve što blokira rangiranje pre nego što uložimo dinar u sadržaj. Bez ovog koraka, sve ostalo je bacanje novca.",
      },
      {
        title: "Sadržaj i autoritet",
        body: "Mesečno objavljujemo tekstove po planu i paralelno gradimo backlink profil.",
      },
      {
        title: "Merenje i korekcija",
        body: "Svakog meseca gledamo šta je pomerilo iglu i pojačavamo to. Ono što ne radi — menjamo.",
      },
    ],
    faq: [
      {
        q: "Za koliko vremena se vide rezultati SEO-a?",
        a: "Prve pomake na tehničkoj strani vidiš za 2–4 nedelje. Ozbiljan rast organskog saobraćaja realno stiže između trećeg i šestog meseca, zavisno od konkurentnosti niše i stanja sajta na startu. Svako ko ti obeća prvo mesto za mesec dana ili ne zna posao ili ne govori istinu.",
      },
      {
        q: "Koliko košta SEO optimizacija?",
        a: "Zavisi od obima — jednokratna SEO analiza i mesečna saradnja nisu ista stvar. Nakon kratkog razgovora i pregleda sajta dobijaš konkretnu ponudu sa jasnim obimom posla, bez skrivenih stavki.",
      },
      {
        q: "Da li garantujete prvu poziciju na Google-u?",
        a: "Ne. Niko ozbiljan ne garantuje pozicije jer ne kontrolišemo Google-ov algoritam. Garantujemo obim posla, transparentan izveštaj i metodologiju koja je dokazano dovela do rasta na drugim projektima.",
      },
      {
        q: "Radite li SEO za sajtove koje niste vi izradili?",
        a: "Da. Radimo sa WordPress, WooCommerce, Shopify i custom sajtovima. Ako je platforma tehnički ograničavajuća, to ćemo ti reći odmah na analizi.",
      },
    ],
    blogCategory: "seo",
  },
  {
    slug: "lokalni-seo",
    title: "Lokalni SEO",
    navTitle: "Lokalni SEO",
    icon: "pin",
    tagline:
      "Da te nađu ljudi iz tvog grada, u trenutku kada im usluga zaista treba.",
    metaDescription:
      "Lokalni SEO i optimizacija Google Business Profile-a. Bolja vidljivost u mapama i lokalnim pretragama, više poziva i dolazaka u radnju.",
    highlights: [
      "Google Business Profile",
      "Optimizacija za mape",
      "Lokalne ključne reči",
      "Recenzije i reputacija",
      "NAP konzistentnost",
      "Lokalni katalozi",
    ],
    intro: [
      "Kada neko u tvom gradu ukuca „vodoinstalater blizu mene“ ili „stomatolog Novi Sad“, Google prvo prikaže mapu sa tri firme. Te tri firme dobijaju pozive. Ostali ne postoje.",
      "Lokalni SEO je najbrži i najisplativiji kanal za svaki biznis koji opslužuje određeno područje — jer kupac ne istražuje, nego već traži da kupi.",
    ],
    deliverables: [
      {
        title: "Google Business Profile od A do Š",
        body: "Kreiranje ili preuzimanje profila, verifikacija, kategorije, opis, radno vreme, usluge, proizvodi i redovne objave. Profil koji izgleda ozbiljno i konvertuje.",
      },
      {
        title: "Optimizacija za lokalni paket (mape)",
        body: "Rad na signalima koji određuju ko ulazi u prva tri rezultata na mapi: relevantnost, udaljenost i istaknutost.",
      },
      {
        title: "Lokalne landing stranice",
        body: "Zasebne, kvalitetno napisane stranice za svaki grad ili opštinu koju opslužuješ — bez kopiranog teksta sa zamenjenim imenom grada, što Google prepoznaje i kažnjava.",
      },
      {
        title: "NAP konzistentnost i katalozi",
        body: "Isto ime, adresa i telefon na svim mestima na internetu, plus prijava na relevantne domaće kataloge i imenike.",
      },
      {
        title: "Sistem za recenzije",
        body: "Postavljamo proces koji zadovoljne mušterije vodi do recenzije — QR kod, link, poruka posle posla. Recenzije su najjači lokalni signal i najjači društveni dokaz.",
      },
    ],
    forWhom: [
      "Zanatske i uslužne delatnosti (majstori, servisi, iskopi, šlep služba)",
      "Ordinacije, saloni, teretane i lokali sa fizičkom adresom",
      "Firme koje rade na terenu u više gradova",
      "Restorani i objekti koji zavise od dolazaka",
    ],
    process: [
      {
        title: "Snimak stanja",
        body: "Gde se trenutno pojavljuješ na mapi, ko su konkurenti u prva tri rezultata i zašto su tu.",
      },
      {
        title: "Profil i podaci",
        body: "Sređujemo Google Business Profile i usklađujemo podatke svuda po internetu.",
      },
      {
        title: "Sadržaj i signali",
        body: "Lokalne stranice na sajtu, objave na profilu, fotografije, katalozi.",
      },
      {
        title: "Recenzije u kontinuitetu",
        body: "Uvodimo rutinu prikupljanja recenzija i odgovaramo na njih — i na pohvale i na pritužbe.",
      },
    ],
    faq: [
      {
        q: "Nemam fizičku radnju, radim na terenu. Može li lokalni SEO?",
        a: "Može, i tu često daje najbolje rezultate. Google Business Profile podržava servisno područje bez javne adrese — postavlja se kao „service area business“.",
      },
      {
        q: "Koliko brzo lokalni SEO daje rezultate?",
        a: "Brže od klasičnog SEO-a. Kod dobro postavljenog profila prvi porast poziva se često vidi za 4–8 nedelja.",
      },
      {
        q: "Šta ako imam loše recenzije?",
        a: "Loše recenzije se ne brišu, ali se neutrališu — profesionalnim odgovorom i pritokom novih zadovoljnih mušterija. Profil sa 4.7 i 200 recenzija deluje uverljivije od profila sa čistih 5.0 i tri recenzije.",
      },
    ],
    blogCategory: "seo",
  },
  {
    slug: "google-biznis-profil",
    title: "Otvaranje i pozicioniranje Google Biznis profila",
    navTitle: "Otvaranje Biznis profila",
    icon: "store",
    tagline:
      "Da tvoja firma postoji na Google mapama, sa tačnim podacima i pravim putem do vrata.",
    metaDescription:
      "Otvaranje i podešavanje Google Biznis profila: verifikacija firme, kategorije, radno vreme, fotografije i lokacija na mapama. Da te kupci iz okoline nađu i pozovu.",
    highlights: [
      "Otvaranje profila",
      "Verifikacija firme",
      "Kategorije i usluge",
      "Radno vreme i lokacija",
      "Fotografije",
      "Uputstvo za dalje",
    ],
    intro: [
      "Kada neko traži uslugu u svom kraju, Google prvo prikaže mapu sa firmama iz okoline. Ako tvoja firma tamo ne postoji, ne postoji ni za tog kupca — bez obzira na to koliko dugo radiš i koliko si dobar.",
      "Google Biznis profil je besplatan, ali se retko postavi kako treba. Najčešće se otvori na brzinu, ostane neverifikovan ili sa pogrešnom kategorijom, pa firma stoji na mapi a niko je ne nalazi. Ovde se profil otvara, verifikuje i popuni do kraja, tako da bude spreman da radi.",
      "Ovo je jednokratan posao — postavljanje temelja. Ako posle toga hoćeš da se boriš za prva tri mesta u mapama, to je već lokalni SEO i radi se kontinuirano.",
    ],
    deliverables: [
      {
        title: "Otvoren i verifikovan profil",
        body: "Kreiranje naloga i prolazak kroz Google verifikaciju, koja je uslov da se profil uopšte prikazuje. Vlasništvo ostaje na tvom nalogu, ne našem.",
      },
      {
        title: "Tačne kategorije i usluge",
        body: "Glavna i dodatne kategorije biraju se prema tome kako ljudi zaista pretražuju. Pogrešna kategorija je najčešći razlog zašto se firma ne pojavljuje.",
      },
      {
        title: "Podaci koji se poklapaju svuda",
        body: "Naziv, adresa, telefon i radno vreme, usklađeni sa onim što piše na sajtu. Google poredi te podatke i nesklad ga koči.",
      },
      {
        title: "Fotografije i opis",
        body: "Postavljanje slika firme, prostora ili radova i pisanje opisa koji objašnjava šta radiš, jezikom kojim kupci traže.",
      },
      {
        title: "Povezivanje sa sajtom i mapom",
        body: "Link ka sajtu, dugme za poziv i tačan pin na mapi, uključujući servisno područje ako radiš na terenu a nemaš prodavnicu.",
      },
      {
        title: "Kratko uputstvo",
        body: "Šta i kako dalje sam da objavljuješ, kako da odgovaraš na recenzije i šta nikako ne treba menjati.",
      },
    ],
    forWhom: [
      "Firme koje nemaju profil na Google mapama",
      "Vlasnici prodavnica, salona i ordinacija koji zavise od kupaca iz okoline",
      "Majstori i servisi koji izlaze na teren, bez javne adrese",
      "Svako ko ima profil koji je nikad verifikovan ili stoji poluprazan",
    ],
    process: [
      {
        title: "Podaci o firmi",
        body: "Prikupljamo naziv, adresu, telefon, radno vreme i opis delatnosti — sve što Google traži.",
      },
      {
        title: "Otvaranje i verifikacija",
        body: "Kreira se profil i pokreće verifikacija. Ovaj korak zavisi od Google-a i zna da potraje nekoliko dana.",
      },
      {
        title: "Popunjavanje",
        body: "Kategorije, usluge, fotografije, opis i povezivanje sa sajtom.",
      },
      {
        title: "Predaja",
        body: "Profil ostaje na tvom nalogu, uz uputstvo za dalje vođenje.",
      },
    ],
    faq: [
      {
        q: "Koliko traje?",
        a: "Samo postavljanje je posao od jednog dana. Verifikacija zavisi od Google-a — nekada ide odmah, nekada čeka razglednicu na adresu firme, pa se ceo proces zna otegnuti na nedelju do dve. Na taj deo ne možemo da utičemo.",
      },
      {
        q: "Nemam prodavnicu, radim na terenu. Mogu li da otvorim profil?",
        a: "Možeš. Google podržava firme sa servisnim područjem, gde se prikazuje teritorija koju pokrivaš umesto adrese. To je čest slučaj kod majstora, servisa i prevoznika.",
      },
      {
        q: "Čiji je profil kada se završi?",
        a: "Tvoj. Otvara se na tvoj Google nalog i mi ostajemo samo kao pomoć dok traje posao. Nema zaključavanja i nema situacije da ti profil ostane kod nekog drugog.",
      },
      {
        q: "Je l' mi ovo dovoljno da budem prvi u mapama?",
        a: "Nije, i ne bismo to tvrdili. Ovo je uslov da uopšte konkurišeš. Borba za prva tri mesta traži recenzije, redovne objave i usklađene podatke na više mesta — to je lokalni SEO i radi se u kontinuitetu.",
      },
    ],
    blogCategory: "seo",
  },
  {
    slug: "izrada-web-sajtova",
    title: "Izrada web sajtova",
    navTitle: "Izrada web sajtova",
    icon: "layout",
    tagline:
      "Brz, lep i optimizovan sajt koji pretvara posetioce u upite — ne samo digitalna vizit karta.",
    metaDescription:
      "Izrada web sajtova u WordPress-u, Elementor Pro i Bricks Builder-u. Brz, responzivan i SEO optimizovan sajt fokusiran na konverzije.",
    highlights: [
      "WordPress",
      "Elementor Pro",
      "Bricks Builder",
      "Prezentacioni sajtovi",
      "Landing stranice",
      "Redizajn postojećeg sajta",
    ],
    intro: [
      "Većina sajtova u Srbiji izgleda pristojno i ne donosi ništa. Razlog je skoro uvek isti: napravljeni su da opišu firmu, a ne da posetioca odvedu do akcije.",
      "Mi sajt gradimo unazad — od cilja. Prvo definišemo šta posetilac treba da uradi, pa onda pravimo strukturu, tekst i dizajn koji ga tamo vode. Tehnički temelj je od prvog dana postavljen za SEO i brzinu, jer naknadno popravljanje košta više od dobrog starta.",
    ],
    deliverables: [
      {
        title: "Dizajn po meri",
        body: "Bez generičkih šablona. Moderan, čist dizajn prilagođen tvom brendu, sa pravim rasporedom sadržaja i jasnim pozivima na akciju.",
      },
      {
        title: "Brzina i Core Web Vitals",
        body: "Optimizovane slike, keširanje, minimum skripti. Brz sajt bolje rangira i bolje konvertuje — svaka sekunda učitavanja košta te konverzije.",
      },
      {
        title: "Responzivnost na svim uređajima",
        body: "Preko 70% saobraćaja u Srbiji dolazi sa telefona. Mobilna verzija nam je prva, a ne naknadna misao.",
      },
      {
        title: "SEO temelj",
        body: "Ispravna struktura naslova, meta podaci, schema markup, sitemap i čisti URL-ovi — od prvog dana.",
      },
      {
        title: "Sadržaj i tekstovi",
        body: "Pomažemo oko pisanja tekstova koji prodaju, ne samo opisuju. Uz njih idu i fotografije i grafike.",
      },
      {
        title: "Obuka i predaja",
        body: "Nakon lansiranja dobijaš kratku obuku kako da sam menjaš sadržaj, plus dokumentaciju i sve pristupe. Sajt je tvoje vlasništvo.",
      },
    ],
    forWhom: [
      "Firme bez sajta koje kreću ozbiljno",
      "Vlasnici zastarelog sajta koji ne donosi upite",
      "Biznisi kojima treba landing stranica za kampanju",
      "Firme koje žele da presele sajt kod agencije koja se javlja na telefon",
    ],
    process: [
      {
        title: "Analiza i cilj",
        body: "Ko je kupac, šta treba da uradi na sajtu i po čemu si drugačiji od konkurencije.",
      },
      {
        title: "Struktura i tekst",
        body: "Mapa stranica i tekstovi pre dizajna — dizajn služi sadržaju, ne obrnuto.",
      },
      {
        title: "Dizajn",
        body: "Vizuelni koncept početne i ključnih podstranica, uz tvoje komentare i korekcije.",
      },
      {
        title: "Izrada i testiranje",
        body: "Razvoj, provera na svim uređajima i brzinski test.",
      },
      {
        title: "Lansiranje i praćenje",
        body: "Puštanje u rad, Google Analytics i Search Console, pa praćenje kako se ponaša u prvim nedeljama.",
      },
    ],
    faq: [
      {
        q: "Koliko traje izrada sajta?",
        a: "Prezentacioni sajt srednje veličine obično 2–4 nedelje od trenutka kada imamo tekstove i materijale. Najveći uzrok kašnjenja skoro uvek je čekanje na sadržaj, zato pomažemo i sa tim.",
      },
      {
        q: "Zašto WordPress, a ne neki „builder“ tipa Wix?",
        a: "Zato što ostaješ vlasnik sajta i podataka, možeš ga preseliti kod bilo koga, imaš neuporedivo bolje SEO mogućnosti i nisi zaključan u mesečnu pretplatu platforme koja može promeniti pravila.",
      },
      {
        q: "Elementor ili Bricks Builder?",
        a: "Elementor Pro je zreliji i lakši za samostalno održavanje. Bricks daje čistiji kod i primetno bolju brzinu. Preporuka zavisi od toga koliko sam planiraš da menjaš sajt — o tome pričamo na početku.",
      },
      {
        q: "Da li dobijam sajt u vlasništvo?",
        a: "Da, u potpunosti. Domen, hosting i sve pristupe vodimo na tvoje ime.",
      },
    ],
    blogCategory: "wordpress",
  },
  {
    slug: "izrada-web-prodavnica",
    title: "Izrada web prodavnica",
    navTitle: "Izrada web prodavnica",
    icon: "cart",
    tagline:
      "WooCommerce i Shopify prodavnice napravljene oko jednog cilja — završene kupovine.",
    metaDescription:
      "Izrada online prodavnica u WooCommerce-u i Shopify-u. Domaći načini plaćanja, integracija sa kurirskim službama i optimizacija konverzija.",
    highlights: [
      "WooCommerce",
      "Shopify",
      "Domaće platne kartice",
      "Kurirske službe",
      "Optimizacija korpe",
      "Migracija prodavnice",
    ],
    intro: [
      "Prodavnica se ne pravi da bi izgledala lepo, nego da bi kupac stigao od proizvoda do potvrde porudžbine sa što manje otpora.",
      "Zato posebnu pažnju posvećujemo delovima koje većina preskoči: filterima i pretrazi, stranici proizvoda, koraku plaćanja i porukama koje kupac dobija posle porudžbine. Tu se dobija ili gubi promet.",
    ],
    deliverables: [
      {
        title: "Postavka prodavnice",
        body: "Katalog, kategorije, varijacije, zalihe, PDV, dostava i pravila cena — postavljeno tako da se lako širi kada dodaš nove proizvode.",
      },
      {
        title: "Plaćanje prilagođeno Srbiji",
        body: "Pouzeće, uplatnica, i online kartično plaćanje kroz domaće banke ili provajdere. Testirano do kraja, ne samo „uključeno“.",
      },
      {
        title: "Integracija sa kurirskim službama",
        body: "Automatsko generisanje otpremnica i praćenje pošiljki, da ne prepisuješ adrese ručno.",
      },
      {
        title: "Optimizacija konverzija",
        body: "Skraćen checkout, jasni troškovi dostave, poverenje na stranici proizvoda, oporavak napuštenih korpi.",
      },
      {
        title: "SEO za e-commerce",
        body: "Optimizovane kategorije, structured data za proizvode i cene, rešeni duplikati sadržaja kod varijacija i filtera.",
      },
      {
        title: "Priprema za oglašavanje",
        body: "Google Merchant Center feed, Meta katalog i ispravno postavljeno praćenje konverzija — da kampanje mogu da krenu odmah.",
      },
    ],
    forWhom: [
      "Prodavci koji sada rade preko Instagram poruka i žele pravu prodavnicu",
      "Postojeće prodavnice sa saobraćajem, ali slabom stopom konverzije",
      "Firme koje sele prodavnicu sa druge platforme",
      "Veleprodaje kojima treba B2B cenovnik i registracija kupaca",
    ],
    process: [
      {
        title: "Katalog i logika prodaje",
        body: "Kako su proizvodi organizovani, kako se naplaćuje dostava, kako se obrađuje porudžbina.",
      },
      {
        title: "Dizajn ključnih ekrana",
        body: "Početna, kategorija, proizvod, korpa, plaćanje. Ostalo su varijacije ovih pet.",
      },
      {
        title: "Izrada i integracije",
        body: "Platni sistemi, kuriri, računovodstvo, feedovi za oglase.",
      },
      {
        title: "Testiranje pravih porudžbina",
        body: "Prolazimo kompletan tok kupovine i mejlove koje kupac dobija, na telefonu i na računaru.",
      },
      {
        title: "Lansiranje i rast",
        body: "Puštanje u rad, praćenje ponašanja kupaca i optimizacija na osnovu podataka.",
      },
    ],
    faq: [
      {
        q: "WooCommerce ili Shopify?",
        a: "WooCommerce ako želiš punu kontrolu, bez mesečne provizije po prodaji i sa jačim SEO mogućnostima. Shopify ako želiš minimum tehničkog održavanja i brz start. Za većinu domaćih prodavnica preporučujemo WooCommerce.",
      },
      {
        q: "Kako se dodaje online plaćanje karticama?",
        a: "Preko domaće banke ili platnog provajdera. Postupak traži papirologiju sa tvoje strane, a mi vodimo tehnički deo integracije i testiranja.",
      },
      {
        q: "Imam prodavnicu sa 2000 proizvoda, možete li da je preselite?",
        a: "Da. Radimo migraciju proizvoda, kupaca i porudžbina uz čuvanje starih URL-ova preko preusmerenja, tako da ne izgubiš pozicije u Google-u.",
      },
    ],
    blogCategory: "e-commerce",
  },
  {
    slug: "izrada-logotipa",
    title: "Izrada logotipa i vizuelnog identiteta",
    navTitle: "Logo i vizuelni identitet",
    icon: "pen",
    tagline:
      "Znak koji dobro izgleda i na tabli i na favikonu od šesnaest piksela.",
    metaDescription:
      "Izrada logotipa i vizuelnog identiteta: znak, boje, tipografija, vektorski fajlovi za štampu i web, grafike za društvene mreže. Vektorizacija postojećeg logotipa.",
    highlights: [
      "Logotip",
      "Vizuelni identitet",
      "Vektorizacija postojećeg znaka",
      "Boje i tipografija",
      "Materijali za štampu",
      "Grafike za mreže",
    ],
    intro: [
      "Većina malih firmi ima logo koji je nastao jednom, u nekom programu, i od tada postoji samo kao slika u lošoj rezoluciji. Onda dođe trenutak da treba na majicu, na vozilo ili na tablu — i ispostavi se da se ne može uvećati bez da se raspadne.",
      "Logo koji radi mora da bude čitljiv i kao znak od dva centimetra i kao natpis na haubi. To se ne postiže ukrasima nego jednostavnošću, pa idemo na geometriju i jasan oblik umesto na efekte koji se za dve godine vide kao zastareli.",
    ],
    deliverables: [
      {
        title: "Znak i logotip",
        body: "Osnovna verzija, verzija za male dimenzije i verzija za tamnu pozadinu. Plus favicon za sajt i slika za profil na mrežama.",
      },
      {
        title: "Vektorski fajlovi",
        body: "SVG, PDF i EPS — ono što štamparija traži i što se uvećava do bilo koje veličine bez gubitka kvaliteta. Uz njih i PNG u više veličina za svakodnevnu upotrebu.",
      },
      {
        title: "Vektorizacija postojećeg logotipa",
        body: "Ako već imaš znak koji ti se sviđa ali postoji samo kao slika, prevešćemo ga u vektor i očistiti linije. Jeftinije je nego novi logo i zadržavaš prepoznatljivost.",
      },
      {
        title: "Boje i tipografija",
        body: "Paleta sa tačnim kodovima za web i štampu i izbor pisma. Da svaki tvoj materijal izgleda kao da pripada istoj firmi.",
      },
      {
        title: "Kratko uputstvo za upotrebu",
        body: "Nekoliko strana: šta sme, šta ne sme, koliko prostora oko znaka. Dovoljno da štampar ili neko treći ne pogreši.",
      },
      {
        title: "Primena na materijale",
        body: "Vizit karta, memorandum, nalepnica za vozilo, naslovne grafike za Facebook i Instagram — po dogovoru.",
      },
    ],
    forWhom: [
      "Firme koje kreću i nemaju nikakav znak",
      "Vlasnici logotipa koji postoji samo kao slika niske rezolucije",
      "Biznisi kojima znak izgleda zastarelo u odnosu na konkurenciju",
      "Svako kome treba isti vizuelni identitet na sajtu, mrežama i u štampi",
    ],
    process: [
      {
        title: "Razgovor",
        body: "Čime se baviš, ko su ti kupci i šta ti se sviđa kod konkurencije, a šta ne.",
      },
      {
        title: "Predlozi",
        body: "Dobijaš nekoliko različitih pravaca, ne varijacije jedne ideje.",
      },
      {
        title: "Doterivanje",
        body: "Biramo jedan pravac i radimo na njemu dok ne bude kako treba.",
      },
      {
        title: "Predaja",
        body: "Svi fajlovi, sve verzije i uputstvo — na tvoj disk, u tvoje vlasništvo.",
      },
    ],
    faq: [
      {
        q: "Imam logo, ali samo kao sliku. Može li da se prevede u vektor?",
        a: "Može, i to je čest posao. Znak se iscrtava iznova kao vektor, uz čišćenje neravnih linija. Zadržavaš prepoznatljivost, a dobijaš fajlove koje traži svaka štamparija.",
      },
      {
        q: "Koliko traje izrada logotipa?",
        a: "Obično nedelju do dve, zavisno od toga koliko brzo se dogovorimo oko pravca. Vektorizacija postojećeg znaka ide za dan-dva.",
      },
      {
        q: "Da li dobijam autorska prava?",
        a: "Da. Nakon isplate logo je tvoj, sa svim izvornim fajlovima. Ne zadržavamo nikakva prava i ne koristimo ga nigde bez tvoje saglasnosti osim u našem portfoliju, i to samo ako se složiš.",
      },
      {
        q: "Da li radite i kompletan brend, ne samo znak?",
        a: "Radimo znak, boje, tipografiju i osnovne materijale. Za obimniju strategiju brenda povezaćemo te sa nekim ko to radi kao osnovnu delatnost — bolje nego da se pravimo da je i to naše polje.",
      },
    ],
    blogCategory: "digitalni-marketing",
  },
  {
    slug: "vizuali-canva",
    title: "Vizuali za biznis putem Canve",
    navTitle: "Vizuali za biznis",
    icon: "image",
    tagline:
      "Fotografije tvojih proizvoda pretvorene u objave za sve mreže, u tvojim bojama.",
    metaDescription:
      "Izrada vizuala za društvene mreže u Canvi: objave sa fotografijama proizvoda za Instagram, Facebook i ostale mreže, u pravim formatima i u bojama tvoje firme.",
    highlights: [
      "Objave sa proizvodima",
      "Instagram i Facebook",
      "Priče i Reels naslovnice",
      "Svi formati",
      "Tvoje boje i pismo",
      "Šabloni za dalje",
    ],
    intro: [
      "Fotografija proizvoda sama po sebi retko prolazi na mrežama. Treba joj pozadina, cena, naziv i poziv da se javi — i to na način koji izgleda kao da pripada tvojoj firmi, a ne kao da je sklopljeno u žurbi.",
      "Ovde od tvojih fotografija pravimo gotove objave u Canvi. Isti proizvod dobijaš u svim formatima koji ti trebaju: kvadratno za feed, uspravno za priče i Reels naslovnice. Kada se menja cena ili ide akcija, menja se tekst na postojećem šablonu umesto da se sve radi iz početka.",
    ],
    deliverables: [
      {
        title: "Objave sa proizvodima",
        body: "Tvoje fotografije obrađene i složene u objavu — naziv, cena, kratak tekst i poziv na akciju, u bojama i pismu tvoje firme.",
      },
      {
        title: "Svi formati odjednom",
        body: "Kvadratno za feed, uspravno za priče i Reels, vodoravno gde zatreba. Jednom pripremljeno, spremno za svaku mrežu.",
      },
      {
        title: "Šabloni koje sam menjaš",
        body: "Ono što se ponavlja — nova cena, novi proizvod, akcija — dobijaš kao šablon u Canvi. Menjaš tekst i sliku sam, bez čekanja i bez dodatnog troška.",
      },
      {
        title: "Doterivanje fotografija",
        body: "Čišćenje pozadine, izjednačavanje osvetljenja i kadriranje, da katalog izgleda ujednačeno čak i kada su slike snimane u različito vreme.",
      },
    ],
    forWhom: [
      "Prodavnice sa katalogom koji se stalno menja",
      "Firme koje objavljuju na mrežama ali svaka objava izgleda drugačije",
      "Vlasnici koji imaju dobre fotografije proizvoda i ne znaju šta dalje s njima",
      "Svako kome treba više objava mesečno, a nema stalnog dizajnera",
    ],
    process: [
      {
        title: "Materijal i boje",
        body: "Šalješ fotografije proizvoda i logo. Ako nemaš definisane boje i pismo, biramo ih zajedno.",
      },
      {
        title: "Prvi set",
        body: "Radimo nekoliko objava na pregled, da se dogovorimo oko izgleda pre nego što se krene u količinu.",
      },
      {
        title: "Ostatak i formati",
        body: "Odobreni izgled primenjujemo na ceo set i izvozimo u svim potrebnim formatima.",
      },
      {
        title: "Šabloni na tvoj nalog",
        body: "Ono što ćeš sam menjati prebacujemo u tvoju Canvu, uz kratko uputstvo šta sme da se dira.",
      },
    ],
    faq: [
      {
        q: "Zašto Canva, a ne Photoshop?",
        a: "Zato što je za objave na mrežama brže i jeftinije, a rezultat je isti kada su boje i pismo jednom dobro postavljeni. Uz to dobijaš šablone koje i sam možeš da menjaš — kod klasičnog dizajnerskog fajla to nije slučaj. Za logo i materijale za štampu i dalje radimo vektorski, jer tu Canva nije dovoljna.",
      },
      {
        q: "Moram li da imam nalog na Canvi?",
        a: "Za gotove objave ne — dobijaš slike i koristiš ih. Nalog ti treba samo ako hoćeš da sam menjaš šablone, a besplatna verzija je za to najčešće dovoljna.",
      },
      {
        q: "Ja fotografišem telefonom. Je l' to dovoljno?",
        a: "Najčešće jeste, ako je svetlo pristojno. Telefoni danas snimaju sasvim dobro, a pozadinu i osvetljenje ionako doterujemo. Reći ćemo ti ako neka fotografija stvarno ne može da se spase.",
      },
      {
        q: "Da li radite i tekstove za objave?",
        a: "Kratke tekstove na samoj grafici radimo. Za opise ispod objave i vođenje profila dogovaramo se posebno — to je drugi posao i drugi obim.",
      },
    ],
    blogCategory: "digitalni-marketing",
  },
  // TODO(Milan): pregledaj tekst ove usluge pre nego što je pustimo u opticaj.
  // Napisan je po tvom opisu „video za reklame pomoću AI alata“, ali nisam znao
  // konkretne alate, rokove ni cene, pa su tvrdnje namerno držane opšte.
  {
    slug: "video-reklame-ai",
    title: "Video za reklame pomoću AI alata",
    navTitle: "Video za reklame",
    icon: "video",
    tagline:
      "Kratki video za Reels i oglase, bez snimatelja, glumaca i tri dana na terenu.",
    metaDescription:
      "Izrada kratkih video reklama pomoću AI alata: video za Instagram Reels, Facebook i TikTok oglase, animacije proizvoda i objave. Brže i jeftinije od klasičnog snimanja.",
    highlights: [
      "Video za Reels i TikTok",
      "Kreative za oglase",
      "Animacija proizvoda",
      "Više verzija za test",
      "Titlovi na srpskom",
      "Vertikalni i kvadratni format",
    ],
    intro: [
      "Na Facebook-u i Instagramu video odavno prolazi bolje od slike, a kod oglasa je razlika najveća. Problem je što klasično snimanje za malu firmu znači ekipu, opremu i dan-dva posla, pa se najčešće završi na tome da se video nikada i ne uradi.",
      "AI alati su tu promenili račun. Kratke reklame se danas sklapaju od generisanih scena, tvojih fotografija proizvoda i snimaka koje već imaš na telefonu. Ne zamenjuje to svaki snimatelj — za emotivnu priču o firmi i dalje treba kamera — ali za oglas koji treba da zaustavi palac u skrolu sasvim je dovoljno.",
      "Najveća korist nije ni cena ni brzina nego količina. Umesto jednog videa dobijaš nekoliko verzija sa različitim početkom i porukom, pa se u kampanji vidi koja stvarno radi umesto da se pogađa.",
    ],
    deliverables: [
      {
        title: "Video za oglase",
        body: "Kratke reklame od par sekundi do pola minuta, u formatu koji Facebook i Instagram traže. Vertikalno za Reels i priče, kvadratno za feed.",
      },
      {
        title: "Više verzija iste poruke",
        body: "Isti proizvod sa različitim uvodom, tekstom i završnim pozivom. To je ono što omogućava da se u kampanji testira i zadrži verzija koja donosi rezultat.",
      },
      {
        title: "Animacija proizvoda",
        body: "Od tvojih fotografija pravimo pokret — okretanje, uvećanje, prikaz detalja. Korisno kada nemaš video materijal, a proizvod treba da se vidi sa svih strana.",
      },
      {
        title: "Titlovi na srpskom",
        body: "Većina ljudi gleda bez zvuka, pa video bez titla propada. Tekst ide urađen kako treba, ne automatskim prepisom koji lomi padeže.",
      },
      {
        title: "Fajlovi u tvom vlasništvu",
        body: "Gotove snimke dobijaš na svoj disk, u punom kvalitetu, i koristiš ih gde god hoćeš — na sajtu, mrežama ili u kampanjama.",
      },
    ],
    forWhom: [
      "Firme koje oglašavaju na Facebook-u i Instagramu i troše na slike koje niko ne gleda",
      "Prodavnice sa proizvodima koje treba pokazati u pokretu",
      "Biznisi kojima je klasično snimanje preskupo ili presporo",
      "Svako ko hoće da testira više poruka umesto da se kladi na jednu",
    ],
    process: [
      {
        title: "Šta prodaješ i kome",
        body: "Kratak razgovor o proizvodu, kupcu i tome šta hoćeš da se desi kada neko odgleda video.",
      },
      {
        title: "Materijal",
        body: "Šalješ šta imaš — fotografije, snimke sa telefona, logo. Ostalo se pravi.",
      },
      {
        title: "Prvi predlog",
        body: "Dobijaš verziju na pregled. Kaže se šta ne valja i menja se dok ne bude kako treba.",
      },
      {
        title: "Varijante i predaja",
        body: "Na odobrenu verziju pravimo alternative za test i predajemo sve fajlove.",
      },
    ],
    faq: [
      {
        q: "Da li se vidi da je video pravljen veštačkom inteligencijom?",
        a: "Ponekad da, ponekad ne — zavisi od scene. Zato AI koristimo tamo gde radi dobro, a tvoje prave fotografije i snimke tamo gde je autentičnost važnija. Ako proizvod mora da se vidi tačno onakav kakav jeste, on ide sa tvog materijala, ne generisan.",
      },
      {
        q: "Zamenjuje li ovo snimatelja?",
        a: "Ne za sve. Za oglase, prikaz proizvoda i objave na mrežama — najčešće da. Za priču o firmi, intervju ili nešto gde se vidi tvoje lice i prostor, kamera je i dalje bolji izbor i to ćemo ti reći otvoreno.",
      },
      {
        q: "Mogu li da koristim video i van oglasa?",
        a: "Možeš. Fajlovi su tvoji i idu i na sajt, i na YouTube, i na TikTok, bez dodatnih naknada.",
      },
      {
        q: "Šta treba da pošaljem da bi se počelo?",
        a: "Fotografije proizvoda ili usluge, logo ako ga imaš i rečenicu-dve o tome šta hoćeš da poručiš. Ako imaš i snimke sa telefona, još bolje — često se baš oni pokažu kao najuverljiviji deo.",
      },
    ],
    blogCategory: "facebook-ads",
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    navTitle: "Google Ads",
    icon: "target",
    tagline:
      "Kupci koji već traže tvoj proizvod — na tvom sajtu već danas popodne.",
    metaDescription:
      "Vođenje Google Ads kampanja: Search, Display, Performance Max i Shopping. Optimizacija cene po konverziji i transparentni mesečni izveštaji.",
    highlights: [
      "Search kampanje",
      "Performance Max",
      "Google Shopping",
      "Display i YouTube",
      "Remarketing",
      "Praćenje konverzija",
    ],
    intro: [
      "Google Ads je najbrži način da dođeš do ljudi u trenutku kupovne namere. I najbrži način da potrošiš budžet ni na šta, ako je postavljen površno.",
      "Razlika je u detaljima: negativnim ključnim rečima, kvalitetu landing stranice, ispravno postavljenim konverzijama i strpljenju da se kampanja pusti da uči pre nego što je počneš prepravljati svaki dan.",
    ],
    deliverables: [
      {
        title: "Postavka naloga i praćenja",
        body: "Google Ads, Analytics 4, Tag Manager i konverzije koje mere pravu stvar — upit, poziv ili porudžbinu, ne klik.",
      },
      {
        title: "Istraživanje ključnih reči",
        body: "Šta ljudi zaista pretražuju, koliko to košta i koje pretrage odmah isključujemo da ne bi trošile budžet.",
      },
      {
        title: "Struktura kampanja",
        body: "Search, Performance Max, Shopping ili remarketing — biramo prema cilju i budžetu, bez uključivanja svega odjednom.",
      },
      {
        title: "Oglasi i landing stranice",
        body: "Pišemo oglase i savetujemo šta na stranici treba promeniti da klik postane upit. Najbolja kampanja ne spašava lošu stranicu.",
      },
      {
        title: "Optimizacija u kontinuitetu",
        body: "Nedeljne korekcije ponuda, ključnih reči, publike i budžeta prema tome šta zaista donosi konverzije.",
      },
      {
        title: "Izveštaj koji se razume",
        body: "Koliko je uloženo, koliko upita je stiglo, koliko košta jedan upit i šta je sledeći korak.",
      },
    ],
    forWhom: [
      "Firme kojima trebaju upiti odmah, dok SEO tek hvata zalet",
      "Web prodavnice sa jasnom maržom po proizvodu",
      "Sezonski biznisi sa kratkim prozorom prodaje",
      "Nalozi koji troše, a ne znaju odakle dolaze rezultati",
    ],
    process: [
      {
        title: "Cilj i ekonomija",
        body: "Koliko sme da košta jedan kupac da bi kampanja bila isplativa. Sve kreće odatle.",
      },
      {
        title: "Merenje pre trošenja",
        body: "Prvo postavljamo ispravno praćenje konverzija. Bez toga se optimizuje naslepo.",
      },
      {
        title: "Pokretanje",
        body: "Kreiranje kampanja, oglasa i publika, uz kontrolisan startni budžet.",
      },
      {
        title: "Faza učenja",
        body: "Prve 2–3 nedelje prikupljamo podatke i uklanjamo očigledno loše pretrage.",
      },
      {
        title: "Skaliranje",
        body: "Ono što donosi konverzije po prihvatljivoj ceni — pojačavamo. Ostalo gasimo.",
      },
    ],
    faq: [
      {
        q: "Koliki budžet je potreban za Google Ads?",
        a: "Zavisi od niše i cene klika. Za većinu uslužnih delatnosti u Srbiji smislen start je od 300–500 € mesečno za oglase. Ispod toga podataka ima premalo da bi se kampanja optimizovala.",
      },
      {
        q: "Da li je vaša naknada uključena u budžet za oglase?",
        a: "Nije. Budžet za oglase ide direktno Google-u sa tvoje kartice, a naša naknada za vođenje je odvojena. Tako uvek tačno vidiš gde je koji dinar otišao.",
      },
      {
        q: "Koliko brzo se vide rezultati?",
        a: "Prvi klikovi stižu istog dana. Za pouzdanu ocenu isplativosti treba 3–4 nedelje, koliko kampanji treba da izađe iz faze učenja.",
      },
    ],
    blogCategory: "google-ads",
  },
  {
    slug: "facebook-instagram-oglasavanje",
    title: "Facebook i Instagram oglašavanje",
    navTitle: "Facebook i Instagram Ads",
    icon: "megaphone",
    tagline:
      "Dolazimo do kupaca pre nego što uopšte počnu da traže — i vraćamo one koji su otišli.",
    metaDescription:
      "Meta oglašavanje na Facebook-u i Instagram-u: lead generation, e-commerce kampanje i remarketing. Kreative, publike i optimizacija cene po rezultatu.",
    highlights: [
      "Lead Generation",
      "E-commerce kampanje",
      "Remarketing",
      "Izrada kreativa",
      "Meta Pixel i CAPI",
      "A/B testiranje",
    ],
    intro: [
      "Na Google-u hvataš tražnju koja već postoji. Na Facebook-u i Instagram-u je stvaraš — pokazuješ proizvod ljudima koji nisu ni znali da ti trebaš.",
      "Zato je ovde kreativa najvažniji faktor, važnija od podešavanja publika. Dobar video ili slika sa jasnom porukom nadmašiće savršeno ciljanu kampanju sa dosadnim oglasom svaki put.",
    ],
    deliverables: [
      {
        title: "Strategija i struktura naloga",
        body: "Kampanje po fazama levka: upoznavanje, razmatranje i konverzija — da svaka publika vidi poruku koja joj odgovara.",
      },
      {
        title: "Kreative koje zaustave skrol",
        body: "Statični oglasi, karuseli i kratki video formati prilagođeni Reels-u i Stories-ima, sa tekstom koji prodaje.",
      },
      {
        title: "Precizno merenje",
        body: "Meta Pixel i Conversions API, tako da se konverzije mere i uprkos blokiranju kolačića na iOS uređajima.",
      },
      {
        title: "Publike i remarketing",
        body: "Slične publike, posetioci sajta, napuštene korpe, postojeći kupci — svaka sa svojom porukom i budžetom.",
      },
      {
        title: "Lead kampanje",
        body: "Formulari unutar Facebook-a ili landing stranica na sajtu, uz filtriranje da ti u inboks ne stižu neozbiljni upiti.",
      },
      {
        title: "Stalno testiranje",
        body: "Nedeljno testiramo nove kreative i poruke. Oglasi se troše — ono što je radilo pre dva meseca danas više ne radi.",
      },
    ],
    forWhom: [
      "Web prodavnice sa vizuelno privlačnim proizvodima",
      "Usluge koje traže zakazivanje i konsultacije",
      "Lokalni objekti koji ciljaju svoju okolinu",
      "Firme koje već „bustuju“ objave i žele pravu kampanju",
    ],
    process: [
      {
        title: "Ponuda i poruka",
        body: "Šta tačno nudimo i zašto bi neko stao da to pogleda. Bez jake ponude nema jeftinog rezultata.",
      },
      {
        title: "Tehnička postavka",
        body: "Business Manager, Pixel, CAPI, katalog proizvoda i događaji konverzije.",
      },
      {
        title: "Produkcija kreativa",
        body: "Pravimo set oglasa u više formata i uglova, za paralelno testiranje.",
      },
      {
        title: "Testiranje",
        body: "Puštamo, merimo cenu po rezultatu i vrlo brzo gasimo ono što ne radi.",
      },
      {
        title: "Skaliranje pobednika",
        body: "Postepeno dižemo budžet na kombinacijama koje daju najbolju cenu po rezultatu.",
      },
    ],
    faq: [
      {
        q: "Da li „bustovanje“ objave ima smisla?",
        a: "Za povećanje pregleda — ponekad. Za prodaju — gotovo nikad. Bustovanje nema pristup ozbiljnim ciljevima optimizacije i publikama koje ima kampanja iz Ads Manager-a.",
      },
      {
        q: "Ko pravi fotografije i video za oglase?",
        a: "Možemo mi, možeš ti, ili kombinovano. Za mnoge proizvode najbolje rade jednostavni telefonski snimci — deluju autentično i često pobede skupu produkciju.",
      },
      {
        q: "Šta ako mi je nalog blokiran?",
        a: "Pomažemo oko žalbe i ponovnog uspostavljanja, a nalog postavljamo tako da se rizik blokade smanji — poseban Business Manager, verifikovan domen i pravila oglašavanja ispoštovana od početka.",
      },
    ],
    blogCategory: "facebook-ads",
  },
  // Napomena: GTM, GA4 i Facebook pixel su namerno jedna usluga, ne tri.
  // Tri skoro identične stranice Google čita kao tanak, ponovljen sadržaj.
  {
    slug: "merenje-i-analitika",
    title: "Postavljanje merenja: GTM, GA4 i Facebook pixel",
    navTitle: "Merenje i analitika",
    icon: "chart",
    tagline:
      "Da znaš odakle ti dolaze kupci, umesto da nagađaš gde odlazi budžet.",
    metaDescription:
      "Postavljanje Google Tag Managera, Google Analytics 4 i Facebook pixela na sajt. Praćenje konverzija, provera da merenje radi i izveštaji koji se razumeju.",
    highlights: [
      "Google Tag Manager",
      "Google Analytics 4",
      "Facebook pixel",
      "Praćenje konverzija",
      "Provera merenja",
      "Saglasnost za kolačiće",
    ],
    intro: [
      "Bez merenja se oglašavanje svodi na osećaj. Kampanja troši, upiti stižu, i niko ne zna koji je kanal doneo kupca a koji samo pravi klikove. Najgore je što se ta greška vidi tek posle nekoliko meseci potrošenog budžeta.",
      "Postavljanje je posao od jednog dana i uradi se jednom. Google Tag Manager ide kao osnova, kroz njega se puštaju Analytics i Facebook pixel, i posle toga se novi kod dodaje bez diranja sajta. Najvažniji deo nije ugradnja nego to da se izmere prave stvari — poslata forma, poziv, kupovina — a ne samo broj poseta.",
      "Na kraju proveravamo da merenje stvarno radi. To je korak koji se najčešće preskoči, pa firme mesecima gledaju u brojke koje ne znače ništa.",
    ],
    deliverables: [
      {
        title: "Google Tag Manager",
        body: "Kontejner postavljen na sajt kako treba. Posle toga se svaki novi kod za praćenje dodaje kroz njega, bez ulaženja u sam sajt.",
      },
      {
        title: "Google Analytics 4",
        body: "Nalog, povezivanje sa sajtom i podešavanje da se prate radnje koje su tebi važne, ne samo poseta stranica.",
      },
      {
        title: "Facebook pixel",
        body: "Pixel i osnovni događaji za Facebook i Instagram kampanje, uključujući Conversions API tamo gde ima smisla, jer blokatori reklama sve više jedu obično merenje.",
      },
      {
        title: "Konverzije koje ti nešto znače",
        body: "Poslata kontakt forma, klik na telefon, poruka na WhatsApp, završena kupovina — ono po čemu se stvarno meri da li sajt radi.",
      },
      {
        title: "Provera da sve radi",
        body: "Prolazak kroz sajt i potvrda da se svaki događaj beleži tamo gde treba. Bez ovog koraka merenje ume da izgleda ispravno a da ne hvata ništa.",
      },
      {
        title: "Usklađivanje sa kolačićima",
        body: "Merenje se povezuje sa saglasnošću za kolačiće, tako da se ne skuplja ono za šta posetilac nije dao pristanak.",
      },
    ],
    forWhom: [
      "Firme koje već oglašavaju, a ne znaju šta se od toga isplati",
      "Prodavnice kojima treba praćenje kupovina i vrednosti korpe",
      "Sajtovi na kojima je merenje postavljeno davno i niko ne zna radi li",
      "Svako ko planira kampanje i hoće da krene sa ispravnim brojkama",
    ],
    process: [
      {
        title: "Šta se meri",
        body: "Kratak razgovor o tome šta je za tebe uspeh — poziv, upit, kupovina — jer se merenje postavlja prema tome.",
      },
      {
        title: "Pristupi",
        body: "Treba nam pristup sajtu i tvojim Google i Facebook nalozima. Ako ih nemaš, otvaramo ih na tvoje ime.",
      },
      {
        title: "Postavljanje",
        body: "Tag Manager, Analytics i pixel, uz podešavanje događaja i konverzija.",
      },
      {
        title: "Provera i predaja",
        body: "Testiramo svaki događaj, pa ti pokažemo gde se šta vidi i kako da čitaš izveštaj.",
      },
    ],
    faq: [
      {
        q: "Imam već Analytics, treba li mi ovo?",
        a: "Zavisi šta meri. Ako beleži samo posete, znaš koliko ljudi dolazi ali ne i koliko njih se javi — a to je jedina brojka koja plaća račune. Pogledamo postojeće stanje i kažemo ti da li treba doraditi ili je sve u redu.",
      },
      {
        q: "Zašto je ovo jedna usluga, a ne tri odvojene?",
        a: "Zato što se u praksi rade zajedno i dele iste pripreme. Tag Manager je osnova kroz koju idu i Analytics i pixel, pa je razdvajanje samo administrativno. Ako ti treba samo jedno od toga, naravno da može i tako.",
      },
      {
        q: "Da li ovo usporava sajt?",
        a: "Neznatno, i to se sređuje odlaganjem učitavanja. Tag Manager je zapravo bolji za brzinu od gomile pojedinačnih kodova ubačenih direktno u sajt.",
      },
      {
        q: "Šta sa GDPR-om i kolačićima?",
        a: "Merenje vezujemo za saglasnost, tako da se kolačići za analitiku i oglašavanje puštaju tek kada posetilac pristane. Traka za saglasnost mora da postoji na sajtu — ako je nemaš, postavljamo je.",
      },
    ],
    blogCategory: "digitalni-marketing",
  },
  {
    slug: "oglasi-na-oglasnicima",
    title: "Postavljanje oglasa na 50 oglasnika",
    navTitle: "Oglasi na oglasnicima",
    icon: "list",
    tagline:
      "Tvoja ponuda na najmanje pedeset oglasnika i pet Facebook grupa, ručno postavljena.",
    metaDescription:
      "Postavljanje kratkih oglasa na minimum 50 oglasnika i 5 Facebook grupa. Ručno pisani oglasi sa linkom ka sajtu, za dodatne upite i vidljivost bez budžeta za reklame.",
    highlights: [
      "Minimum 50 oglasnika",
      "5 Facebook grupa",
      "Ručno postavljanje",
      "Tekst oglasa",
      "Link ka sajtu",
      "Spisak objava",
    ],
    intro: [
      "Oglasnici su u Srbiji i dalje mesto gde ljudi traže majstora, prevoz, mašinu ili uslugu — često pre nego što odu na Google. Za mnoge delatnosti odatle stiže više poziva nego sa plaćenih reklama, a ne košta ništa osim vremena.",
      "Vreme je i jedini problem. Pedeset oglasnika znači pedeset registracija, pedeset formulara i pedeset puta isti tekst prilagođen pravilima svakog sajta. To niko ne stigne uz posao, pa se najčešće završi na tri-četiri najpoznatija i tu stane.",
      "Zato ovo radimo umesto tebe, ručno. Ne postoji alat koji to uradi kako treba — automatski postavljeni oglasi se brišu ili ne prolaze moderaciju.",
    ],
    deliverables: [
      {
        title: "Oglasi na najmanje 50 oglasnika",
        body: "Ručno postavljeno na domaće oglasnike, u kategoriju koja odgovara tvojoj delatnosti, sa slikama i kontakt podacima.",
      },
      {
        title: "Objave u 5 Facebook grupa",
        body: "Grupe biramo prema tvom gradu i delatnosti, uz poštovanje pravila svake — objava koja prekrši pravila ionako biva obrisana.",
      },
      {
        title: "Tekst oglasa",
        body: "Kratak i jasan tekst pisan tako da ga čovek pročita do kraja, sa nekoliko varijanti da se ista objava ne ponavlja svuda doslovno.",
      },
      {
        title: "Link ka sajtu",
        body: "Tamo gde oglasnik dozvoljava, oglas vodi na tvoj sajt — dodatni upiti i poneki koristan link uz to.",
      },
      {
        title: "Spisak svega objavljenog",
        body: "Dobijaš tabelu sa svakim oglasnikom, linkom ka objavi i podacima za prijavu, da kasnije možeš sam da obnavljaš.",
      },
    ],
    forWhom: [
      "Majstori, servisi i prevoznici koji žive od poziva",
      "Prodaja mašina, vozila i opreme",
      "Firme koje kreću bez budžeta za plaćene reklame",
      "Svako kome treba brza vidljivost dok SEO ne uhvati maha",
    ],
    process: [
      {
        title: "Ponuda i podaci",
        body: "Šta oglašavaš, u kom gradu, po kojoj ceni i na koji broj da te zovu.",
      },
      {
        title: "Tekst i slike",
        body: "Pišemo oglas u nekoliko varijanti i pripremamo slike u formatu koji oglasnici traže.",
      },
      {
        title: "Postavljanje",
        body: "Ručno prolazimo kroz oglasnike i grupe. Ovo je deo koji traje i obično se završi za nekoliko dana.",
      },
      {
        title: "Spisak i predaja",
        body: "Dobijaš tabelu sa svim objavama i pristupnim podacima.",
      },
    ],
    faq: [
      {
        q: "Koliko oglasa stvarno bude?",
        a: "Najmanje pedeset oglasnika i pet grupa. Ponekad i više, zavisno od delatnosti — nemaju sve branše isti broj oglasnika koji ima smisla.",
      },
      {
        q: "Koliko dugo oglasi ostaju?",
        a: "Zavisi od oglasnika. Neki traju neograničeno, neki ističu za trideset dana i traže obnavljanje. Zato i dobijaš spisak sa pristupnim podacima, da možeš sam da ih obnoviš. Obnavljanje po dogovoru radimo i mi.",
      },
      {
        q: "Da li ovo pomaže SEO-u?",
        a: "Delimično. Neki oglasnici daju link koji se računa, većina ne. Glavna korist su direktni pozivi sa oglasnika, a ne pozicija na Google-u — ne bismo to prodavali kao SEO uslugu.",
      },
      {
        q: "Može li se ovo automatizovati?",
        a: "Ne kako treba. Oglasnici prepoznaju masovno postavljanje i takve oglase brišu ili blokiraju nalog. Zato se radi ručno, i zato traje.",
      },
    ],
    blogCategory: "digitalni-marketing",
  },
  {
    slug: "email-marketing",
    title: "Email marketing",
    navTitle: "Email marketing",
    icon: "mail",
    tagline:
      "Jedini kanal gde publika pripada tebi, a ne algoritmu koji se menja svakog kvartala.",
    metaDescription:
      "Email marketing i automatizacija: newsletter, oporavak napuštenih korpi, segmentacija i kampanje koje vraćaju postojeće kupce.",
    highlights: [
      "Newsletter kampanje",
      "Automatizacije",
      "Napuštene korpe",
      "Segmentacija",
      "Dizajn šablona",
      "Deliverability (SPF, DKIM, DMARC)",
    ],
    intro: [
      "Instagram ti može ugasiti nalog. Google može promeniti algoritam. Lista email adresa ostaje tvoja bez obzira na sve.",
      "Uz to, email je najisplativiji kanal u digitalnom marketingu — jer ne plaćaš po kontaktu i obraćaš se ljudima koji su već pokazali interesovanje.",
    ],
    deliverables: [
      {
        title: "Postavka platforme",
        body: "Izbor i podešavanje alata prema tvojoj veličini i budžetu, uz povezivanje sa sajtom ili prodavnicom.",
      },
      {
        title: "Prikupljanje kontakata",
        body: "Formulari, pop-up prozori i podsticaj za prijavu koji zaista vredi ostaviti adresu — bez agresivnih iskačućih prozora koji teraju posetioca.",
      },
      {
        title: "Automatizacije koje rade same",
        body: "Serija dobrodošlice, oporavak napuštene korpe, poruka posle kupovine, reaktivacija uspavanih kupaca. Postavi jednom, radi mesecima.",
      },
      {
        title: "Segmentacija",
        body: "Različita poruka za novog pretplatnika i za kupca koji je kupio tri puta. Segmentacija je najveći pojedinačni izvor rasta prihoda po mejlu.",
      },
      {
        title: "Isporučivost",
        body: "SPF, DKIM i DMARC podešeni kako treba, plus higijena liste — da mejlovi stižu u Inbox, a ne u Promocije ili Spam.",
      },
      {
        title: "Kampanje i izveštaji",
        body: "Redovan newsletter i sezonske kampanje, uz izveštaj o otvaranjima, klikovima i prihodu po kampanji.",
      },
    ],
    forWhom: [
      "Web prodavnice sa ponovljenim kupovinama",
      "Firme sa dugim ciklusom odlučivanja koje moraju da „greju“ kontakte",
      "Biznisi sa bazom kupaca koja stoji neiskorišćena",
      "Svako ko troši na oglase, a ne prikuplja kontakte",
    ],
    process: [
      {
        title: "Revizija baze",
        body: "Šta imaš, u kakvom je stanju i šta se sme koristiti u skladu sa propisima.",
      },
      {
        title: "Tehnička postavka",
        body: "Platforma, domen za slanje, autentifikacija i integracija sa prodavnicom.",
      },
      {
        title: "Automatizacije",
        body: "Prvo postavljamo tokove koji donose prihod bez tvog daljeg rada.",
      },
      {
        title: "Redovna komunikacija",
        body: "Kalendar slanja i produkcija sadržaja.",
      },
      {
        title: "Optimizacija",
        body: "A/B testovi naslova, vremena slanja i ponuda.",
      },
    ],
    faq: [
      {
        q: "Da li smem da šaljem mejlove kupcima bez izričite prijave?",
        a: "Postojećim kupcima za srodne proizvode obično da, uz jasnu mogućnost odjave. Kupljene liste — nikako: uništavaju reputaciju domena i nose pravni rizik. Sve postavljamo u skladu sa Zakonom o zaštiti podataka o ličnosti i GDPR praksom.",
      },
      {
        q: "Koliko često treba slati mejlove?",
        a: "Za većinu domaćih firmi dva do četiri puta mesečno je zdrava mera. Bitnija je doslednost od učestalosti.",
      },
      {
        q: "Šta ako imam malu listu?",
        a: "Onda prvo radimo na prikupljanju kontakata. Lista od 500 zainteresovanih ljudi vredi više od 10.000 nasumičnih adresa.",
      },
    ],
    blogCategory: "digitalni-marketing",
  },
  {
    slug: "ai-automatizacija",
    title: "AI automatizacija",
    navTitle: "AI automatizacija",
    icon: "sparkles",
    tagline:
      "Poslovi koji ti danas jedu sate — chatbot, ponude, unos podataka — od sutra rade sami.",
    metaDescription:
      "AI automatizacija za male i srednje firme: chatbot na sajtu, automatska obrada upita, integracije sa CRM-om i AI agenti za ponavljajuće poslove.",
    highlights: [
      "Chatbot na sajtu",
      "Email automatizacija",
      "CRM integracije",
      "AI agenti",
      "Automatska obrada upita",
      "Generisanje sadržaja",
    ],
    intro: [
      "AI se u praksi ne isplati kao „nešto pametno na sajtu“, nego kao konkretno oslobođeno vreme. Ako svakog dana gubiš dva sata na odgovaranje na ista pitanja, prepisivanje porudžbina ili pisanje ponuda — to je posao koji danas može da radi automatizacija.",
      "Ne prodajemo AI radi AI-ja. Prvo merimo koliko te neki proces košta u satima, pa gradimo automatizaciju samo ako se jasno isplati.",
    ],
    deliverables: [
      {
        title: "Chatbot koji zna tvoj posao",
        body: "Obučen na tvojim uslugama, cenama i najčešćim pitanjima. Odgovara 24/7, prikuplja kontakt i prosleđuje ozbiljan upit tebi.",
      },
      {
        title: "Automatska obrada upita",
        body: "Dolazni mejlovi i poruke se čitaju, razvrstavaju, upisuju u tabelu ili CRM i dobijaju prvi odgovor — bez tvog uključivanja.",
      },
      {
        title: "AI agenti za ponavljajuće poslove",
        body: "Priprema ponuda, izveštaja i opisa proizvoda, obrada dokumenata, prepisivanje podataka iz jednog sistema u drugi.",
      },
      {
        title: "Integracije sistema",
        body: "Povezujemo sajt, CRM, tabele, kalendar i alate koje već koristiš, tako da podatak unosiš jednom.",
      },
      {
        title: "Generisanje sadržaja uz kontrolu",
        body: "Nacrti opisa proizvoda i tekstova po tvom tonu, uz obaveznu ljudsku proveru pre objave.",
      },
      {
        title: "Dokumentacija i obuka",
        body: "Uputstvo kako sistem radi i šta da radiš kada nešto zapne, plus podrška u prvim nedeljama.",
      },
    ],
    forWhom: [
      "Firme koje dobijaju mnogo istih pitanja preko poruka i telefona",
      "Prodavnice sa ručnom obradom porudžbina",
      "Timovi koji prepisuju podatke između Excel-a i drugih alata",
      "Vlasnici koji su postali usko grlo sopstvene firme",
    ],
    process: [
      {
        title: "Mapiranje procesa",
        body: "Popisujemo šta se radi ručno, koliko često i koliko sati mesečno odnosi.",
      },
      {
        title: "Izbor prioriteta",
        body: "Biramo jedan ili dva procesa sa najboljim odnosom uštede i složenosti.",
      },
      {
        title: "Prototip",
        body: "Pravimo radnu verziju za nedelju-dve i puštamo je na stvarnim podacima.",
      },
      {
        title: "Uvođenje",
        body: "Integracija sa postojećim alatima i obuka tima.",
      },
      {
        title: "Nadzor",
        body: "Pratimo tačnost i doterujemo. AI koji niko ne proverava vremenom pravi štetu.",
      },
    ],
    faq: [
      {
        q: "Da li AI može da zameni moje zaposlene?",
        a: "Cilj obično nije zamena ljudi nego uklanjanje dosadnog dela posla — da isti tim stigne da radi ono što donosi novac. Zameniti čoveka u odnosu sa klijentom je loša ideja.",
      },
      {
        q: "Šta ako chatbot da pogrešan odgovor?",
        a: "Ograničavamo ga na proverene informacije iz tvojih materijala i podešavamo da kod nesigurnosti prebaci razgovor na čoveka umesto da izmišlja.",
      },
      {
        q: "Koliko košta AI automatizacija?",
        a: "Zavisi od procesa. Jednostavan chatbot na sajtu je jednokratna postavka sa malim mesečnim troškom, dok integracija sa više sistema traži veći projekat. Uvek prvo računamo za koliko meseci se investicija vraća.",
      },
    ],
    blogCategory: "ai",
  },
  {
    slug: "odrzavanje-sajtova",
    title: "Održavanje i podrška",
    navTitle: "Održavanje sajtova",
    icon: "shield",
    tagline:
      "Ažuriranja, bekap, bezbednost i brzina — da sajt radi, a ti ne razmišljaš o njemu.",
    metaDescription:
      "Održavanje WordPress sajtova: ažuriranja, dnevni bekap, bezbednost, praćenje dostupnosti i tehnička podrška uz garantovano vreme odziva.",
    highlights: [
      "Ažuriranja i dodaci",
      "Dnevni bekap",
      "Bezbednost i skeniranje",
      "Praćenje dostupnosti",
      "Optimizacija brzine",
      "Izmene sadržaja",
    ],
    intro: [
      "Sajt nije nameštaj koji se jednom kupi. WordPress, dodaci i tema se ažuriraju stalno, a zapušten sajt se ne kvari sam od sebe — provale se skoro uvek dešavaju kroz zastarelu verziju dodatka.",
      "Održavanje je najjeftiniji deo digitalnog budžeta i jedini koji sprečava troškove koji se mere danima zastoja i izgubljenih porudžbina.",
    ],
    deliverables: [
      {
        title: "Ažuriranja pod kontrolom",
        body: "WordPress jezgro, tema i dodaci se ažuriraju na test kopiji, pa tek onda na sajtu — da ti se sajt ne raspadne u ponedeljak ujutru.",
      },
      {
        title: "Automatski bekap",
        body: "Dnevna ili nedeljna kopija na udaljenoj lokaciji, sa proverenim vraćanjem. Bekap koji nikad nije testiran nije bekap.",
      },
      {
        title: "Bezbednost",
        body: "Zaštitni zid, skeniranje na zlonamerni kod, zaštita prijavne strane i uklanjanje infekcije ako do nje dođe.",
      },
      {
        title: "Praćenje dostupnosti",
        body: "Sajt se proverava svakih nekoliko minuta. Ako padne, mi saznamo pre tebe.",
      },
      {
        title: "Brzina i baza",
        body: "Periodično čišćenje baze, keš i optimizacija slika — da sajt vremenom ne postane sve sporiji.",
      },
      {
        title: "Sati za izmene",
        body: "Mesečni fond sati za sitne izmene teksta, slika, cena i banera. Bez ponude za svaku sitnicu.",
      },
    ],
    forWhom: [
      "Vlasnici WordPress i WooCommerce sajtova bez internog IT-a",
      "Firme koje su ostale bez kontakta sa prethodnim izvođačem",
      "Prodavnice kojima svaki sat zastoja znači izgubljen novac",
      "Sajtovi koji su već bili hakovani",
    ],
    process: [
      {
        title: "Tehnički pregled",
        body: "Proveravamo stanje sajta, hosting, bekap i bezbednost pre nego što preuzmemo održavanje.",
      },
      {
        title: "Sređivanje zatečenog stanja",
        body: "Jednokratno rešavamo nagomilane probleme da bismo krenuli sa čistog stanja.",
      },
      {
        title: "Rutina",
        body: "Mesečna ažuriranja, provere i izveštaj o urađenom.",
      },
      {
        title: "Podrška",
        body: "Javljaš se mejlom ili telefonom, sa unapred dogovorenim vremenom odziva.",
      },
    ],
    faq: [
      {
        q: "Održavate li sajtove koje niste vi pravili?",
        a: "Da, nakon tehničkog pregleda. Ako je sajt u lošem stanju, prvo predlažemo jednokratno sređivanje pa tek onda mesečno održavanje.",
      },
      {
        q: "Šta ako mi je sajt hakovan?",
        a: "Radimo hitno čišćenje, uklanjamo zlonamerni kod, vraćamo čist bekap i zatvaramo ulaz kroz koji su ušli. Zatim uvodimo zaštitu da se ne ponovi.",
      },
      {
        q: "Da li je hosting uključen?",
        a: "Nije obavezno, ali možemo preuzeti i hosting ili preseliti sajt na brži i pouzdaniji. Preporuku dajemo prema veličini i saobraćaju sajta.",
      },
    ],
    blogCategory: "wordpress",
  },
];

export function getAllServices(): Service[] {
  return services;
}

/**
 * Jezgro ponude — jedino što se prikazuje na početnoj strani. Ostale usluge
 * nisu ukinute, samo žive na /usluge i u mega meniju, za one koji traže dublje.
 *
 * Redosled ovog niza je redosled kartica na početnoj, nezavisno od redosleda
 * u `services` gore. Menjaj ovde da promeniš početnu.
 */
const coreServiceSlugs = [
  "sajt-za-jedan-dan",
  "izrada-web-sajtova",
  "seo-optimizacija",
  "google-biznis-profil",
  "vizuali-canva",
  "video-reklame-ai",
] as const;

export function getCoreServices(): Service[] {
  return coreServiceSlugs.map((slug) => {
    const service = getServiceBySlug(slug);
    // Namerno ruši build: greška u slug-u bi inače tiho izbacila uslugu sa početne.
    if (!service) {
      throw new Error(`coreServiceSlugs: nepoznat slug „${slug}“ u services.ts`);
    }
    return service;
  });
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
