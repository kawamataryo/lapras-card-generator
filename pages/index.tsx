import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import router from "next/router";
import React from "react";
import {
  useEffect,
  useState,
} from "react";
import Controller from "../components/Controller";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu";
import LaprasCard from "../components/LaprasCard";
import { MessageContext, useMessageCtx } from "../context/message";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home(
  {
    initialCardType,
    initialScore,
    initialTechScore,
    initialTheme,
    initialLang,
  }: Props,
) {
  const [cardType, setCardType] = useState<CardType>(initialCardType);
  const [score, setScore] = useState<Score>(initialScore);
  const [techScore, setTechScore] = useState<TechScore>(initialTechScore);
  const [techDetailsNote, setTechDetailsNote] = useState<string>("");
  const [themeColor, setThemeColor] = useState<Theme>(initialTheme);
  const [lang, setLang] = useState<Language>(initialLang)
  const [username, setUsername] = useState<string>("");

  const themeQuery = `b1=${encodeURIComponent(themeColor.background.first)}&b2=${encodeURIComponent(themeColor.background.second)}&i1=${encodeURIComponent(themeColor.icon.first)}&i2=${encodeURIComponent(themeColor.icon.second)}`;
  const urlQuery = cardType === 'tech'
    ? `?${[
        'type=tech',
        `e=${techScore.eScore}`,
        techScore.topPercentile !== undefined ? `ep=${techScore.topPercentile}` : null,
        techScore.githubScore !== undefined ? `g=${techScore.githubScore}` : null,
        techScore.techArticleScore !== undefined ? `ta=${techScore.techArticleScore}` : null,
        techScore.techEventScore !== undefined ? `te=${techScore.techEventScore}` : null,
        techScore.tagCountScore !== undefined ? `tg=${techScore.tagCountScore}` : null,
        themeQuery,
        `l=${lang}`,
        `u=${username}`,
      ].filter((part): part is string => part !== null).join('&')}`
    : `?e=${score.eScore}&b=${score.bScore}&i=${score.iScore}&${themeQuery}&l=${lang}&u=${username}`;

  const messageCtx =  useMessageCtx()

  useEffect(() => {
    router.push(`/${urlQuery}`, undefined, { shallow: true });
  }, [cardType, score, techScore, themeColor, urlQuery]);

  return (
    <>
      <Head urlQuery={urlQuery}/>
      <div className="m-auto grid place-content-center place-items-center h-[100vh] px-5">
        <HeaderMenu />
        <MessageContext.Provider value={messageCtx}>
          <div className="max-w-[400px] drop-shadow-sm">
            <LaprasCard cardType={cardType} score={score} techScore={techScore} theme={themeColor} lang={lang} />
          </div>
          <div className="mt-16">
            <Controller
              username={username}
              setUsername={setUsername}
              score={score}
              setScore={setScore}
              techScore={techScore}
              setTechScore={setTechScore}
              cardType={cardType}
              setCardType={setCardType}
              techDetailsNote={techDetailsNote}
              setTechDetailsNote={setTechDetailsNote}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              urlQuery={urlQuery}
              lang={lang}
              setLang={setLang}
            />
          </div>
        </MessageContext.Provider>
      </div>
    </>
  );
}
export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { type, e, b, i, ep, g, ta, te, tg, b1, b2, i1, i2, l } = query;
  const cardType = (type === 'tech' ? 'tech' : 'score') as CardType;

  return {
    props: {
      initialCardType: cardType,
      initialScore: {
        eScore: e ? Number(e) : 4.22,
        bScore: b ? Number(b) : 3.30,
        iScore: i ? Number(i) : 2.28,
      },
      initialTechScore: {
        eScore: e ? Number(e) : 4.22,
        topPercentile: ep !== undefined ? Number(ep) : 8.00,
        githubScore: g !== undefined ? Number(g) : 3.50,
        techArticleScore: ta !== undefined ? Number(ta) : 2.80,
        techEventScore: te !== undefined ? Number(te) : 1.50,
        tagCountScore: tg !== undefined ? Number(tg) : 4.00,
      },
      initialTheme: {
        background: {
          first: b1 ? decodeURIComponent(String(b1)) : "#020E27",
          second: b2 ? decodeURIComponent(String(b2)) : "#0E5593",
        },
        icon: {
          first: i1 ? decodeURIComponent(String(i1)) : "#030E21",
          second: i2 ? decodeURIComponent(String(i2)) : "#1688BF",
        },
      },
      initialLang: (l ? String(l) : 'ja') as Language,
    },
  };
};
