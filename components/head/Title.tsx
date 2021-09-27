import { indexOfNth, isKeyInShallowObject } from '@utils/typescript';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

interface Props {}

const Title = (props: Props) => {
  const router = useRouter();

  console.log({ router });

  // const { pathname } = router
  const pathname = '';

  const current = pathname.substring(0, indexOfNth(pathname, '/', 2));

  const routesData = useMemo(
    () => ({
      '/': {
        label: 'Home',
      },
      '/enter': {
        label: 'Entrar',
      },
      '/register': {
        label: 'Cadastrar',
      },
      '/diary': {
        label: 'Diário',
      },
      '/workouts': {
        label: 'Treinos',
      },
      '/settings': {
        label: 'Preferências',
      },
      '/account': {
        label: 'Conta',
      },
      '/generalGoals': {
        label: 'Metas Gerais',
      },
      '/nutritionGoals': {
        label: 'Metas Nutricionais',
      },
      '/metrics': {
        label: 'Medidas',
      },
    }),
    []
  );

  return (
    <>
      <title>
        {isKeyInShallowObject(current, routesData)
          ? `${routesData[current]} / Diet Manager`
          : `Diet Manager`}
      </title>
    </>
  );
};

export default Title;
