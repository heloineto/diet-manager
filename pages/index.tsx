import type { NextPage } from 'next';

import AppShell from '@components/layout/app-shells/AppShell';
import Section from '@components/layout/Section';

const Home: NextPage = () => {
  return (
    <AppShell
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
