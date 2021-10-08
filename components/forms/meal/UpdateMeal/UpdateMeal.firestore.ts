import type { UpdateMealValuesType } from './UpdateMeal.types';

import { auth } from '@lib/firebase';
import { serverTimestamp, updateDoc } from 'firebase/firestore';

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

  if (!auth?.currentUser?.uid) return { error: 'verifique se você está logado' };

  await updateDoc(mealRef, updatedMeal).catch((error) => ({ error }));
};

export default updateMealFirestore;
