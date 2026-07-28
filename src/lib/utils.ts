/** Spaja klase i preskače falsy vrednosti. Dovoljno umesto clsx-a. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
