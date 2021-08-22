import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Section from '@components/layout/Section';
import Calendar from '@components/elements/Calendar';

const Diary: NextPage = () => {
  return <MainShell aside={<Calendar />}>{/* <Calendar /> */}</MainShell>;
};

export default Diary;
