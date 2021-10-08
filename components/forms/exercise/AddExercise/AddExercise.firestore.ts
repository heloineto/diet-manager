import { arrayUnion, serverTimestamp } from 'firebase/firestore';

const addExerciseFirestore = async (
  { index, label, sets, reps, weight }: Exercise,
  mealRef: FirebaseRef
) => {
  const newExercise = {
    index,
    label,
    sets,
    reps,
    weight,
  };

  await mealRef.update({
    updatedAt: serverTimestamp(),
    exercises: arrayUnion(newExercise),
  });
};

export default addExerciseFirestore;
