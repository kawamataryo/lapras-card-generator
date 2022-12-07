import { generateScoreCardSvg } from '../lib/generateScoreCardSvg'
import { useContext, useEffect, useState } from 'react'
import { MessageContext } from '../context/message'
import { useDidUpdateEffect } from '../lib/useDidUpdateEffect'

type Props = {
  score: Score
  theme: Theme
  lang: Language
}

let timerId: ReturnType<typeof setTimeout>

const LaprasCard = ({ score, theme, lang }: Props) => {
  const svg = generateScoreCardSvg({ score, theme, isAnimation: false, lang, rounded: true })
  const buff = Buffer.from(svg);
  const base64data = buff.toString('base64');
  const ctx = useContext(MessageContext);

  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')

  const handleShowMessage = async () => {
    if(timerId) {
      clearTimeout(timerId)
    }
    setCurrentMessage(ctx.message)
    setShowMessage(true)
    timerId = setTimeout(() => {
      setShowMessage(false)
      ctx.setMessage('')
    }, 1500)
  }

  useEffect(() => {
      if(ctx.message) {
        handleShowMessage()
      }
  }, [ctx])

  return (
    <div className="relative">
      <img src={`data:image/svg+xml;base64,${base64data}`} alt=""/>
      <div className={`${showMessage ? 'opacity-100' : 'opacity-0'} absolute w-full h-full backdrop-blur-md top-0 grid place-content-center rounded-box border border-transparent transition-opacity duration-200`}>
        <span className="drop-shadow-md	text-white text-xl flex gap-2 items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {currentMessage}
          </span>
      </div>
    </div>
  )
}

export default LaprasCard
