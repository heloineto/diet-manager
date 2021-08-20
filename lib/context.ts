import type { Dispatch, SetStateAction } from 'react';
import type firebase from 'firebase/app';

import { createContext } from 'react';
import { DateTime } from 'luxon';

export const UserContext = createContext({
  user: null,
  loading: null,
  userDetails: null,
} as {
  user: firebase.User | null | undefined;
  loading: boolean | null;
  userDetails: UserDetails | null;
});

export const SelectedDateContext = createContext({
  selectedDate: DateTime.now(),
  setSelectedDate: null,
} as { selectedDate: DateTime; setSelectedDate: Dispatch<SetStateAction<DateTime>> | null });

export const MealsContext = createContext({ meals: [] } as {
  meals: {}[];
});
