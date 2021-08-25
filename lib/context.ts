import type { Dispatch, SetStateAction } from 'react';
import type firebase from 'firebase/app';

import { createContext } from 'react';
import { DateTime } from 'luxon';

export const UserContext = createContext<{
  user: firebase.User | null | undefined;
  loading: boolean | null;
  userDetails: UserDetails | null;
}>({
  user: null,
  loading: null,
  userDetails: null,
});

export const SelectedDateContext = createContext<{
  selectedDate: DateTime;
  setSelectedDate: Dispatch<SetStateAction<DateTime>> | null;
}>({
  selectedDate: DateTime.now(),
  setSelectedDate: null,
});

export const MealsContext = createContext<{
  meals: MealWithRef[];
}>({ meals: [] });
