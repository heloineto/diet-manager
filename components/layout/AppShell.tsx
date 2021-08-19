import type { ReactNode } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import UnauthCheck from '@components/auth/UnauthCheck';
import NavBar from '@components/navigation/NavBar';
import AuthIllustration from '@components/decoration/AuthIllustration';
import Widget from './Widget';

interface Props {
  children: ReactNode;
  mode?: 'auth' | 'unauth';
}

const AppShell = ({ children, mode }: Props) => {
  const renderChildren = () => {
    switch (mode) {
      case 'auth':
        return (
          <AuthCheck>
            <NavBar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </AuthCheck>
        );
      case 'unauth':
        return (
          <UnauthCheck>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="min-h-screen lg:flex">
                <AuthIllustration />
                <Widget className="lg:w-2/5 my-auto">{children}</Widget>
              </div>
            </div>
          </UnauthCheck>
        );
      default:
        return <>{children}</>;
    }
  };

  return <main className="overflow-x-hidden">{renderChildren()}</main>;
};

export default AppShell;
