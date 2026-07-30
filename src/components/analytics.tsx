"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { CONSENT_EVENT, getConsent } from "@/lib/consent";
import { site } from "@/lib/site";

/**
 * Google Analytics 4 i Google Tag Manager.
 *
 * Nijedna skripta se NE učitava dok posetilac ne prihvati odgovarajuću
 * kategoriju kolačića — banner koji ne blokira skripte ne vredi ništa
 * (vidi src/lib/consent.ts). Kada saglasnost stigne, `saveConsent` javi preko
 * `CONSENT_EVENT`, skripta se podigne i zatekne u dataLayer-u već upisan
 * `consent update`, pa Consent Mode radi od prve komande.
 *
 * GTM se pušta i za marketing saglasnost, jer kontejner nosi i oglasne tagove.
 *
 * Povlačenje saglasnosti ne uklanja već učitanu skriptu iz stranice, ali
 * `applyToGtag` pošalje `denied`, pa merenje prestaje i kolačići se brišu.
 */
export function Analytics() {
  const [consent, setConsent] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const sync = () => {
      const stored = getConsent();
      setConsent({
        analytics: stored?.analytics === true,
        marketing: stored?.marketing === true,
      });
    };

    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <>
      {consent.analytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
          </Script>
        </>
      ) : null}

      {consent.analytics || consent.marketing ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`}
        </Script>
      ) : null}
    </>
  );
}
