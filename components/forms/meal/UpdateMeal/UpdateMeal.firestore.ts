import type { UpdateMealValuesType } from './UpdateMeal.types';

import { auth, firestore, serverTimestamp } from '@lib/firebase';

const updateMealFirestore = async (
  { label, isPublic, color, date, time }: UpdateMealValuesType,
  mealRef: FirebaseRef
) => {
  const updatedMeal: Partial<Meal> = {
    label,
    color,
    isPublic,
    startsAt: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    ),
    updatedAt: serverTimestamp(),
  };

  if (!auth?.currentUser?.uid)
    return { error: 'verifique se você está logado' };

  try {
    await mealRef.update(updatedMeal);
  } catch (error) {
    return { error };
  }
};

export default updateMealFirestore;
