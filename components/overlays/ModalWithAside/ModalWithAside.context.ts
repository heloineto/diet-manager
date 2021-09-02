import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext } from 'react';

export const AsideContext = createContext<{
  aside: ReactNode | null;
  setAside: Dispatch<SetStateAction<ReactNode>> | null;
  asideLabel: string | null;
  setAsideLabel: Dispatch<SetStateAction<string>> | null;
}>({
  aside: null,
  setAside: null,
  asideLabel: null,
  setAsideLabel: null,
});
