import type { NextPage } from 'next';

import OnboardingShell from '@components/layout/app-shells/OnboardingShell';
import { UserContext } from '@lib/context';
import { useContext } from 'react';

//   email?: string;

//   birthdate?: Date;
//   firstName?: string;
//   lastName?: string;
//   gender?: 'M' | 'F' | 'O';

//   photoURL?: string;
//   verifiedEmail?: boolean;

//   activityLevel?: 1 | 2 | 3 | 4 | 5;

//   height?: {
//     current?: number;
//   };

//   weight?: {
//     current?: number;
//     desired?: number;
//   };

//   goals?: {
//     general?: {
//       buildMuscle?: boolean;
//       loseWeight?: boolean;
//       lastName?: boolean;
//     };

//     nutrition?: Partial<Macros>;
//   };

const Onboarding: NextPage = () => {
  const { userDetails } = useContext(UserContext);

  return <OnboardingShell>{[]}</OnboardingShell>;
};

export default Onboarding;
