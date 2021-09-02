import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Section from '@components/layout/Section';

const Home: NextPage = () => {
  return (
    <MainShell aside={<Section>Right</Section>}>
      <Section>Left</Section>
    </MainShell>
  );
};

export default Home;
