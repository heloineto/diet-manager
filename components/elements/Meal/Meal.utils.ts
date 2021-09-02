import type { Row } from 'react-table';

import { serverTimestamp } from '@lib/firebase';

export const removeFoodsByIndex = async (
  meal: MealWithRef,
  indexes: number[]
) => {
  await meal.ref.update({
    updatedAt: serverTimestamp(),
    foods: meal.foods.filter((_, idx) => !indexes.includes(idx)),
  });
};

export const removeFoodsAtRows = (
  meal: MealWithRef,
  rows: Row<FormattedFood>[]
) => {
  removeFoodsByIndex(
    meal,
    rows.map((row) => Number(row.id))
  );
};
