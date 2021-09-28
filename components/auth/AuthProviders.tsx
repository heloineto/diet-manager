import type { ReactNode } from 'react';

import { SnackbarProvider } from 'notistack';

import { SelectedDateContext, MealsContext, WorkoutsContext } from '@lib/context';
import { useSelectedDate, useMealsData, useWorkoutsData } from '@lib/hooks';

interface Props {
  children: ReactNode;
}

const AuthProviders = ({ children }: Props) => {
  const dateData = useSelectedDate();
  const mealsData = useMealsData(dateData.selectedDate);
  const workoutsData = useWorkoutsData(dateData.selectedDate);

  return (
    <SelectedDateContext.Provider value={dateData}>
      <MealsContext.Provider value={mealsData}>
        <WorkoutsContext.Provider value={workoutsData}>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </WorkoutsContext.Provider>
      </MealsContext.Provider>
    </SelectedDateContext.Provider>
  );
};

export default AuthProviders;
