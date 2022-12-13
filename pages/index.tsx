import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import router from "next/router";
import React from "react";
import {
  useEffect,
  useState,
} from "react";
import Controller from "../components/Controller";
import Header from "../components/Header";
import LaprasCard from "../components/LaprasCard";
import { MessageContext, useMessageCtx } from "../context/message";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home(
  {
    initialScore,
    initialTheme,
    initialLang,
  }: Props,
) {
  const [score, setScore] = useState<Score>(initialScore);
  const [themeColor, setThemeColor] = useState<Theme>(initialTheme);
  const [lang, setLang] = useState<Language>(initialLang)

  const urlQuery = `?e=${score.eScore}&b=${score.bScore}&i=${score.iScore}&b1=${encodeURIComponent(themeColor.background.first)}&b2=${encodeURIComponent(themeColor.background.second)}&i1=${encodeURIComponent(themeColor.icon.first)}&i2=${encodeURIComponent(themeColor.icon.second)}&l=${lang}`;

  const messageCtx =  useMessageCtx()

  useEffect(() => {
    router.push(`/${urlQuery}`, undefined, { shallow: true });
  }, [score, themeColor, urlQuery]);

  return (
    <>
      <div className="container m-auto grid place-content-center place-items-center h-[100vh] px-5">
        <Header urlQuery={urlQuery}></Header>
        <MessageContext.Provider value={messageCtx}>
          <div className="max-w-[400px] drop-shadow-sm">
            <LaprasCard score={score} theme={themeColor} lang={lang} />
          </div>
          <div className="mt-16">
            <Controller
              score={score}
              setScore={setScore}
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
  const { e, b, i, b1, b2, i1, i2, l } = query;

  return {
    props: {
      initialScore: {
        eScore: e ? Number(e) : 4.22,
        bScore: b ? Number(b) : 3.51,
        iScore: i ? Number(i) : 2.28,
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
