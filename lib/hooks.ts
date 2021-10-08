import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth, firestore } from '@lib/firebase';
import { useRouter } from 'next/router';
import { isKeyInShallowObject } from '@utils/typescript';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

export const useUserData = () => {
  const [user, loading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userRef = collection(firestore, `users/${user.uid}`);

      unsubscribe = onSnapshot(userRef, (doc) => {
        const docData = doc.data();
        if (!docData) return;

        setUserDetails(docData);
      });
    } else {
      setUserDetails({});
    }

    return unsubscribe;
  }, [user]);

  return { user, loading, userDetails };
};

export const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());

  return { selectedDate, setSelectedDate };
};

export const useMealsData = (selectedDateTime: DateTime) => {
  const [meals, setMeals] = useState<MealWithRef[]>([]);

  const mealsRef = collection(firestore, `users/${auth.currentUser?.uid}/meals`);

  const mealQuery = query(
    mealsRef,
    where('startsAt', '>=', selectedDateTime.startOf('day').toJSDate()),
    where('startsAt', '<=', selectedDateTime.endOf('day').toJSDate()),
    orderBy('startsAt')
  );

  const [querySnapshot] = useCollection(mealQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (!querySnapshot) return;

    const snapshot = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Meal), //! Maybe typescript is dumb, maybe i'm dumb. (maybe firebase is dumb, also.)
      ref: doc.ref,
    }));

    setMeals(snapshot);
  }, [querySnapshot]);

  return { meals };
};

export const useWorkoutsData = (selectedDateTime: DateTime) => {
  const [workouts, setWorkouts] = useState<WorkoutWithRef[]>([]);

  const workoutsRef = collection(firestore, `users/${auth.currentUser?.uid}/workouts`);

  const workoutQuery = query(
    workoutsRef,
    where('startsAt', '>=', selectedDateTime.startOf('day').toJSDate()),
    where('startsAt', '<=', selectedDateTime.endOf('day').toJSDate()),
    orderBy('startsAt')
  );

  const [querySnapshot] = useCollection(workoutQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (!querySnapshot) return;

    const snapshot = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Workout),
      ref: doc.ref,
    }));

    setWorkouts(snapshot);
  }, [querySnapshot]);

  return { workouts };
};

export const useMacrosInfo = () => {
  return {
    carbInfo: {
      key: <'carb'>'carb',
      label: 'Carboidrato',
      compactLabel: 'Carboid.',
      color: '#a78bfa',
      kcalPerUnit: 4,
    },
    protInfo: {
      key: <'prot'>'prot',
      label: 'Proteina',
      compactLabel: 'Proteina',
      color: '#60a5fa',
      kcalPerUnit: 4,
    },
    fatInfo: {
      key: <'fat'>'fat',
      label: 'Gordura',
      compactLabel: 'Gordura',
      color: '#fbbf24',
      kcalPerUnit: 9,
    },
    kcalInfo: {
      key: <'kcal'>'kcal',
      label: 'Caloria',
      compactLabel: 'Caloria',
      color: '#10b981',
      kcalPerUnit: 1,
    },
  };
};

export const useTitle = () => {
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
