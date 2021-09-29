import type { Row } from 'react-table';

import { serverTimestamp } from '@lib/firebase';
import { omit } from 'lodash';

export const removeExercisesByIndex = async (
  workout: WorkoutWithRef,
  indexes: number[]
) => {
  /**
   * To make sure that the "index" (both key and property) are
   * always consistent, we need to rearrange the whole object
   * after each remotion
   */

  const updatedExercises = omit(workout.exercises, indexes);

  const rearrangedExercises = Object.values(updatedExercises).reduce(
    (acc: typeof updatedExercises, value, index: number) => {
      // @ts-ignore
      value.index = index;

      return { ...acc, [index]: value };
    },
    {}
  );

  await workout.ref.update({
    updatedAt: serverTimestamp(),
    exercises: rearrangedExercises,
  });
};

export const removeExercisesAtRows = (workout: WorkoutWithRef, rows: Row<Exercise>[]) => {
  removeExercisesByIndex(
    workout,
    rows.map((row) => Number(row.id))
  );
};
