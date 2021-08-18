import type { NextPage } from 'next';

import Main from '@components/layout/Main';
import NavBar from '@components/navigation/NavBar';
import { Container } from '@material-ui/core';

const Home: NextPage = () => {
  return (
    <Main mode="auth">
      <Container className="flex">
        <NavBar className="absolute w-10" />
        <div className="w-full h-full min-h-screen bg-gray-500"></div>
      </Container>
    </Main>
  );
};

export default Home;
