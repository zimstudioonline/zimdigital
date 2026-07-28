/**
 * Saglasnost za kolačiće.
 *
 * Izbor se čuva u localStorage. Kada dodaš Google Analytics ili Meta Pixel,
 * NE učitavaj ih bezuslovno — pitaj `getConsent()` i osluškuj događaj
 * `CONSENT_EVENT`, pa ih pokreni tek kada je odgovarajuća kategorija
 * odobrena. Banner koji ne blokira skripte je ukras, ne usklađenost.
 */

export const CONSENT_KEY = "zim-consent";
export const CONSENT_EVENT = "zim-consent-change";
/** Podigni verziju kada promeniš kategorije — tada se svima ponovo traži pristanak. */
export const CONSENT_VERSION = 1;

export type Consent = {
  version: number;
  /** Uvek true — bez njih sajt ne radi */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO datum davanja saglasnosti */
  date: string;
};

export const DENIED: Omit<Consent, "date" | "version"> = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== CONSENT_VERSION) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    date: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // Privatni režim ili blokiran localStorage — banner će se pojaviti ponovo.
  }

  applyToGtag(consent);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));

  return consent;
}

/**
 * Google Consent Mode v2. Radi i pre nego što GA postoji — komande se
 * skupljaju u dataLayer i primenjuju čim se gtag učita.
 */
export function applyToGtag(consent: Pick<Consent, "analytics" | "marketing">) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];

  w.dataLayer.push([
    "consent",
    "update",
    {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    },
  ]);
}

/** Otvara podešavanja kolačića iz bilo kog dela sajta (link u podnožju). */
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("zim-consent-open"));
}
