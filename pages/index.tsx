import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import router from "next/router";
import React from "react";
import {
  useEffect,
  useState,
} from "react";
import Controller from "../components/Controller";
import GitHubLink from "../components/GitHubLink";
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
      <Head>
        <title>LAPRAS Card Generator</title>
        <meta property="og:title" content="LAPRAS Card Generator"></meta>
        <meta
          property="og:description"
          content="generate your LAPRAS score card"
        >
        </meta>
        <meta
          property="og:image"
          content={`https://lapras-card-generator.vercel.app/api/png${urlQuery}`}
        >
        </meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <div className="absolute right-5 sm:top-5 bottom-5"><GitHubLink /></div>
      <div className="container m-auto grid place-content-center place-items-center h-[100svh] px-5">
        <h1 className="absolute top-5 left-5  text-2xl flex items-center gap-1 text-2xl">
        <svg className="x-8 w-8 font-extrabold bg-clip-text bg-gradient-to-r text-blue-800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16m-9 9H9v2h2v-2m8 0h-6v2h6v-2M7 9H5v2h2V9m12 0H9v2h10V9Z"/></svg>
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-600 ">LAPRAS Card Generator</span>
        </h1>
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
