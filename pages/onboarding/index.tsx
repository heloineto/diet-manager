import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Onboarding: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/onboarding/account');
  }, [router]);

  return null;
};

export default Onboarding;
