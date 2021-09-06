import { isNil } from 'lodash';
import { useContext } from 'react';

import { UserContext } from '@lib/context';

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
