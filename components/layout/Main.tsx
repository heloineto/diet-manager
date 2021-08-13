import type { ReactNode } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import UnauthCheck from '@components/auth/UnauthCheck';

interface Props {
  children: ReactNode;
  unauthCheck?: boolean;
  authCheck?: boolean;
}

const Main = ({ children, unauthCheck, authCheck }: Props) => {
  const renderChildren = () => {
    if (unauthCheck) return <UnauthCheck>{children}</UnauthCheck>;
    if (authCheck) return <AuthCheck>{children}</AuthCheck>;
    return <>{children}</>;
  };

  return <main className="overflow-x-hidden">{renderChildren()}</main>;
};

export default Main;
