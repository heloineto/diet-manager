import { serverTimestamp, updateDoc } from 'firebase/firestore';

const addExerciseFirestore = async (
  { index, label, sets, reps, weight }: Exercise,
  workoutRef: FirebaseRef
) => {
  const newExercise: Exercise = {
    index,
    label,
    sets,
    reps,
    weight,
  };

  await updateDoc(workoutRef, {
    updatedAt: serverTimestamp(),
    [`exercises.${index}`]: newExercise,
  });
};

export default addExerciseFirestore;
