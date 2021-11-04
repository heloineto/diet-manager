import { usePush } from '@lib/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Settings: NextPage = () => {
  const push = usePush();

  useEffect(() => {
    push('/settings/account');
  }, [push]);

  return null;
};

export default Settings;
