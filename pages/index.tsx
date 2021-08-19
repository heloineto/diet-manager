import type { NextPage } from 'next';

import AppShell from '@components/layout/app-shells/AppShell';

const Home: NextPage = () => {
  return (
    <AppShell>
      <div className="bg-blue-100 w-full h-full"></div>
      <div className="bg-blue-100 w-full h-full"></div>
      <div className="bg-blue-100 w-full h-full"></div>
    </AppShell>
  );
};

export default Home;
