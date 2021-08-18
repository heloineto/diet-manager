import Main from '@components/layout/Main';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return <Main check="auth">Hi</Main>;
};

export default Home;
