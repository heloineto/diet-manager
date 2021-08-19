import type { NextPage } from 'next';

import AppShell from '@components/layout/app-shells/AppShell';

const Home: NextPage = () => {
  return (
    <AppShell>
      <div className="bg-blue-500 w-full h-full"></div>
    </AppShell>
  );
};

export default Home;
