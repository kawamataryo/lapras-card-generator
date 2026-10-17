// Generates TECH_LANG_TEXT_SVG_PATH in const.ts.
//
// The tech card labels are baked into outline SVG <path> data (instead of
// <text>) for the same reason the existing score card labels are: /api/png
// rasterizes the SVG with sharp on the server, which has no access to
// client-side web fonts, so any <text> using a Japanese font would fall back
// to a missing/garbled glyph.
//
// Usage:
//   npm i --no-save opentype.js
//   node scripts/generate-label-paths.mjs
//
// This downloads Noto Sans JP (SIL OFL, https://github.com/google/fonts) at
// a pinned commit, extracts the Bold (wght=700) instance of the variable
// font via opentype.js's variation processor, and rewrites the
// TECH_LANG_TEXT_SVG_PATH block in const.ts in place (between the
// AUTO-GENERATED marker comments). The font binary itself is never committed.

import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"
import opentype from "opentype.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONST_TS_PATH = path.join(__dirname, "..", "const.ts")

// Pinned to the last commit that touched this file, for reproducibility.
// https://github.com/google/fonts/commits/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf
const FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/295d98a7a0c17c68f1341eaeea354e7960ea70d3/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf"

const BOLD_WEIGHT = 700

// x is fixed at 35 to match the existing row label column (see
// LANG_TEXT_SVG_PATH usage in generateScoreCardSvg.ts / generateTechCardSvg.ts).
const LABEL_X = 35

// "上位" / "Top" sits on its own row (no bar) next to the 18px percentile
// number, so it is set close to that number's size. The 4 breakdown rows
// (GitHub / 技術記事 / 技術イベント / タグ個数) are one size smaller since
// they share the row with a bar as well as a number.
const LABELS = [
  { key: "top", y: 207, fontSize: 18, ja: "上位", en: "Top" },
  { key: "github", y: 240, fontSize: 15, ja: "GitHub", en: "GitHub" },
  { key: "techArticle", y: 279, fontSize: 15, ja: "技術記事", en: "Tech Articles" },
  { key: "techEvent", y: 318, fontSize: 15, ja: "技術イベント", en: "Tech Events" },
  { key: "tagCount", y: 357, fontSize: 15, ja: "タグ個数", en: "Skill Tags" },
]

const START_MARKER = "// AUTO-GENERATED: TECH_LANG_TEXT_SVG_PATH START (scripts/generate-label-paths.mjs)"
const END_MARKER = "// AUTO-GENERATED: TECH_LANG_TEXT_SVG_PATH END"

const fetchFont = async () => {
  const res = await fetch(FONT_URL)
  if (!res.ok) {
    throw new Error(`failed to download font: ${res.status} ${res.statusText}`)
  }
  const buf = await res.arrayBuffer()
  return opentype.parse(buf)
}

const buildPath = (font, text, y, fontSize) => {
  font.variation.set({ wght: BOLD_WEIGHT })
  // kerning:false works around an opentype.js bug where GPOS kerning at
  // this variable font's Bold instance mispositions/corrupts a glyph for
  // some pairs (reproduced with "Skill Tags" at wght=700 - the trailing
  // "s" glyph came out mangled with kerning on, fine with it off). Visual
  // spacing difference for these short labels is negligible.
  const d = font.getPath(text, LABEL_X, y, fontSize, { kerning: false }).toPathData(2)
  return `<path d="${d}" fill="white"/>`
}

const buildLangBlock = (font, lang) => {
  const lines = LABELS.map((label) => {
    const text = label[lang]
    const pathTag = buildPath(font, text, label.y, label.fontSize)
    return `    ${label.key}: \`${pathTag}\`,`
  })
  return `  ${lang}: {\n${lines.join("\n")}\n  },`
}

const main = async () => {
  console.log(`Fetching Noto Sans JP from ${FONT_URL}`)
  const font = await fetchFont()
  console.log(`Loaded font, numGlyphs=${font.glyphs.length}`)

  const block = [
    START_MARKER,
    "export const TECH_LANG_TEXT_SVG_PATH = {",
    buildLangBlock(font, "en"),
    buildLangBlock(font, "ja"),
    "}",
    END_MARKER,
  ].join("\n")

  const constTs = readFileSync(CONST_TS_PATH, "utf-8")
  const startIdx = constTs.indexOf(START_MARKER)
  const endIdx = constTs.indexOf(END_MARKER)
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(
      `could not find AUTO-GENERATED markers in ${CONST_TS_PATH}. Expected both "${START_MARKER}" and "${END_MARKER}".`
    )
  }
  const before = constTs.slice(0, startIdx)
  const after = constTs.slice(endIdx + END_MARKER.length)
  const updated = `${before}${block}${after}`

  writeFileSync(CONST_TS_PATH, updated)
  console.log(`Updated ${CONST_TS_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
