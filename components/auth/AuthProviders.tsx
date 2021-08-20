import type { ReactNode } from 'react';
import type firebase from 'firebase';

import { SelectedDateContext, MealsContext } from '@lib/context';
import { useSelectedDate, useMealsData } from '@lib/hooks';

interface Props {
  children: ReactNode;
}

const AuthProviders = ({ children }: Props) => {
  const dateData = useSelectedDate();
  const mealsData = useMealsData(dateData.selectedDate);

  return (
    <SelectedDateContext.Provider value={dateData}>
      <MealsContext.Provider value={mealsData}>
        {children}
      </MealsContext.Provider>
    </SelectedDateContext.Provider>
  );
};

export default AuthProviders;
