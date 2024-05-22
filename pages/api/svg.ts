import { NextApiHandler } from "next"
import { LANGUAGES } from "../../const"
import { generateScoreCardSvg } from "../../lib/generateScoreCardSvg"

const handler: NextApiHandler = async (req, res) => {
  let { e, b, i, b1, b2, i1, i2, l, u} = req.query
      if (u) {
        await fetch(`https://lapras.com/public/${u}.json`)
          .then(res => res.json())
          .then(data => {
            e = data.e_score || 0,
            b = data.b_score || 0,
            i = data.i_score || 0
          })
      }
      const score = {
        eScore: e ? Number(e) : 4.22,
        iScore: i ? Number(i) : 3.51,
        bScore: b ? Number(b) : 2.28,
      }
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
  const svg = generateScoreCardSvg({ score, theme, isAnimation: true, lang, rounded: true })
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(svg)
}

export default handler
