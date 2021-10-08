import { auth, firestore } from '@lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const addMealFirestore = async ({
  label,
  isPublic,
  color,
  date,
  time,
}: AddMealValuesType) => {
  const newMeal: Meal = {
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    foods: [],
  };

  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  const mealsRef = collection(firestore, `users/${uid}/meals`);

  await addDoc(mealsRef, newMeal).catch((error) => ({ error }));
};

export default addMealFirestore;
