import type { Row } from 'react-table';

import { serverTimestamp } from '@lib/firebase';

export const removeExercisesByIndex = async (
  workout: WorkoutWithRef,
  indexes: number[]
) => {
  await workout.ref.update({
    updatedAt: serverTimestamp(),
    exercises: workout.exercises.filter((_, idx) => !indexes.includes(idx)),
  });
};

export const removeExercisesAtRows = (workout: WorkoutWithRef, rows: Row<Exercise>[]) => {
  removeExercisesByIndex(
    workout,
    rows.map((row) => Number(row.id))
  );
};
