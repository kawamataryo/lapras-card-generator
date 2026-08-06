type Theme = {
  icon: {
    first: string
    second: string
  },
  background: {
    first: string
    second: string
  }
}

type Score = {
  eScore: number
  bScore: number
  iScore: number
}

type TechScore = {
  eScore: number
  topPercentile?: number
  githubScore?: number
  techArticleScore?: number
  techEventScore?: number
  tagCountScore?: number
}

type Language = 'ja' | 'en'

type CardType = 'score' | 'tech'
