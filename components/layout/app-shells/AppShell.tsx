import type { ReactNode } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import UnauthCheck from '@components/auth/UnauthCheck';
import NavBar from '@components/navigation/NavBar';
import AuthIllustration from '@components/decoration/AuthIllustration';
import Widget from '../Widget';
import Divider from '../Divider';
import { Button } from '@material-ui/core';
import { continueWithFacebook, continueWithGoogle } from '@lib/auth';
import GoogleIcon from '@components/icons/GoogleIcon';
import FacebookIcon from '@components/icons/FacebookIcon';

interface Props {
  children: ReactNode;
}

const AppShell = ({ children }: Props) => {
  return (
    <AuthCheck>
      <main>
        <NavBar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </AuthCheck>
  );
};

export default AppShell;
