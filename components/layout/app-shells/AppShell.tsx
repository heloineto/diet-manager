import type { ReactNode } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import NavBar from '@components/navigation/NavBar';

interface Props {
  children: ReactNode;
}

const AppShell = ({ children }: Props) => {
  return (
    <AuthCheck>
      <main className="flex container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <NavBar className="w-3/12 top-0 left-0 px-2" />
        <div className="w-9/12 h-screen">{children}</div>
      </main>
    </AuthCheck>
  );
};

export default AppShell;
