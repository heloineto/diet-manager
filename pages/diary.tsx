import type { NextPage } from 'next';

import AppShell from '@components/layout/app-shells/AppShell';
import Widget from '@components/layout/Widget';

const Diary: NextPage = () => {
  return (
    <AppShell>
      <Widget className="w-6/12 my-5">
        {/* <Calendar />
          <Meals /> */}
      </Widget>
      <Widget className="w-6/12 my-5">{/* <Progress small /> */}</Widget>
    </AppShell>
  );
};

export default Diary;
