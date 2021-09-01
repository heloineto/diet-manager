import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext } from 'react';

export const AsideContext = createContext<{
  aside: ReactNode;
  setAside: Dispatch<SetStateAction<ReactNode>> | null;
}>({
  aside: null,
  setAside: null,
});
