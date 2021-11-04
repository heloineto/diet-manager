import { usePush } from '@lib/hooks';
import { useEffect } from 'react';

const Settings: NextPage = () => {
  const { push } = usePush();

  useEffect(() => {
    push('/settings/account');
  }, [push]);

  return null;
};

export default Settings;
