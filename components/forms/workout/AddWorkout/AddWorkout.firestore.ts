import { arrayUnion, auth, firestore, serverTimestamp } from '@lib/firebase';
import { converter } from '@utils/firestore';

const addWorkoutFirestore = async ({
  label,
  isPublic,
  saveWorkout,
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
    exercises: [],
  };

  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  const workoutsRef = firestore.collection('users').doc(uid).collection('workouts');

  await workoutsRef.add(newWorkout).catch((error) => ({ error }));

  if (saveWorkout) {
    const userDoc = firestore
      .collection('users')
      .doc(uid)
      .withConverter(converter<UserDetails>());

    await userDoc.update({
      updatedAt: serverTimestamp(),
      savedWorkouts: [newWorkout], //arrayUnion(newWorkout)
    });
  }
};

export default addWorkoutFirestore;
