import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  loading: null,
  userDetails: null,
});

export const CalendarContext = createContext({
  selectedDateTime: null,
  setSelectedDateTime: null,
});

export const MealsContext = createContext({ meals: null });
