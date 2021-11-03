import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from '@lib/firebase';

import { converter } from '@utils/firestore';

const usePrevWorkouts = () => {
  const [prevWorkouts, setPrevWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const uid = auth?.currentUser?.uid;

    if (uid) {
      const workoutsRef = collection(firestore, `users/${uid}/workouts`).withConverter(
        converter<Workout>()
      );

      getDocs(workoutsRef).then((workoutuerySnapshot) => {
        const workoutsSnapshot = workoutuerySnapshot.docs.map((doc) => doc.data());

        const prevWorkoutsObj = Object.values(workoutsSnapshot).reduce(
          (previousValue: { [k: string]: Workout }, currentValue) => {
            if (!previousValue[currentValue.label])
              previousValue[currentValue.label] = currentValue;

            return previousValue;
          },
          {}
        );

        setPrevWorkouts(Object.values(prevWorkoutsObj));
      });
    }
  }, []);

  return { prevWorkouts };
};

export default usePrevWorkouts;
