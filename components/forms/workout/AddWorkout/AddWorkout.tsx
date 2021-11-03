import { useContext } from 'react';
import classNames from 'clsx';
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
import addWorkoutSchema from './AddWorkout.schema';
import addWorkoutFirestore from './AddWorkout.firestore';
import { SelectedDateContext } from '@lib/context';
import ColorField from '@components/inputs/ColorField';
import { useColors } from '@lib/hooks';
import usePrevWorkouts from './AddWorkout.usePrevWorkouts';

interface Props {
  className?: string;
  onClose: () => void;
}

const AddWorkout = ({ className, onClose }: Props) => {
  const { selectedDate } = useContext(SelectedDateContext);
  const colors = useColors();
  const { enqueueSnackbar } = useSnackbar();
  const { prevWorkouts } = usePrevWorkouts();

  const addWorkout = async (
    values: AddWorkoutValuesType & { exercises?: Workout['exercises'] }
  ) => {
    onClose();
    const res = await addWorkoutFirestore(values);

    if (res?.error)
      enqueueSnackbar(`Erro ao adicionar treino: ${res.error}.`, {
        variant: 'error',
      });
  };

  return (
    <Form
      onSubmit={addWorkout}
      initialValues={{
        date: selectedDate.toJSDate(),
        time: new Date(),
        isPublic: false,
        saveWorkout: true,
        color: '#eff6ff',
      }}
      validate={makeValidate(addWorkoutSchema) as any}
    >
      {({ handleSubmit, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className={classNames(className, 'flex flex-col space-y-5')}
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
              <div className="text-sm sm:text-lg">Adicionar</div>
            </Button>
          </div>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
          <div className="w-full flex flex-col">
            {prevWorkouts.map((prevWorkout) => (
              <Button
                key={prevWorkout.label}
                className="shadow-none text-gray-500"
                size="small"
                variant="contained"
                style={{
                  color: colors?.[prevWorkout?.color]?.[900] ?? 'white',
                  backgroundColor: colors?.[prevWorkout?.color]?.[200] ?? 'white',
                }}
                onClick={() =>
                  addWorkout({
                    ...prevWorkout,
                    date: selectedDate.toJSDate(),
                    time: new Date(),
                  })
                }
              >
                {prevWorkout.label}
              </Button>
            ))}
          </div>
        </form>
      )}
    </Form>
  );
};

export default AddWorkout;
