import clsx from 'clsx';
import { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import {
  KeyboardDatePicker,
  Switches,
  TextField,
  TimePicker,
  makeValidate,
} from 'mui-rff';
import { DateTime } from 'luxon';

import updateWorkoutSchema from './UpdateWorkout.schema';
import updateWorkoutFirestore from './UpdateWorkout.firestore';
import { SelectedDateContext } from '@lib/context';
import ColorField from '@components/inputs/ColorField';

interface Props {
  className?: string;
  onClose: () => void;
  workout: WorkoutWithRef;
}

const UpdateWorkout = ({ className, onClose, workout }: Props) => {
  const { selectedDate } = useContext(SelectedDateContext);

  // @ts-ignore
  const startsAtJSDate = DateTime.fromSeconds(workout.startsAt.seconds).toJSDate();

  const initialValues = {
    label: workout.label,
    isPublic: workout.isPublic,
    color: workout.color,
    date: startsAtJSDate,
    time: startsAtJSDate,
  };

  const { enqueueSnackbar } = useSnackbar();

  const updateWorkout = async (values: UpdateWorkoutValuesType) => {
    onClose();
    const res = await updateWorkoutFirestore(values, workout.ref);

    if (res?.error)
      enqueueSnackbar(`Erro ao adicionar treino: ${res.error}.`, {
        variant: 'error',
      });
  };

  return (
    <Form
      onSubmit={updateWorkout}
      initialValues={initialValues}
      // @ts-ignore
      validate={makeValidate(updateWorkoutSchema)}
    >
      {({ handleSubmit, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(className, 'flex flex-col space-y-5')}
        >
          <TextField
            label="Título"
            name="label"
            placeholder="Adicionar Título"
            size="medium"
            autoFocus
            autoComplete="off"
          />
          <Switches label="Público" name="isPublic" data={{ label: '', value: true }} />
          <ColorField label="Cor" name="color" />
          <div className="flex space-x-5">
            <KeyboardDatePicker
              label="Data"
              name="date"
              format="dd/MM/yyyy"
              placeholder="dd/mm/yyyy"
            />
            <TimePicker label="Horário" name="time" />
          </div>
          <div className="flex space-x-5 mt-5">
            <Button
              className="bg-gray-500 text-white w-2/6"
              variant="contained"
              size="large"
              disabled={submitting}
              onClick={onClose}
            >
              <div className="text-sm sm:text-lg">Cancelar</div>
            </Button>
            <Button
              className="shadow-blue-500 hover:shadow-xl-blue-500 w-4/6"
              color="secondary"
              variant="contained"
              size="large"
              disabled={submitting}
              type="submit"
            >
              <div className="text-sm sm:text-lg">Editar</div>
            </Button>
          </div>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
};

export default UpdateWorkout;
