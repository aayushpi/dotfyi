import Head from 'next/head';
import '../styles/globals.css';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '../components/component-provider';
import ThemeToggle from '../components/ThemeToggle';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Aayush Iyer</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
    <MDXProvider components={mdxComponents}>
      <ThemeToggle />
      <main>
        <div className="px-6 lg:px-0 pt-6 md:pt-4 lg:pt-[5.25rem] pb-16">
          <Component {...pageProps} />
        </div>
      </main>
    </MDXProvider>
  </>
);
export default App;
