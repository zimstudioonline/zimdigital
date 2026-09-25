import { BackToTop } from "@/components/back-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";

/**
 * Header/footer/plutajuća dugmad za sve "obične" stranice sajta.
 * `/poziv` namerno stoji van ove grupe — landing stranica bez menija,
 * da posetilac ne ode sa stranice pre nego što zakaže razgovor.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />

      <main id="sadrzaj" className="flex-1">
        {children}
      </main>

      <SiteFooter />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
