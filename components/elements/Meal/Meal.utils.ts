import { serverTimestamp, updateDoc } from 'firebase/firestore';
import type { Row } from 'react-table';

export const removeFoodsByIndex = async (meal: MealWithRef, indexes: number[]) => {
  await updateDoc(meal.ref, {
    updatedAt: serverTimestamp(),
    foods: meal.foods.filter((_, idx) => !indexes.includes(idx)),
  });
};

export const removeFoodsAtRows = (meal: MealWithRef, rows: Row<FormattedFood>[]) => {
  removeFoodsByIndex(
    meal,
    rows.map((row) => Number(row.id))
  );
};
