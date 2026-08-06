import { NextApiHandler } from "next"
import { generateScoreCardSvg } from "../../lib/generateScoreCardSvg"
import { generateTechCardSvg } from "../../lib/generateTechCardSvg"
import sharp from "sharp"

const handler: NextApiHandler = async (req, res) => {
  const { type, e, b, i, ep, g, ta, te, tg, b1, b2, i1, i2, l} = req.query
      const cardType = (type === 'tech' ? 'tech' : 'score') as CardType
      const theme = {
        icon: {
          first: i1 ? decodeURIComponent(String(i1)) : "#030E21",
          second: i2 ? decodeURIComponent(String(i2)) : "#1688BF",
        },
        background: {
          first: b1 ? decodeURIComponent(String(b1)) : "#020E27",
          second: b2 ? decodeURIComponent(String(b2)) : "#0E5593",
        },
      }
      const lang = (l ? String(l) : 'ja') as Language

  const svg = cardType === 'tech'
    ? generateTechCardSvg({
        score: {
          eScore: e !== undefined ? Number(e) : 4.22,
          topPercentile: ep !== undefined ? Number(ep) : undefined,
          githubScore: g !== undefined ? Number(g) : undefined,
          techArticleScore: ta !== undefined ? Number(ta) : undefined,
          techEventScore: te !== undefined ? Number(te) : undefined,
          tagCountScore: tg !== undefined ? Number(tg) : undefined,
        },
        theme,
        isAnimation: false,
        lang,
        rounded: true,
      })
    : generateScoreCardSvg({
        score: {
          eScore: e ? Number(e) : 4.22,
          iScore: i ? Number(i) : 3.51,
          bScore: b ? Number(b) : 2.28,
        },
        theme,
        isAnimation: false,
        lang,
        rounded: true,
      })
  const buffer = await sharp(Buffer.from(svg, 'utf-8')).toBuffer()
  res
    .status(200)
    .setHeader("Content-Type", "image/png")
    .setHeader("Content-Length", buffer.length)
    .send(buffer)
}

export default handler
