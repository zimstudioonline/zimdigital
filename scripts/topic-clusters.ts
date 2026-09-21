/**
 * Red čekanja konkretnih tema za auto-blog, po klasterima iz Search Console
 * analize (SEO cena, Lokalni SEO, Google Ads, Web sajtovi/prodavnice).
 *
 * generate-blog-post.ts prolazi kroz klastere kružno (round-robin) i unutar
 * svakog kroz teme redom — sve dok ima nepokrivenih tema. Kad je klaster
 * prazan, preskače se. Kad su SVI klasteri prazni, skripta se vraća na
 * staro slobodno biranje teme po kategoriji (pickCategory u
 * generate-blog-post.ts).
 *
 * "Bricks Builder ili Elementor" klaster namerno nije ovde — traženi
 * evergreen tekst već postoji (content/blog/bricks-builder-ili-elementor.mdx).
 *
 * pillarServiceSlug je podrazumevana stranica usluge na koju tekst linkuje
 * (mora postojati u src/lib/services.ts); topics[].pillarServiceSlug je
 * override za temu koja prirodnije vodi na drugu uslugu.
 */

import type { CategorySlug } from "../src/lib/categories";

export type ClusterTopic = {
  topic: string;
  pillarServiceSlug?: string;
};

export type Cluster = {
  id: string;
  name: string;
  categorySlug: CategorySlug;
  pillarServiceSlug: string;
  topics: ClusterTopic[];
};

export const clusters: Cluster[] = [
  {
    id: "seo-cena",
    name: "SEO cena",
    categorySlug: "seo",
    pillarServiceSlug: "seo-optimizacija",
    topics: [
      { topic: "Koliko košta SEO optimizacija sajta" },
      { topic: "SEO cena — šta sve ulazi u cenu" },
      { topic: "Koliko košta SEO agencija" },
      { topic: "SEO paketi — šta treba da sadrže" },
      { topic: "SEO za male firme — koliko ulaganje ima smisla" },
      { topic: "SEO za web shop — cena i šta dobijate", pillarServiceSlug: "izrada-web-prodavnica" },
      { topic: "Koliko dugo je potrebno da SEO počne da daje rezultate" },
      { topic: "SEO ili Google Ads — šta je bolje za firmu", pillarServiceSlug: "google-ads" },
    ],
  },
  {
    id: "lokalni-seo",
    name: "Lokalni SEO",
    categorySlug: "seo",
    pillarServiceSlug: "lokalni-seo",
    topics: [
      { topic: "Šta je lokalni SEO" },
      { topic: "Kako biti prvi na Google mapama" },
      { topic: "Kako optimizovati Google Biznis Profil" },
      { topic: "Zašto moja firma nije na Google mapama" },
      { topic: "Kako dobiti više poziva preko Google mapa" },
      { topic: "Lokalni SEO za male firme" },
      { topic: "Lokalni SEO Beograd" },
      { topic: "Lokalni direktorijumi — da li su još važni za SEO" },
      { topic: "Google Maps SEO — kompletan vodič" },
      { topic: "Kako doći do više lokalnih klijenata preko Google-a" },
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads",
    categorySlug: "google-ads",
    pillarServiceSlug: "google-ads",
    topics: [
      { topic: "Google Ads cena" },
      { topic: "Google Ads usluge" },
      { topic: "Google Ads Srbija" },
      { topic: "Google oglašavanje cena" },
      { topic: "Google Ads budžet" },
      { topic: "Koliko košta Google Ads" },
      { topic: "Google Ads za male firme" },
      { topic: "Google Ads vs SEO", pillarServiceSlug: "seo-optimizacija" },
      { topic: "Koliko novca treba za Google Ads" },
      { topic: "Kako funkcioniše Google Ads" },
    ],
  },
  {
    id: "web-sajtovi-prodavnice",
    name: "Web sajtovi i web prodavnice",
    categorySlug: "e-commerce",
    pillarServiceSlug: "izrada-web-prodavnica",
    topics: [
      { topic: "Koliko košta izrada web sajta", pillarServiceSlug: "izrada-web-sajtova" },
      { topic: "Koliko košta web prodavnica" },
      { topic: "WooCommerce ili Shopify" },
      { topic: "WordPress ili Shopify" },
      { topic: "Kako napraviti web shop" },
      { topic: "Šta treba da ima moderna web prodavnica" },
      { topic: "Kako napraviti web prodavnicu koja prodaje" },
      { topic: "SEO za web shop", pillarServiceSlug: "seo-optimizacija" },
      { topic: "Najčešće greške kod izrade web prodavnice" },
    ],
  },
];
