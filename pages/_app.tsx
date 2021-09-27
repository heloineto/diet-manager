import type { AppProps } from 'next/app';

import 'tailwindcss/tailwind.css';

import { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { UserContext } from '@lib/context';
import { useTitle, useUserData } from '@lib/hooks';
import theme from '@lib/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const title = useTitle();
  const userData = useUserData();

  /**
   * Removing the server side injected CSS to make material-ui work with
   * server-side generation
   */
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <UserContext.Provider value={userData}>
          <Head>
            <title>{title}</title>
          </Head>
          <Component {...pageProps} />
        </UserContext.Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default MyApp;
