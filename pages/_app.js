import Head from 'next/head';
import '../styles/globals.css';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '../components/component-provider';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Aayush Iyer</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
    <MDXProvider components={mdxComponents}>
      <main>
        <div className="mx-auto px-6 py-10 max-w-5xl">
          <Component {...pageProps} />
        </div>
      </main>
    </MDXProvider>
  </>
);
export default App;
