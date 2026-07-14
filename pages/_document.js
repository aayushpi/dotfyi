import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Pin the browser chrome to the page background so the coral sweep
            veil never tints iOS Safari's top/bottom bars. ThemeToggle keeps
            this in sync when the theme changes. Default is the light bg. */}
        <meta name="theme-color" content="#fce2e0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

