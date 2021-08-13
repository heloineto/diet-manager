import type { AppProps } from 'next/app';

import '../styles/globals.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ReactOutlineManager from 'react-outline-manager';

import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const userData = useUserData();

  return (
    <ReactOutlineManager toggle={true}>
      {/* <UserContext.Provider value={userData}> */}
      <Component {...pageProps} />
      {/* </UserContext.Provider> */}
    </ReactOutlineManager>
  );
};

export default MyApp;
