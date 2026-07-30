"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { CONSENT_EVENT, getConsent } from "@/lib/consent";
import { site } from "@/lib/site";

/**
 * Google Tag Manager.
 *
 * Analitika (GA4) ide isključivo kroz GTM kontejner — ovde namerno nema
 * zasebnog gtag.js, jer bi se sa GA4 tagom u kontejneru sve merilo dvaput.
 *
 * Skripta se NE učitava dok posetilac ne prihvati analitičke ili marketinške
 * kolačiće — banner koji ne blokira skripte ne vredi ništa (vidi
 * src/lib/consent.ts). Kada saglasnost stigne, `saveConsent` javi preko
 * `CONSENT_EVENT`, kontejner se podigne i zatekne u dataLayer-u već upisan
 * `consent update`, pa Consent Mode radi od prve komande.
 *
 * Povlačenje saglasnosti ne uklanja već učitanu skriptu iz stranice, ali
 * `applyToGtag` pošalje `denied`, pa merenje prestaje i kolačići se brišu.
 */
export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => {
      const stored = getConsent();
      setAllowed(stored?.analytics === true || stored?.marketing === true);
    };

    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!allowed) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`}
    </Script>
  );
}
