import { auth } from '@lib/firebase';
import { serverTimestamp, updateDoc } from 'firebase/firestore';

const updateWorkoutFirestore = async (
  { label, isPublic, color, date, time }: UpdateWorkoutValuesType,
  workoutRef: FirebaseRef
) => {
  const updatedWorkout: Partial<Workout> = {
    label,
    color,
    isPublic,
    startsAt: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    ),
    updatedAt: serverTimestamp(),
  };

  if (!auth?.currentUser?.uid) return { error: 'verifique se você está logado' };

  await updateDoc(workoutRef, updatedWorkout).catch((error) => ({ error }));
};

export default updateWorkoutFirestore;
