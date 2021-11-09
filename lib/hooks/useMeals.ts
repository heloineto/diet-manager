import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { auth, firestore } from '@lib/firebase';
import { collection, orderBy, query, where } from 'firebase/firestore';

import { useCollection } from 'react-firebase-hooks/firestore';
import { convertFirebaseDates } from '@lib/utils/firestore';

const useMeals = (selectedDateTime: DateTime) => {
  const [meals, setMeals] = useState<MealWithRef[]>([]);

  const mealsRef = collection(firestore, `users/${auth.currentUser?.uid}/meals`);

  const mealsQuery = query(
    mealsRef,
    where('startsAt', '>=', selectedDateTime.startOf('day').toJSDate()),
    where('startsAt', '<=', selectedDateTime.endOf('day').toJSDate()),
    orderBy('startsAt')
  );

  const mealsQuerySnapshot = useCollection(mealsQuery)[0];

  useEffect(() => {
    if (!mealsQuerySnapshot) return;

    const mealsSnapshot = mealsQuerySnapshot.docs.map((mealDoc) => {
      const mealData = convertFirebaseDates(mealDoc.data()) as Meal;

      return {
        ...mealData,
        ref: mealDoc.ref,
      };
    });

    setMeals(mealsSnapshot);
  }, [mealsQuerySnapshot]);

  return { meals };
};

export default useMeals;
