import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import Section from '@components/layout/Section';

const Home: NextPage = () => {
  return (
    <MainShell
      leftSection={<Section>Left</Section>}
      rightSection={<Section>Right</Section>}
    />
  );
};

export default Home;

/**
 * TODO:
 *
 * Add visibility toggle to password fields
 * Add animation to the modal in
 */
