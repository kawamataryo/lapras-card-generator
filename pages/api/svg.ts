import { NextApiHandler } from "next"
import { LANGUAGES } from "../../const"
import { generateScoreCardSvg } from "../../lib/generateScoreCardSvg"
import { generateTechCardSvg } from "../../lib/generateTechCardSvg"

const handler: NextApiHandler = async (req, res) => {
  let { type, e, b, i, ep, g, ta, te, tg, b1, b2, i1, i2, l, u} = req.query
      let cardType = (type === 'tech' ? 'tech' : 'score') as CardType
      if (u) {
        await fetch(`https://lapras.com/public/${u}.json`)
          .then(res => res.json())
          .then(data => {
            e = data.e_score || 0,
            b = data.b_score || 0,
            i = data.i_score || 0
            if (cardType === 'tech') {
              const details = data.e_score_details
              if (!details) {
                // e_score_details isn't served for this profile (feature not
                // enabled yet), fall back to the existing score card so we
                // don't render a tech card with all-empty breakdown values.
                cardType = 'score'
              } else {
                ep = details.invert_e_score_percentile
                g = details.github_score
                ta = details.tech_article_score
                te = details.tech_event_score
                tg = details.tag_count_score
              }
            }
          })
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

  if (cardType === 'tech') {
    const techScore: TechScore = {
      eScore: e !== undefined ? Number(e) : 4.22,
      topPercentile: ep !== undefined ? Number(ep) : undefined,
      githubScore: g !== undefined ? Number(g) : undefined,
      techArticleScore: ta !== undefined ? Number(ta) : undefined,
      techEventScore: te !== undefined ? Number(te) : undefined,
      tagCountScore: tg !== undefined ? Number(tg) : undefined,
    }
    const svg = generateTechCardSvg({ score: techScore, theme, isAnimation: true, lang, rounded: true })
    res
      .status(200)
      .setHeader("Content-Type", "image/svg+xml")
      .send(svg)
    return
  }

  const score = {
    eScore: e ? Number(e) : 4.22,
    iScore: i ? Number(i) : 3.51,
    bScore: b ? Number(b) : 2.28,
  }
  const svg = generateScoreCardSvg({ score, theme, isAnimation: true, lang, rounded: true })
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(svg)
}

export default handler
