import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Calendar from '@components/elements/Calendar';
import Meals from '@components/elements/Meals';
import Summary from '@components/elements/Summary';

const Home: NextPage = () => {
  return (
    <MainShell
      aside={
        <div className="space-y-5">
          <Calendar expanded={false} />
          <Meals />
        </div>
      }
      asideProps={{
        size: 'large',
      }}
    >
      <Summary />
    </MainShell>
  );
};

export default Home;
