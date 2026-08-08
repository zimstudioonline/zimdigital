import type { MetadataRoute } from "next";

import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { getCaseStudies } from "@/lib/projects";
import { getAllServices } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/usluge`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/o-nama`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/politika-privatnosti`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/politika-kolacica`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/uslovi-koriscenja`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${site.url}/usluge/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = getCaseStudies().map((project) => ({
    url: `${site.url}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${site.url}/blog/kategorija/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...caseStudyPages,
    ...categoryPages,
    ...postPages,
  ];
}
