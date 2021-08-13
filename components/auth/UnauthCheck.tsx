import type { ReactNode } from 'react';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { UserContext } from '@lib/context';

interface UnauthCheckProps {
  children: ReactNode;
}

const UnauthCheck = ({ children }: UnauthCheckProps) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  return !user ? <>{children}</> : null;
};

export default UnauthCheck;
