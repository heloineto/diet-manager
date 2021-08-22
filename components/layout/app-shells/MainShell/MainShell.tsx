import AuthCheck from '@components/auth/AuthCheck';

import clsx from 'clsx';

interface Props {
  rightSection: JSX.Element;
  leftSection: JSX.Element;
}

import { Fragment, useState } from 'react';
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import Navbar from '@components/navigation/Navbar';
import Sidebar from '@components/navigation/Sidebar';

const sidebarNavigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false },
  { name: 'All Files', href: '#', icon: ViewGridIcon, current: false },
  { name: 'Photos', href: '#', icon: PhotographIcon, current: true },
  { name: 'Shared', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Albums', href: '#', icon: CollectionIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

const MainShell = ({ rightSection, leftSection }: Props) => {
  return (
    <AuthCheck>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Narrow sidebar */}
        <Sidebar />
        {/* Mobile menu */}

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              {/* Primary column */}
              <section
                aria-labelledby="primary-heading"
                className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
              >
                <h1 id="primary-heading" className="sr-only">
                  Photos
                </h1>
                {/* Your content */}
              </section>
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block">
              {/* Your content */}
            </aside>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default MainShell;
