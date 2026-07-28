import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // .mdx fajlovi iz content/blog se uvoze kao React komponente.
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack traži serializable opcije, pa se plugin-ovi navode imenom.
    // remark-frontmatter uklanja YAML blok iz sadržaja (čita ga src/lib/posts.ts).
    remarkPlugins: [["remark-frontmatter", "yaml"], ["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}]],
  },
});

export default withMDX(nextConfig);

// Omogućava da `next dev` vidi Cloudflare bindings iz wrangler.jsonc.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
