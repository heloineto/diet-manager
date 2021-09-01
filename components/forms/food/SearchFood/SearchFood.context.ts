import type { Dispatch, SetStateAction } from 'react';

import { createContext } from 'react';

export const SelectedFoodContext = createContext<{
  selectedFood: Food | null;
  setSelectedFood: Dispatch<SetStateAction<Food | null>> | null;
}>({
  selectedFood: null,
  setSelectedFood: null,
});
