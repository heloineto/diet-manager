import type { ReactNode } from 'react';

import { useState } from 'react';
import clsx from 'clsx';

import AuthCheck from '@components/auth/AuthCheck';
import Navbar from '@components/navigation/Navbar';
import Sidebar from '@components/navigation/Sidebar';
import Section from '@components/layout/Section';
import Widget from '../Widget';

interface Props {
  children: ReactNode;
}

const OnboardingShell = ({ children }: Props) => {
  return (
    <AuthCheck>
      <div className="col-span-full my-auto lg:col-start-3 lg:col-span-8 xl:col-span-6 xl:col-start-4 py-10">
        {children}
      </div>
    </AuthCheck>
  );
};

export default OnboardingShell;
