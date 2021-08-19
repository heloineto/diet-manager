import type { NextPage } from 'next';

import AppShell from '@components/layout/AppShell';
import NavBar from '@components/navigation/NavBar';
import { Container } from '@material-ui/core';
import Widget from '@components/layout/Widget';

const Diary: NextPage = () => {
  return (
    <AppShell mode="auth">
      <Container className="flex">
        <Widget className="w-6/12 my-5">
          {/* <Calendar />
          <Meals /> */}
        </Widget>
        <Widget className="w-6/12 my-5">{/* <Progress small /> */}</Widget>
      </Container>
    </AppShell>
  );
};

export default Diary;
