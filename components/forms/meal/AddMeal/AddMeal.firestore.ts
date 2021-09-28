import { auth, firestore, serverTimestamp } from '@lib/firebase';

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

  const mealsRef = firestore.collection('users').doc(uid).collection('meals');

  await mealsRef.add(newMeal).catch((error) => ({ error }));
};

export default addMealFirestore;
