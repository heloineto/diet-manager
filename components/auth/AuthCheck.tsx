import type { ReactNode } from 'react';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { SelectedDateContext, MealsContext, UserContext } from '@lib/context';
import { useSelectedDate, useMealsData } from '@lib/hooks';

interface Props {
  children: ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.replace('/enter');
  }, [user, loading]);

  if (user) {
    const dateData = useSelectedDate();
    const mealsData = useMealsData(dateData.selectedDate, user.uid);

    return (
      <SelectedDateContext.Provider value={dateData}>
        <MealsContext.Provider value={mealsData}>
          {children}
        </MealsContext.Provider>
      </SelectedDateContext.Provider>
    );
  }

  return null;
};

export default AuthCheck;
