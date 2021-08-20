import type { AppProps } from 'next/app';

import '../styles/globals.css';

import { useEffect } from 'react';
import { TextField, ThemeProvider } from '@material-ui/core';
import ReactOutlineManager from 'react-outline-manager';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';
import theme from '@lib/theme';

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <UserContext.Provider value={userData}>
            <Component {...pageProps} />
          </UserContext.Provider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ReactOutlineManager>
  );
};

export default MyApp;
