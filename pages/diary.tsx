import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Calendar from '@components/elements/Calendar';
import Meals from '@components/elements/Meals';

const Diary: NextPage = () => {
  return (
    <MainShell aside={<Calendar />}>
      <Meals />
    </MainShell>
  );
};

export default Diary;
