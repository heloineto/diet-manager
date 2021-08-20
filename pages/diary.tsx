import type { NextPage } from 'next';

import AppShell from '@components/layout/app-shells/AppShell';
import Section from '@components/layout/Section';
import Calendar from '@components/elements/Calendar';

const Diary: NextPage = () => {
  return (
    <AppShell
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
