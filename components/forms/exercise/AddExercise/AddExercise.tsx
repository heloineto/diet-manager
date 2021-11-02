import { useEffect, useState } from 'react';

import addExerciseFirestore from './AddExercise.firestore';

interface Props {
  className?: string;
  workout: WorkoutWithRef;
  open: boolean;
  onClose: () => void;
}

const AddExercise = ({ className, open, onClose, workout }: Props) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const addExercise = async () => {
      onClose();

      if (!exercise) return;

      const index = Object.keys(workout.exercises).length;

      await addExerciseFirestore(
        {
          index,
          label: '',
          sets: 0,
          reps: [],
          weight: [],
        },
        workout.ref
      );
    };

    if (open) addExercise();
  }, [open, exercise, onClose, workout]);

  return null;
};

export default AddExercise;
