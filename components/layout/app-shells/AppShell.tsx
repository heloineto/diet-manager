import type { ReactNode } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import NavBar from '@components/navigation/NavBar';

interface Props {
  children: ReactNode;
}

const AppShell = ({ children }: Props) => {
  return (
    <AuthCheck>
      <main className="flex container mx-auto">
        <NavBar className="w-3/12 pl-4 sm:pl-6 lg:pl-8" />
        <div className="w-9/12 pr-4 sm:pr-6 lg:pr-8">{children}</div>
      </main>
    </AuthCheck>
  );
};

export default AppShell;
