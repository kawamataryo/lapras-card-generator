import { useTheme } from "next-themes";
import Head from "next/head";

type Props = {
  urlQuery: string;
}

const Header = ({ urlQuery }: Props) => {
  const { theme, setTheme } = useTheme();

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <div className="absolute top-0 w-full  p-5 text-2xl flex items-center justify-between text-2xl">
        <h1 className="flex items-center gap-2">
          <svg
            className="x-8 w-8 font-extrabold bg-clip-text bg-gradient-to-r text-blue-800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16m-9 9H9v2h2v-2m8 0h-6v2h6v-2M7 9H5v2h2V9m12 0H9v2h10V9Z"
            />
          </svg>
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-600 ">
            LAPRAS Card Generator
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className=" text-gray-700 hover:text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 dark:hover:text-gray-200 transition-all">
            { theme === 'dark' ? <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> : <svg className="w-8 h-8" fill="none" stroke="#64748b" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }
          </button>
          <a className=" text-gray-700 hover:text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 dark:hover:text-gray-200 transition-all" href="https://github.com/kawamataryo/lapras-card-generator" target="_blank" rel="noopener noreferrer">
            <svg className="w-8 h-8"xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;