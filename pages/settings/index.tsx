import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Settings: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/settings/account');
  });

  return null;
};

export default Settings;
