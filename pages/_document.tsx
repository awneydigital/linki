import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="awney">
      <Head>
        <meta name="theme-color" content="#146ef5" />
        <link rel="icon" type="image/svg+xml" href="/awney-mark.svg" />
        <link rel="apple-touch-icon" href="/awney-mark.svg" />
      </Head>
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
