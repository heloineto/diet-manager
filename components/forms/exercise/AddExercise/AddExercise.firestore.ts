import { arrayUnion, serverTimestamp } from '@lib/firebase';

const addFoodFirestore = async (
  { amount, label, carb, fat, kcal, prot, unit, foodId }: Food,
  mealRef: FirebaseRef
) => {
  const newFood = {
    label,
    carb,
    fat,
    kcal,
    prot,
    unit,
    amount,
    foodId,
  };

  await mealRef.update({
    updatedAt: serverTimestamp(),
    foods: arrayUnion(newFood),
  });
};

export default addFoodFirestore;
