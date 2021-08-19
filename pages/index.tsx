import type { NextPage } from 'next';

import AppShell from '@components/layout/app-shells/AppShell';

const Home: NextPage = () => {
  return (
    <AppShell mode="auth">
      {/* <NavBar className="absolute w-10" current="home" /> */}
      <div className="w-full h-full min-h-screen bg-gray-500"></div>
    </AppShell>
  );
};

export default Home;
