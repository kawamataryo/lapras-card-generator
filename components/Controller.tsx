import { ChangeEvent, useState } from "react";
import { LANGUAGES, PRESET_COLORS } from "../const";
import ExportBtn from "./ExportBtn";

type Props = {
  themeColor: Theme;
  username: string;
  score: Score;
  urlQuery: string
  lang: 'ja' | 'en'
  setThemeColor: (theme: Theme) => void;
  setUsername: (username: string) => void;
  setScore: (score: Score) => void;
  setLang: (lang: 'ja' | 'en') => void
};

const Controller = ({ username, setUsername, score, setScore, urlQuery, setThemeColor, themeColor, lang, setLang }: Props) => {
  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: _value } = e.target
    const value = Number(_value)

    switch (name) {
      case 'eScore':
        setScore({ ...score, eScore: value})
        break
      case 'bScore':
        setScore({ ...score, bScore: value})
        break
      case 'iScore':
        setScore({ ...score, iScore: value})
        break
    }
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value) {
      setScore({ eScore: 0, bScore: 0, iScore: 0 })
      return
    }
    setUsername(`${value}`)
    fetch(`/api/profile?username=${value}`)
      .then(res => res.json())
      .then(data => {
        setScore({
          eScore: data.e_score || 0,
          bScore: data.b_score || 0,
          iScore: data.i_score || 0,
        })
      })
      .catch(() => {
        setScore({ eScore: 0, bScore: 0, iScore: 0 })
      })
  }

  const handleThemeChange = (name: string, color: string) => {
    switch (name) {
      case 'iconFirst':
        setThemeColor({ ...themeColor, icon: { ...themeColor.icon, first: color } })
        break
      case 'iconSecond':
        setThemeColor({ ...themeColor, icon: { ...themeColor.icon, second: color } })
        break
      case 'backgroundFirst':
        setThemeColor({ ...themeColor, background: { ...themeColor.background, first: color } })
        break
      case 'backgroundSecond':
        setThemeColor({ ...themeColor, background: { ...themeColor.background, second: color } })
        break
    }
  }

  const setPresetTheme = (preset: string) => {
    switch (preset) {
      case 'blue':
        setThemeColor(PRESET_COLORS.BLUE)
        return
      case 'black':
        setThemeColor(PRESET_COLORS.BLACK)
        return
      case 'pink':
        setThemeColor(PRESET_COLORS.PINK)
        return
      case 'green':
        setThemeColor(PRESET_COLORS.GREEN)
        return
      case 'gray':
        setThemeColor(PRESET_COLORS.GRAY)
    }
  }

  return (
    <div
      className="border bg-gray-200 dark:bg-gray-800 dark:border-gray-600 drop-shadow-sm flex flex-wrap sm:min-w-fit w-full md:gap-5 justify-start gap-2 gap-y-4 rounded-md items-center py-4 px-5 shadow"
      style={{ backgroundSize: "5px 5px" }}
    >
      <div className="basis-[60px]">
        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400">Base</label>
        <div className="flex gap-1 mt-1">
          <input
            id="input-color"
            type="color"
            className="color-picker"
            value={themeColor.background.first}
            onChange={(event) =>
              handleThemeChange("backgroundFirst", event.target.value)}
          >
          </input>
          <input
            id="input-color"
            type="color"
            className="color-picker"
            value={themeColor.background.second}
            onChange={(event) =>
              handleThemeChange("backgroundSecond", event.target.value)}
          >
          </input>
        </div>
      </div>
      <div className="basis-[60px]">
        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400">Icon</label>
        <div className="flex gap-1 mt-1">
          <input
            id="input-color"
            type="color"
            className="color-picker"
            value={themeColor.icon.first}
            onChange={(event) =>
              handleThemeChange("iconFirst", event.target.value)}
          >
          </input>
          <input
            id="input-color"
            type="color"
            className="color-picker"
            value={themeColor.icon.second}
            onChange={(event) =>
              handleThemeChange("iconSecond", event.target.value)}
          >
          </input>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400">Username or Score</label>
        <div className="flex gap-2 mt-2 text-gray-700 dark:text-gray-100">
          <input
            name="eScore"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="input input-bordered bg-gray-100 dark:bg-gray-800 input-xs rounded-sm pr-0"
          />
          or
          <input
            name="eScore"
            type="number"
            max="5.00"
            min="0"
            step="0.01"
            value={score.eScore}
            onChange={handleScoreChange}
            className="input input-bordered bg-gray-100 dark:bg-gray-800 input-xs rounded-sm pr-0"
          />
          <input
            name="bScore"
            type="number"
            max="5.00"
            min="0"
            step="0.01"
            value={score.bScore}
            onChange={handleScoreChange}
            className="input input-bordered bg-gray-100 dark:bg-gray-800 input-xs rounded-sm pr-0"
          />
          <input
            name="iScore"
            type="number"
            max="5.00"
            min="0"
            step="0.01"
            value={score.iScore}
            onChange={handleScoreChange}
            className="input input-bordered bg-gray-100 dark:bg-gray-800 input-xs rounded-sm pr-0"
          />
        </div>
      </div>
      <div className="basis-[91px]">
        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400">Lang</label>
        <div className="flex rounded-md shadow-sm mt-2" role="group">
          <button type="button" className={`py-[2px] px-4 text-xs focus:z-10 ${ lang == LANGUAGES.JA ? 'bg-gray-400 text-gray-100 dark:bg-gray-500 dark:text-gray-200' : 'bg-gray-100 text-gray-800 hover:bg-slate-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'} rounded-l-sm transition-all`} onClick={() => setLang('ja')}>
            Ja
          </button>
          <button type="button" className={`py-[2px] px-4 text-xs  focus:z-10 ${ lang == LANGUAGES.EN ? 'bg-gray-400 text-gray-100 dark:bg-gray-500 dark:text-gray-200' : 'bg-gray-100 text-gray-800 hover:bg-slate-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'} rounded-r-sm transition-all`} onClick={() => setLang('en')}>
            En
          </button>
        </div>
      </div>
      <div className="basis-[116px] grow">
        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400">Preset</label>
        <div className="flex gap-1 mt-2">
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-gray-600 to-gray-800 border border-white dark:border-gray-500"
            onClick={() => setPresetTheme("black")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-cyan-700 to-blue-900 border border-white dark:border-gray-500"
            onClick={() => setPresetTheme("blue")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-green-600 to-lime-900 border border-white dark:border-gray-500"
            onClick={() => setPresetTheme("green")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-pink-300 to-red-400 border border-white dark:border-gray-500"
            onClick={() => setPresetTheme("pink")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-gray-300 to-gray-800 border border-white dark:border-gray-500"
            onClick={() => setPresetTheme("gray")}
          />
        </div>
      </div>
      <div className="grow">
        <ExportBtn score={score} theme={themeColor} lang={lang} urlQuery={urlQuery}/>
      </div>
    </div>
  );
};

export default Controller;
