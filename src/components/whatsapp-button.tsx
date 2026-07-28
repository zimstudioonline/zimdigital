import { Icon } from "@/components/icons";
import { site } from "@/lib/site";

/** Plutajuće WhatsApp dugme — vidljivo na svim stranicama. */
export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Piši nam na WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  );
}
