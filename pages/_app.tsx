import type { AppProps } from 'next/app';

import '../styles/globals.css';

import { ThemeProvider } from '@material-ui/core';
import ReactOutlineManager from 'react-outline-manager';

import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';
import theme from '@lib/theme';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const userData = useUserData();

  /**
   * Removing the server side injected CSS to make material-ui work with
   * server-side generation
   */
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement)
      jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <ReactOutlineManager toggle={true}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={userData}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </ReactOutlineManager>
  );
};

export default MyApp;
