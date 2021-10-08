import { arrayUnion, serverTimestamp } from 'firebase/firestore';

const addFoodFirestore = async (
  { amount, label, carb, fat, kcal, prot, unit, foodId }: Food,
  mealRef: FirebaseRef
) => {
  await mealRef.update({
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
