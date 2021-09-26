import type { ReactNode } from 'react';

import Head from 'next/head';
import clsx from 'clsx';

import AuthCheck from '@components/auth/AuthCheck';

interface Props {
  className?: string;
  children: ReactNode;
  label?: string;
}

const OnboardingShell = ({ className, children, label }: Props) => {
  return (
    <AuthCheck>
      <Head>
        <title>{label ? `${label} / Diet Manager` : `Diet Manager`}</title>
      </Head>
      <div className={clsx(className, 'min-h-screen')}>{children}</div>
    </AuthCheck>
  );
};

export default OnboardingShell;
