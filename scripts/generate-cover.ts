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

/** Isti znak kao src/components/logo.tsx (LogoMark) — rect + tačka + „z“. */
function logoMarkSvg({
  size,
  squareFill,
  markFill,
}: {
  size: number;
  squareFill: string;
  markFill: string;
}) {
  return {
    type: "svg",
    props: {
      viewBox: "0 0 100 100",
      width: size,
      height: size,
      style: { display: "flex" },
      children: [
        { type: "rect", props: { width: 100, height: 100, rx: 26, fill: squareFill } },
        { type: "circle", props: { cx: 50, cy: 24, r: 7, fill: markFill } },
        {
          type: "path",
          props: { d: "M26 36h48v14L47 68h27v14H26V68l27-18H26z", fill: markFill },
        },
      ],
    },
  };
}

/** Mek radijalni sjaj u uglu — isti princip kao bg-mesh utility na sajtu. */
function glow({
  top,
  left,
  right,
  bottom,
  size,
  color,
}: {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  size: number;
  color: string;
}) {
  const position: Record<string, number> = {};
  if (top !== undefined) position.top = top;
  if (left !== undefined) position.left = left;
  if (right !== undefined) position.right = right;
  if (bottom !== undefined) position.bottom = bottom;

  return {
    type: "div",
    props: {
      style: {
        position: "absolute",
        ...position,
        width: size,
        height: size,
        display: "flex",
        borderRadius: 9999,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      },
    },
  };
}

function buildTree({ title, categoryName }: CoverInput) {
  const titleFontSize = title.length > 60 ? 50 : title.length > 40 ? 58 : 68;

  return {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: `linear-gradient(135deg, ${COLORS.ink900} 0%, ${COLORS.brand600} 55%, ${COLORS.accent500} 100%)`,
        fontFamily: "Inter",
      },
      children: [
        // Pozadinski sloj — sjaj u uglovima + veliki bledi brand znak, sve
        // ispod sadržaja (satori slaže decu po redosledu, kasniji je na vrhu).
        glow({ top: -140, left: -100, size: 620, color: "rgba(129,140,248,0.35)" }),
        glow({ bottom: -180, right: -120, size: 680, color: "rgba(56,189,248,0.3)" }),
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              display: "flex",
              right: 40,
              bottom: -60,
              transform: "rotate(-10deg)",
              opacity: 0.1,
            },
            children: logoMarkSvg({ size: 420, squareFill: "none", markFill: COLORS.white }),
          },
        },

        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", justifyContent: "space-between" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: 14 },
                  children: [
                    logoMarkSvg({
                      size: 40,
                      squareFill: "rgba(255,255,255,0.18)",
                      markFill: COLORS.white,
                    }),
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
                  ],
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
            style: { display: "flex", flexDirection: "column" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    width: 64,
                    height: 5,
                    borderRadius: 999,
                    background: COLORS.white,
                    opacity: 0.55,
                    marginBottom: 28,
                  },
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
