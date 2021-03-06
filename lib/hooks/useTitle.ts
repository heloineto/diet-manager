import { useMemo } from 'react';

import { useRouter } from 'next/router';
import { isKeyInShallowObject } from '@lib/utils/typescript';

const useTitle = () => {
  const { asPath } = useRouter();

  const route = asPath.match(/.*([\/].*)$/)?.[1];

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

  return isKeyInShallowObject(route, routesData)
    ? `${routesData[route].label} / Diet Manager`
    : 'Diet Manager';
};

export default useTitle;
