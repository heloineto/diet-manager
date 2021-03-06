import { useState } from 'react';
import classNames from 'clsx';

import AuthCheck from '@components/auth/AuthCheck';
import Navbar from '@components/navigation/Navbar';
import Sidebar from '@components/navigation/Sidebar';
import Section from '@components/layout/Section';
import Widget from '../layout/Widget';

interface Props {
  children: ReactNode;
  aside: JSX.Element;
  asideProps?: {
    size?: 'small' | 'large';
    position?: 'left' | 'right';
  };
}

const MainShell = ({ children, aside, asideProps }: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBarOpen = () => setSideBarOpen((value) => !value);

  return (
    <AuthCheck>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        <Sidebar sideBarOpen={sideBarOpen} toggleSideBarOpen={toggleSideBarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar toggleSideBarOpen={toggleSideBarOpen} />

          <div
            className={classNames(
              asideProps?.position === 'left' && 'flex-row-reverse',
              'flex-1 flex items-stretch overflow-hidden'
            )}
          >
            <main className="flex-1 overflow-y-auto">
              <Section className="p-2.5">
                <Widget>{children}</Widget>
              </Section>
            </main>

            <aside
              className={classNames(
                asideProps?.size === 'large'
                  ? 'lg:w-[28rem] xl:w-[38rem]'
                  : asideProps?.size === 'small'
                  ? 'lg:w-96 xl:w-[26rem]'
                  : 'lg:w-[26rem] xl:w-[32rem]',
                asideProps?.position === 'left' ? 'pl-2.5' : 'pr-2.5',
                'hidden lg:block overflow-y-auto py-2.5'
              )}
            >
              <Widget>{aside}</Widget>
            </aside>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default MainShell;
