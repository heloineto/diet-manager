import type { NextPage } from 'next';

import OnboardingShell from '@components/layout/app-shells/OnboardingShell';
import ProfileCompletion from '@components/elements/ProfileCompletion';
import { useRouter } from 'next/router';

const Onboarding: NextPage = () => {
  const router = useRouter();
  const { step } = router.query;

  const stepName = step && typeof step === 'string' ? step : 'account';

  return (
    <OnboardingShell label="Onboarding">
      <ProfileCompletion stepName={stepName} />
    </OnboardingShell>
  );
};

export default Onboarding;