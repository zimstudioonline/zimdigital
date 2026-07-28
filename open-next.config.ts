import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Bez incremental cache override-a za sada (ne zahteva R2/KV bucket).
  // Kada budeš hteo ISR keš, dodaj npr.:
  //   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
  //   incrementalCache: r2IncrementalCache,
});
