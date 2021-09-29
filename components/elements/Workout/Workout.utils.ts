import type { Row } from 'react-table';

import { serverTimestamp } from '@lib/firebase';

export const removeFoodsByIndex = async (workout: WorkoutWithRef, indexes: number[]) => {
  await workout.ref.update({
    updatedAt: serverTimestamp(),
    exercises: workout.exercises.filter((_, idx) => !indexes.includes(idx)),
  });
};

export const removeFoodsAtRows = (workout: WorkoutWithRef, rows: Row<Exercise>[]) => {
  removeFoodsByIndex(
    workout,
    rows.map((row) => Number(row.id))
  );
};
