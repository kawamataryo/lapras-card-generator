import NextHead from "next/head";

type Props = {
  urlQuery: string
}

const Head = ({ urlQuery }: Props) => {
  return (
    <NextHead>
      <title>LAPRAS Card Generator</title>
      <meta name="description" content="LAPRAS Card Generator" ></meta>
      <meta property="og:title" content="LAPRAS Card Generator"></meta>
      <meta
        property="og:description"
        content="generate your LAPRAS score card"
      >
      </meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta property="twitter:domain" content="lapras-card-generator.vercel.app"></meta>
      <meta property="twitter:url" content="https://lapras-card-generator.vercel.app/"></meta>
      <meta name="twitter:title" content="Lapras Card Generator"></meta>
      <meta name="twitter:description" content="generate your LAPRAS score card"></meta>
      <meta name="twitter:image" content={`https://lapras-card-generator.vercel.app/api/png${urlQuery}`}></meta>
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
  </NextHead>
  );
};

export default Head;
