import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Calendar from '@components/elements/Calendar';
import Meals from '@components/elements/Meals';
import { useMediaQuery, useTheme } from '@material-ui/core';

const Diary: NextPage = () => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  return (
    <MainShell aside={<Calendar />}>
      {compact && <Calendar expanded={false} />}
      <Meals />
    </MainShell>
  );
};

export default Diary;
