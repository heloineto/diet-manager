import type { ReactNode } from 'react';

import { useState } from 'react';

import AuthCheck from '@components/auth/AuthCheck';
import Navbar from '@components/navigation/Navbar';
import Sidebar from '@components/navigation/Sidebar';
import Section from '@components/layout/Section';
import Widget from '../Widget';

interface Props {
  children: ReactNode;
  aside: JSX.Element;
}

const MainShell = ({ children, aside }: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBarOpen = () => setSideBarOpen((value) => !value);

  return (
    <AuthCheck>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        <Sidebar
          sideBarOpen={sideBarOpen}
          toggleSideBarOpen={toggleSideBarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar toggleSideBarOpen={toggleSideBarOpen} />

          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <Section className="p-2.5">
                <Widget>{children}</Widget>
              </Section>
            </main>

            <aside className="hidden lg:block lg:w-96 xl:w-[26rem] overflow-y-auto py-2.5 pr-2.5">
              <Widget>{aside}</Widget>
            </aside>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default MainShell;