import OnboardingShell from '@components/app-shells/OnboardingShell';
import ProfileCompletion from '@components/elements/ProfileCompletion';
import { useRouter } from 'next/router';

const Onboarding: NextPage = () => {
  const router = useRouter();
  const { step } = router.query;

  const stepName = step && typeof step === 'string' ? step : 'account';

  return (
    <OnboardingShell>
      <ProfileCompletion stepName={stepName} />
    </OnboardingShell>
  );
};

export default Onboarding;
