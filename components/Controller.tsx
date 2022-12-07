import { ChangeEvent, useState } from "react";
import { LANGUAGES, PRESET_COLORS } from "../const";
import { Popover, Menu } from "@headlessui/react";
import ExportBtn from "./ExportBtn";

type Props = {
  themeColor: Theme;
  score: Score;
  urlQuery: string
  lang: 'ja' | 'en'
  setThemeColor: (theme: Theme) => void;
  setScore: (score: Score) => void;
  setLang: (lang: 'ja' | 'en') => void
};

const Controller = ({ score, setScore, urlQuery, setThemeColor, themeColor, lang, setLang }: Props) => {
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
      className="border border-gray-600 drop-shadow-sm flex flex-wrap sm:min-w-fit w-full md:gap-5 justify-between gap-2 gap-y-4 preview rounded-md items-center bg-cover bg-top py-4 px-5"
      style={{ backgroundSize: "5px 5px" }}
    >
      <div>
        <label className="block text-xs font-bold text-gray-500">Base</label>
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
      <div>
        <label className="block text-xs font-bold text-gray-500">Icon</label>
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
      <div className="">
        <label className="block text-xs font-bold text-gray-500">Score</label>
        <div className="flex gap-2 mt-2">
          <input
            name="eScore"
            type="number"
            max="5.00"
            min="0"
            step="0.01"
            value={score.eScore}
            onChange={handleScoreChange}
            className="input input-bordered input-xs rounded-sm pr-0"
          />
          <input
            name="bScore"
            type="number"
            max="5.00"
            min="0"
            step="0.01"
            value={score.bScore}
            onChange={handleScoreChange}
            className="input input-bordered input-xs rounded-sm pr-0"
          />
          <input
            name="iScore"
            type="number"
            max="5.00"
            min="0"
            step="0.01"
            value={score.iScore}
            onChange={handleScoreChange}
            className="input input-bordered input-xs rounded-sm pr-0"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500">Lang</label>
        <div className="inline-flex rounded-md shadow-sm mt-2" role="group">
          <button type="button" className={`py-[2px] px-4 text-xs focus:z-10 border-gray-600 bg-gray-${ lang == LANGUAGES.JA ? '600 text-gray-200' : '700 hover:text-white hover:bg-gray-600'} border rounded-l-sm transition-all`} onClick={() => setLang('ja')}>
            Ja
          </button>
          <button type="button" className={`py-[2px] px-4 text-xs  focus:z-10 border-gray-600 bg-gray-${ lang == LANGUAGES.EN ? '600 text-gray-200' : '700 hover:text-white hover:bg-gray-600'} border rounded-r-sm transition-all`} onClick={() => setLang('en')}>
            En
          </button>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500">Preset</label>
        <div className="flex gap-1 mt-2">
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-gray-600 to-gray-800 border border-gray-500"
            onClick={() => setPresetTheme("black")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-cyan-700 to-blue-900 border border-gray-500"
            onClick={() => setPresetTheme("blue")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-green-600 to-lime-900 border border-gray-500"
            onClick={() => setPresetTheme("green")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-pink-300 to-red-400 border border-gray-500"
            onClick={() => setPresetTheme("pink")}
          />
          <button
            id="input-color"
            className="rounded-full h-5 w-5 bg-gradient-to-r from-gray-300 to-gray-800 border border-gray-500"
            onClick={() => setPresetTheme("gray")}
          />
        </div>
      </div>
      <div>
        <ExportBtn score={score} theme={themeColor} lang={lang} urlQuery={urlQuery}/>
      </div>
    </div>
  );
};

export default Controller;
