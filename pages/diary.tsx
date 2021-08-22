import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Section from '@components/layout/Section';
import Calendar from '@components/elements/Calendar';

const Diary: NextPage = () => {
  return (
    <MainShell
      leftSection={
        <Section>
          <Calendar /> Meals
        </Section>
      }
      rightSection={<Section>Right</Section>}
    />
  );
};

export default Diary;
