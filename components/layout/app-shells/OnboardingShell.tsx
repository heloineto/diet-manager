import clsx from 'clsx';

import AuthCheck from '@components/auth/AuthCheck';

interface Props {
  className?: string;
  children: ReactNode;
}

const OnboardingShell = ({ className, children }: Props) => {
  return (
    <AuthCheck>
      <div className={clsx(className, 'min-h-screen')}>{children}</div>
    </AuthCheck>
  );
};

export default OnboardingShell;
