import { auth, firestore } from '@lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const addWorkoutFirestore = async ({
  label,
  isPublic,
  color,
  date,
  time,
}: AddWorkoutValuesType) => {
  const newWorkout: Workout = {
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    exercises: {},
  };

  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  const workoutsRef = collection(firestore, `users/${uid}/workouts`);

  await addDoc(workoutsRef, newWorkout).catch((error) => ({ error }));
};

export default addWorkoutFirestore;
