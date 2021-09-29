import clsx from 'clsx';
import { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import {
  KeyboardDatePicker,
  makeValidate,
  Radios,
  Switches,
  TextField,
  TimePicker,
} from 'mui-rff';

import addWorkoutSchema from './AddWorkout.schema';
import addWorkoutFirestore from './AddWorkout.firestore';
import { SelectedDateContext } from '@lib/context';
import ColorField from '@components/inputs/ColorField';

interface Props {
  className?: string;
  onClose: () => void;
}

const AddWorkout = ({ className, onClose }: Props) => {
  const { selectedDate } = useContext(SelectedDateContext);

  const { enqueueSnackbar } = useSnackbar();

  const addWorkout = async (values: AddWorkoutValuesType) => {
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
      // @ts-ignore
      validate={makeValidate(addWorkoutSchema)}
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
              <div className="text-sm sm:text-lg">Adicionar</div>
            </Button>
          </div>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
};

export default AddWorkout;
