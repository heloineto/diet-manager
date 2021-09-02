import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Section from '@components/layout/Section';
import Calendar from '@components/elements/Calendar';
import Meals from '@components/elements/Meals';

const Home: NextPage = () => {
  return (
    <MainShell
      aside={
        <div className="space-y-5">
          <Calendar expanded={false} />
          <Meals />
        </div>
      }
      classes={{
        aside: 'lg:w-[26rem] xl:w-[32rem]',
      }}
    >
      <Section>Left</Section>
    </MainShell>
  );
};

export default Home;
