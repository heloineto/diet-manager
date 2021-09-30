import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Calendar from '@components/elements/Calendar';
import Meals from '@components/elements/Meals';
import Summary from '@components/elements/Summary';
import { useMediaQuery, useTheme } from '@material-ui/core';

const Home: NextPage = () => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  return (
    <MainShell
      aside={
        <div className="space-y-5">
          <Calendar expanded={false} />
          <Meals />
        </div>
      }
    >
      {compact && <Calendar className="mb-5" expanded={false} />}
      <Summary />
    </MainShell>
  );
};

export default Home;
