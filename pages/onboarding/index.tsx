import { usePush } from '@lib/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Onboarding: NextPage = () => {
  const { push } = usePush();

  useEffect(() => {
    push('/onboarding/account');
  }, [push]);

  return null;
};

export default Onboarding;
