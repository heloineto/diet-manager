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

  const calendarData = useSelectedDate();

  return user ? (
    <SelectedDateContext.Provider value={calendarData}>
      <MealsContext.Provider
        value={useMealsData(calendarData.selectedDateTime, user.uid)}
      >
        {children}
      </MealsContext.Provider>
    </SelectedDateContext.Provider>
  ) : null;
};

export default AuthCheck;
