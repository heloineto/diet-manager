import { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import addExerciseFirestore from './AddExercise.firestore';
import ModalWithAside from '@components/overlays/ModalWithAside';

interface Props {
  className?: string;
  workout: WorkoutWithRef;
  open: boolean;
  onClose: () => void;
}

const AddExercise = ({ className, open, onClose, workout }: Props) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);

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

  useEffect(() => {
    if (open) addExercise();
  }, [open]);

  return null;
};

export default AddExercise;
