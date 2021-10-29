import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { UserContext } from '@lib/context';

interface Props {
  children: ReactNode;
}

const UnauthCheck = ({ children }: Props) => {
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
