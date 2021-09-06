import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';

export const useUserData = () => {
  const [user, loading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      unsubscribe = userRef.onSnapshot((doc) => {
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

  const mealsRef = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('meals');

  const mealQuery = mealsRef
    .where('startsAt', '>=', selectedDateTime.startOf('day').toJSDate())
    .where('startsAt', '<=', selectedDateTime.endOf('day').toJSDate())
    .orderBy('startsAt');

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

export const useMacrosInfo = () => {
  return {
    carbInfo: {
      key: <'carb'>'carb',
      label: 'Carboidratos',
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
      label: 'Calorias',
      compactLabel: 'Calorias',
      color: '#10b981',
      kcalPerUnit: 1,
    },
  };
};
