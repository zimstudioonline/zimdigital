import { Button } from "@/components/ui";
import { BOOKING_URL } from "./booking";

/**
 * Bez SiteHeader/SiteFooter — /poziv je landing stranica sa jednim ciljem
 * (zakazivanje), nema glavni meni koji bi bio izlaz sa stranice.
 * `id="sadrzaj"` čuva "Preskoči na sadržaj" link iz root layout-a.
 *
 * `pb-20` na main-u ostavlja prostor da sticky traka na dnu ne prekrije
 * poslednji deo sadržaja.
 */
export default function PozivLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="sadrzaj" className="flex-1 pb-20 sm:pb-0">
        {children}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-100 bg-white/95 px-4 py-3 shadow-lift backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="hidden text-sm text-ink-600 sm:block">
            30 min · Google Meet · besplatno i bez obaveze
          </p>
          <Button href={BOOKING_URL} external size="md" arrow className="w-full sm:w-auto">
            Hoću predlog, cenu i rok
          </Button>
        </div>
      </div>
    </>
  );
}
