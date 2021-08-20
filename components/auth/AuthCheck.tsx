import type { ReactNode } from 'react';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { UserContext } from '@lib/context';

import AuthProviders from './AuthProviders';

interface Props {
  children: ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.replace('/enter');
  }, [user, loading]);

  return user ? <AuthProviders>{children}</AuthProviders> : null;
};

export default AuthCheck;
