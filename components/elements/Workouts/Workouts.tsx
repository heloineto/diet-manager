import { Button } from '@material-ui/core';
import Modal from '@components/overlays/Modal';
import AddWorkout from '@components/forms/workout/AddWorkout';
import { PlusIcon } from '@heroicons/react/outline';
import { useContext, useState } from 'react';
import { WorkoutsContext } from '@lib/context';
import Workout from '../Workout';

interface Props {}

const Workouts = (props: Props) => {
  const { workouts } = useContext(WorkoutsContext);
  const [addWorkoutOpen, setAddWorkoutOpen] = useState(false);

  const renderWorkouts = () =>
    workouts.map((workout, idx) => <Workout key={idx} workout={workout} />);

  return (
    <div className="flex-grow flex flex-col">
      <div className="mb-5 grid gap-y-5">{renderWorkouts()}</div>

      <Button
        className="mt-auto"
        color="primary"
        variant="outlined"
        startIcon={<PlusIcon className="h-7 w-7" />}
        onClick={() => setAddWorkoutOpen(true)}
      >
        Adicionar Treino
      </Button>

      <Modal
        label="Adicionar Treino"
        open={addWorkoutOpen}
        onClose={() => setAddWorkoutOpen(false)}
      >
        <AddWorkout onClose={() => setAddWorkoutOpen(false)} />
      </Modal>
    </div>
  );
};

export default Workouts;
