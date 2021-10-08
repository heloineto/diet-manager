import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';

import { auth, firestore } from '@lib/firebase';
import { useRouter } from 'next/router';
import { isKeyInShallowObject } from '@utils/typescript';
import { collection, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

export const useUserData = () => {
  const [user, loading] = useAuthState(auth);

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userRef = doc(firestore, `users/${user.uid}`);

      unsubscribe = onSnapshot(userRef, (userDoc) => {
        const userDocData = userDoc.data();
        if (!userDocData) return;

        setUserDetails(userDocData);
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

    const snapshot = querySnapshot.docs.map((mealDoc) => ({
      ...(mealDoc.data() as Meal), //! Maybe typescript is dumb, maybe i'm dumb. (maybe firebase is dumb, also.)
      ref: mealDoc.ref,
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

    const snapshot = querySnapshot.docs.map((workoutDoc) => ({
      ...(workoutDoc.data() as Workout),
      ref: workoutDoc.ref,
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

export const useColors = () => {
  const colors: {
    [key: string]: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  } = useMemo(
    () => ({
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      yellow: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      green: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
      },
      purple: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843',
      },
    }),
    []
  );

  return colors;
};
