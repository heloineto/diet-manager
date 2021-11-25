import 'tailwindcss/tailwind.css';

import { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { UserContext } from '@lib/context';
import { useTitle, useUserData } from '@lib/hooks';
import theme from '@lib/theme';
import NoAutoCompleteBackground from '@components/styled-jsx/NoAutoCompleteBackground';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const title = useTitle();
  const userData = useUserData();

  /**
   * Removing the server side injected CSS to make material-ui work with
   * server-side generation
   */
  useEffect(() => document.getElementById('jss-server-side')?.remove(), []);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <UserContext.Provider value={userData}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
            <title>{title}</title>
          </Head>
          <NoAutoCompleteBackground />
          <Component {...pageProps} />
        </UserContext.Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default MyApp;
