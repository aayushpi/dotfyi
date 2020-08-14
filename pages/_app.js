import Head from 'next/head';
import { StylingGlobals, styled, ThemeProvider, css } from '@twilio-paste/styling-library';
import { pasteBaseStyles } from '@twilio-paste/theme';
import { Box } from '@twilio-paste/core';
import { PortfolioTheme } from '../theme';
import { ComponentProvider } from '../components/component-provider';
const StyledBase = styled(Box)(pasteBaseStyles);
const globalStyles = (props) =>
  css({
    html: {
      fontSize: '100%',
      height: `100%`,
      backgroundColor: `colorBackgroundBrand`
    },
    body: {
      margin: 0,
      fontSize: 'fontSize30',
    },
  })(props);
const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Aayush Iyer</title>
      <link
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>:nerd_face:</text></svg>"
        rel="icon"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;756;900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ComponentProvider>
      <ThemeProvider theme={PortfolioTheme}>
      <StylingGlobals styles={globalStyles({ theme: PortfolioTheme })} />
        <StyledBase
          as="main"
          marginLeft={['space50', 'space50', 'auto']}
          marginRight={['space50', 'space50', 'auto']}
          marginTop={['space30', 'space30', 'space200']}
          maxWidth="size200"
        >
          <Component {...pageProps} />
        </StyledBase>
      </ThemeProvider>
    </ComponentProvider>
  </>
);
export default App;