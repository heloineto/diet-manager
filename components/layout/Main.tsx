import type { ReactNode } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import UnauthCheck from '@components/auth/UnauthCheck';

interface Props {
  children: ReactNode;
  mode?: 'auth' | 'unauth';
}

const Main = ({ children, mode }: Props) => {
  const renderChildren = () => {
    switch (mode) {
      case 'auth':
        return <UnauthCheck>{children}</UnauthCheck>;
      case 'unauth':
        return <AuthCheck>{children}</AuthCheck>;
      default:
        return <>{children}</>;
    }
  };

  return <main className="overflow-x-hidden">{renderChildren()}</main>;
};

export default Main;
