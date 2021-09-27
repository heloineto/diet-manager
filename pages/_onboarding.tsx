import type { NextPage } from 'next';

import OnboardingShell from '@components/layout/app-shells/OnboardingShell';
import ProfileCompletion from '@components/elements/ProfileCompletion';

const Onboarding: NextPage = () => {
  return (
    <OnboardingShell label="Onboarding">{/* <ProfileCompletion /> */}</OnboardingShell>
  );
};

export default Onboarding;
