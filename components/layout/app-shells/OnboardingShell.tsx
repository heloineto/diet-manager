import type { ReactNode } from 'react';

import clsx from 'clsx';

import AuthCheck from '@components/auth/AuthCheck';

interface Props {
  className?: string;
  children: ReactNode;
}

const OnboardingShell = ({ className, children }: Props) => {
  return (
    <AuthCheck>
      <div
        className={clsx(
          className,
          'col-span-full my-auto lg:col-start-3 lg:col-span-8 xl:col-span-6 xl:col-start-4 py-10'
        )}
      >
        {children}
      </div>
    </AuthCheck>
  );
};

export default OnboardingShell;
