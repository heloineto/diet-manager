import { has } from 'lodash';
import { useContext } from 'react';

import { UserContext } from '@lib/context';

export const useProfileCompletion = () => {
  const { userDetails } = useContext(UserContext);
  if (!userDetails) return;

  const completed = {
    account: has(userDetails, [
      'birthdate',
      'firstName',
      'lastName',
      'gender',
      'photoURL',
      'username',
    ]),
    generalGoals: has(userDetails, [
      'goals.general.buildMuscle',
      'goals.general.loseWeight',
      'goals.general.lastName',
    ]),
    nutritionGoals: has(userDetails, [
      'goals.nutrition.carb',
      'goals.nutrition.prot',
      'goals.nutrition.fat',
      'goals.nutrition.kcal',
    ]),
    metrics: has(userDetails, [
      'metrics.activityLevel',
      'metrics.height.current',
      'metrics.weight.current',
      'metrics.weight.desired',
    ]),
  };

  return { completed };
};
