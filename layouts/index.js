import Head from 'next/head';

const Layout = ({ children, meta }) => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <div>{children}</div>;
    </>
  );
};
export default Layout;
