import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Sve stranice se generišu u buildu (SSG) i ne revalidiraju se u runtime-u,
  // pa se prerenderovan HTML čita direktno iz ASSETS binding-a. Bez ovoga
  // rute sa generateStaticParams (/usluge/*, /blog/*) vraćaju 404 na workerd-u.
  //
  // Ako kasnije uvedeš ISR (revalidate), ovaj override je read-only i treba ga
  // zameniti R2 ili KV keš override-om plus odgovarajućim binding-om u wrangler.jsonc.
  incrementalCache: staticAssetsIncrementalCache,
});
