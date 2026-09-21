/**
 * Pravi brand cover sliku za auto-generisane blog postove — gradient karta sa
 * naslovom, bez zavisnosti od eksternog image-gen API-ja. Isti princip kao
 * Vercel OG slike: satori pretvara JSX-nalik stablo u SVG, resvg rasterizuje
 * u PNG, sharp konvertuje u webp (isti format kao ostale cover slike).
 *
 * Gradient (ink-900 → brand-600 → accent-500) i boje su iz src/app/globals.css
 * — ako se tamo promene brand tokeni, promeni i ovde.
 */

import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const WIDTH = 1600;
const HEIGHT = 900;
const ASSETS_DIR = path.join(process.cwd(), "scripts", "assets");

const COLORS = {
  ink900: "#0d1118",
  brand600: "#4f46e5",
  accent500: "#06b6d4",
  white: "#ffffff",
};

function loadFonts() {
  return [
    {
      name: "Inter",
      data: fs.readFileSync(path.join(ASSETS_DIR, "Inter-Regular.woff")),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: fs.readFileSync(path.join(ASSETS_DIR, "Inter-Bold.woff")),
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: fs.readFileSync(path.join(ASSETS_DIR, "Inter-ExtraBold.woff")),
      weight: 800 as const,
      style: "normal" as const,
    },
  ];
}

type CoverInput = {
  title: string;
  categoryName: string;
};

function buildTree({ title, categoryName }: CoverInput) {
  const titleFontSize = title.length > 60 ? 50 : title.length > 40 ? 58 : 68;

  return {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: `linear-gradient(135deg, ${COLORS.ink900} 0%, ${COLORS.brand600} 55%, ${COLORS.accent500} 100%)`,
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", justifyContent: "space-between" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: COLORS.white,
                    fontSize: 30,
                    fontWeight: 800,
                    letterSpacing: -0.5,
                  },
                  children: "ZIM Digital",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    color: COLORS.white,
                    fontSize: 24,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    background: "rgba(255,255,255,0.16)",
                    borderRadius: 999,
                    padding: "10px 26px",
                  },
                  children: categoryName,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              color: COLORS.white,
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -1,
              maxWidth: 1320,
            },
            children: title,
          },
        },
      ],
    },
  };
}

export async function generateCover(input: CoverInput): Promise<Buffer> {
  const svg = await satori(buildTree(input) as never, {
    width: WIDTH,
    height: HEIGHT,
    fonts: loadFonts(),
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
  const png = resvg.render().asPng();

  return sharp(png).webp({ quality: 82 }).toBuffer();
}
