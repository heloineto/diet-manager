import { isNil } from 'lodash';
import { useContext, useMemo } from 'react';

import { UserContext } from '@lib/context';

import {
  UserIcon as UserIconOutlined,
  ClipboardListIcon as ClipboardListIconOutlined,
} from '@heroicons/react/outline';

import {
  UserIcon as UserIconSolid,
  ClipboardListIcon as ClipboardListIconSolid,
} from '@heroicons/react/solid';

import UpdateAccount from '@components/forms/profile/UpdateAccount';
import UpdateGeneralGoals from '@components/forms/profile/UpdateGeneralGoals';
import UpdateNutritionGoals from '@components/forms/profile/UpdateNutritionGoals';
import UpdateMetrics from '@components/forms/profile/UpdateMetrics';

import TargetIconSolid from '@components/icons/TargetIconSolid';
import TargetIconOutlined from '@components/icons/TargetIconOutlined';
import ForkKnifeIconOutlined from '@components/icons/ForkKnifeIconOutlined';
import ForkKnifeIconSolid from '@components/icons/ForkKnifeIconSolid';

export const useProfileCompletion = () => {
  const { userDetails } = useContext(UserContext);
  if (!userDetails)
    return {
      account: false,
      generalGoals: false,
      nutritionGoals: false,
      metrics: false,
    };

  const completed = {
    account: Boolean(
      !isNil(userDetails?.birthdate) &&
        !isNil(userDetails?.firstName) &&
        !isNil(userDetails?.lastName) &&
        !isNil(userDetails?.gender) &&
        !isNil(userDetails?.photoURL) &&
        !isNil(userDetails?.username)
    ),
    generalGoals: Boolean(
      !isNil(userDetails?.goals?.general?.buildMuscle) &&
        !isNil(userDetails?.goals?.general?.loseWeight) &&
        !isNil(userDetails?.goals?.general?.beHealthier)
    ),
    nutritionGoals: Boolean(
      !isNil(userDetails?.goals?.nutrition?.carb) &&
        !isNil(userDetails?.goals?.nutrition?.prot) &&
        !isNil(userDetails?.goals?.nutrition?.fat) &&
        !isNil(userDetails?.goals?.nutrition?.kcal)
    ),
    metrics: Boolean(
      !isNil(userDetails?.metrics?.activityLevel) &&
        !isNil(userDetails?.metrics?.height?.current) &&
        !isNil(userDetails?.metrics?.weight?.current) &&
        !isNil(userDetails?.metrics?.weight?.desired)
    ),
  };

  return completed;
};

export const useProfileCompletionSteps = () => {
  return useMemo(
    () => [
      {
        index: 0,
        name: 'account',
        label: 'Conta',
        IconOutlined: UserIconOutlined,
        IconSolid: UserIconSolid,
        Form: UpdateAccount,
      },
      {
        index: 1,
        name: 'generalGoals',
        label: 'Metas Gerais',
        IconOutlined: TargetIconOutlined,
        IconSolid: TargetIconSolid,
        Form: UpdateGeneralGoals,
      },
      {
        index: 2,
        name: 'nutritionGoals',
        label: 'Metas Nutricionais',
        IconOutlined: ForkKnifeIconOutlined,
        IconSolid: ForkKnifeIconSolid,
        Form: UpdateNutritionGoals,
      },
      {
        index: 3,
        name: 'metrics',
        label: 'Medidas',
        IconOutlined: ClipboardListIconOutlined,
        IconSolid: ClipboardListIconSolid,
        Form: UpdateMetrics,
      },
    ],
    []
  );
};
