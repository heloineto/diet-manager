import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';

import { auth, firestore } from '@lib/firebase';
import { useRouter } from 'next/router';
import { isKeyInShallowObject } from '@utils/typescript';

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
