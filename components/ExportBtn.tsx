import { Popover } from "@headlessui/react";
import { useContext } from "react";
import { LANG_TEXT } from "../const";
import { MessageContext } from "../context/message";

type Props = {
  score: Score
  theme: Theme
  lang: Language
  urlQuery: string
}

const ExportBtn = ({ score, theme, lang, urlQuery } : Props) => {
  const copyToClipboard = async (item: string | ClipboardItem) => {
    if (item instanceof ClipboardItem) {
      await navigator.clipboard.write([item])
    } else {
      await navigator.clipboard.writeText(item)
    }
  }

  const ctx = useContext(MessageContext);

  const copyUrl = async () => {
    await copyToClipboard(location.href)
    ctx.setMessage('Copied URL!')
  }

  const copySvgUrl = async () => {
    await copyToClipboard(`https://lapras-card-generator.vercel.app/api/svg${urlQuery}`)
    ctx.setMessage('Copied SVG Image URL!')
  }

  const copyImage = async () => {
    ctx.setMessage('Copied Image!')
    const imageData = await fetch(`/api/png${urlQuery}`)
    const blob = await imageData.blob()
    copyToClipboard(new ClipboardItem({[blob.type]: blob}))
  }

  const copyActionsParam = async () => {
    copyToClipboard(`
SHARE_ID: <YOUR_SHARE_ID>
ICON_FIRST: "${theme.icon.first}"
ICON_SECOND: "${theme.icon.second}"
BACKGROUND_FIRST: "${theme.background.first}"
BACKGROUND_SECOND: "${theme.background.second}"
LANG: "${lang}"
`.trim())
    ctx.setMessage('Copied Actions Params!')
  }

  const shareOnTwitter = async () => {
    const description = `LAPRAS SCORE
${LANG_TEXT[lang].engineering}: ${score.eScore} / ${LANG_TEXT[lang].business}: ${score.bScore} /${LANG_TEXT[lang].influence}: ${score.iScore}

${location.href}

`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(description)}&hashtags=${encodeURIComponent("lapras_card")}`,
      'twwindow',
      'width=550, height=700, personalbar=0, toolbar=0, scrollbars=1'
    )
  }

  return (
    <Popover className="relative">
      <Popover.Button className="flex justify-center items-center gap-1 rounded-md  transition-colors py-3 px-4 text-xs bg-gradient-to-r from-blue-900 to-cyan-700 text-white border-transparent">
            Export
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
      </Popover.Button>
      <Popover.Panel className="absolute z-10 mt-5 right-0 top-[27px]">
        <ul className="bg-gray-100 text-gray-900 dark:text-gray-300 dark:bg-base-200 p-2 rounded-md border dark:border-gray-600 border-gray-300 drop-shadow-sm w-[180px]">
          <li className="text-xs p-1 cursor-pointer flex gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md" onClick={copyUrl}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            Copy URL
          </li>
          <li className="text-xs p-1 cursor-pointer flex gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md" onClick={copySvgUrl}>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M1 1.5A1.5 1.5 0 0 1 2.5 0h8.207L14 3.293V13.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 13.5v-12ZM5 6H2v3h2v1H2v1h3V8H3V7h2V6Zm2 0H6v3.707l1.5 1.5l1.5-1.5V6H8v3.293l-.5.5l-.5-.5V6Zm3 0h3v1h-2v3h1V8.5h1V11h-3V6Z" clip-rule="evenodd"/></svg>
            Copy SVG URL
          </li>
          <li className="text-xs p-1 cursor-pointer flex gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md" onClick={copyImage}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Copy Image
          </li>
          <li className="text-xs p-1 cursor-pointer flex gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md" onClick={copyActionsParam}>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
            Copy Actions Params
          </li>
          <li className="text-xs p-1 cursor-pointer flex gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md" onClick={shareOnTwitter}>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.3 5.55a2.9 2.9 0 0 0-2.9 2.847l-.028 1.575a.6.6 0 0 1-.68.583l-1.561-.212c-2.054-.28-4.022-1.226-5.91-2.799c-.598 3.31.57 5.603 3.383 7.372l1.747 1.098a.6.6 0 0 1 .034.993L7.793 18.17c.947.059 1.846.017 2.592-.131c4.718-.942 7.855-4.492 7.855-10.348c0-.478-1.012-2.141-2.94-2.141zm-4.9 2.81a4.9 4.9 0 0 1 8.385-3.355c.711-.005 1.316.175 2.669-.645c-.335 1.64-.5 2.352-1.214 3.331c0 7.642-4.697 11.358-9.463 12.309c-3.268.652-8.02-.419-9.382-1.841c.694-.054 3.514-.357 5.144-1.55C5.16 15.7-.329 12.47 3.278 3.786c1.693 1.977 3.41 3.323 5.15 4.037c1.158.475 1.442.465 1.973.538z"/></svg>
            Share on Twitter
          </li>
        </ul>
      </Popover.Panel>
    </Popover>
  )
}

export default ExportBtn
