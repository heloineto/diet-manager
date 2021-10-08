import { serverTimestamp } from 'firebase/firestore';

const updateExerciseFirestore = async (
  { label, sets, reps, weight }: UpdateExerciseValuesType,
  index: number,
  workoutRef: FirebaseRef
) => {
  const newExercise = {
    index,
    label,
    sets,
    reps,
    weight,
  };

  await workoutRef.update({
    updatedAt: serverTimestamp(),
    [`exercises.${index}`]: newExercise,
  });
};

export default updateExerciseFirestore;
