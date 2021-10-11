import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { auth, firestore } from '@lib/firebase';
import {
  QuerySnapshot,
  collection,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { useCollection } from 'react-firebase-hooks/firestore';

const useMealsData = (selectedDateTime: DateTime) => {
  const [meals, setMeals] = useState<MealWithRef[]>([]);

  const mealsRef = collection(firestore, `users/${auth.currentUser?.uid}/meals`);

  const mealsQuery = query(
    mealsRef,
    where('startsAt', '>=', selectedDateTime.startOf('day').toJSDate()),
    where('startsAt', '<=', selectedDateTime.endOf('day').toJSDate()),
    orderBy('startsAt')
  );

  const mealsQuerySnapshot = useCollection(mealsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })[0] as QuerySnapshot<Meal> | undefined;

  useEffect(() => {
    if (!mealsQuerySnapshot) return;

    const mealsSnapshot = mealsQuerySnapshot.docs.map((mealDoc) => ({
      ...mealDoc.data(),
      ref: mealDoc.ref,
    }));

    setMeals(mealsSnapshot);
  }, [mealsQuerySnapshot]);

  return { meals };
};

export default useMealsData;
