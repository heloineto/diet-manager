import type { ReactNode } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import UnauthCheck from '@components/auth/UnauthCheck';

interface Props {
  children: ReactNode;
  check?: 'auth' | 'unauth';
}

const Main = ({ children, check }: Props) => {
  const renderChildren = () => {
    switch (check) {
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
