import type { AppProps } from 'next/app';

import '../styles/globals.css';

import { ThemeProvider } from '@material-ui/core';
import ReactOutlineManager from 'react-outline-manager';

import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';
import theme from '@lib/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const userData = useUserData();

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
