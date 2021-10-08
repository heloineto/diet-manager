import { arrayUnion, serverTimestamp, updateDoc } from 'firebase/firestore';

const addFoodFirestore = async (
  { amount, label, carb, fat, kcal, prot, unit, foodId }: Food,
  mealRef: FirebaseRef
) => {
  await updateDoc(mealRef, {
    updatedAt: serverTimestamp(),
    foods: arrayUnion({
      label,
      carb,
      fat,
      kcal,
      prot,
      unit,
      amount,
      foodId,
    }),
  });
};

export default addFoodFirestore;
