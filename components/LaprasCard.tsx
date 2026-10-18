import { generateScoreCardSvg } from '../lib/generateScoreCardSvg'
import { generateTechCardSvg } from '../lib/generateTechCardSvg'
import { useContext, useEffect } from 'react'
import { MessageContext } from '../context/message'

type Props = {
  cardType: CardType
  score: Score
  techScore: TechScore
  theme: Theme
  lang: Language
}

const LaprasCard = ({ cardType, score, techScore, theme, lang }: Props) => {
  const svg = cardType === 'tech'
    ? generateTechCardSvg({ score: techScore, theme, isAnimation: false, lang, rounded: true })
    : generateScoreCardSvg({ score, theme, isAnimation: false, lang, rounded: true })
  const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const ctx = useContext(MessageContext);

  const {message, setMessage} = ctx
  useEffect(() => {
    if (!message) return
    const timerId = setTimeout(() => setMessage(''), 1500)
    return () => clearTimeout(timerId)
  }, [message, setMessage])

  return (
    <div className="relative">
      <img src={imageUrl} alt=""/>
      <div className={`${message ? 'opacity-100' : 'opacity-0'} absolute w-full h-full backdrop-blur-md top-0 grid place-content-center rounded-box border border-transparent transition-opacity duration-200`}>
        <span className="drop-shadow-md	text-white text-xl flex gap-2 items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {message}
          </span>
      </div>
    </div>
  )
}

export default LaprasCard
