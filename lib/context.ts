import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@firebase/auth';

import { createContext } from 'react';
import { DateTime } from 'luxon';

export const UserContext = createContext<{
  user: User | null | undefined;
  loading: boolean | null;
  userDetails: UserDetailsWithRef | null;
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

export const WorkoutsContext = createContext<{
  workouts: WorkoutWithRef[];
}>({ workouts: [] });
