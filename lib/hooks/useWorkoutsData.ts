import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';

import { auth, firestore } from '@lib/firebase';
import { useRouter } from 'next/router';
import { isKeyInShallowObject } from '@utils/typescript';
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  QuerySnapshot,
} from 'firebase/firestore';

import { useCollection } from 'react-firebase-hooks/firestore';

const useWorkoutsData = (selectedDateTime: DateTime) => {
  const [workouts, setWorkouts] = useState<WorkoutWithRef[]>([]);

  const workoutsRef = collection(firestore, `users/${auth.currentUser?.uid}/workouts`);

  const workoutsQuery = query(
    workoutsRef,
    where('startsAt', '>=', selectedDateTime.startOf('day').toJSDate()),
    where('startsAt', '<=', selectedDateTime.endOf('day').toJSDate()),
    orderBy('startsAt')
  );

  const workoutsQuerySnapshot: QuerySnapshot<Workout> = useCollection(workoutsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })[0];

  useEffect(() => {
    if (!workoutsQuerySnapshot) return;

    const workoutSnapshot = workoutsQuerySnapshot.docs.map((workoutDoc) => ({
      ...workoutDoc.data(),
      ref: workoutDoc.ref,
    }));

    setWorkouts(workoutSnapshot);
  }, [workoutsQuerySnapshot]);

  return { workouts };
};

export default useWorkoutsData;
