import type { UpdateMealValuesType } from './UpdateMeal.types';

import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';
import { Button, IconButton, Toolbar } from '@material-ui/core';
import {
  KeyboardDatePicker,
  makeValidate,
  Radios,
  Switches,
  TextField,
  TimePicker,
} from 'mui-rff';
import { XIcon } from '@heroicons/react/outline';

import updateMealSchema from './UpdateMeal.schema';
import updateMealFirestore from './UpdateMeal.firestore';

interface Props {
  className?: string;
  onClose: () => void;
  meal: MealWithRef;
}

const UpdateMeal = ({ className, onClose, meal }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    label: meal.label,
    isPublic: meal.isPublic,
    color: meal.color,
    date: meal.startsAt,
    time: meal.startsAt,
  };

  const updateMeal = async (values: UpdateMealValuesType) => {
    onClose();
    const res = await updateMealFirestore(values, meal.ref);

    if (res?.error)
      enqueueSnackbar(`Erro ao adicionar refeição: ${res.error}.`, {
        variant: 'error',
      });
  };

  return (
    <Form
      onSubmit={updateMeal}
      initialValues={initialValues}
      // @ts-ignore
      validate={makeValidate(updateMealSchema)}
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
          />
          <Switches
            label="Público"
            name="isPublic"
            data={{ label: '', value: true }}
          />
          <Radios
            label="Cor"
            name="color"
            data={[
              { label: 'red', value: '#fef2f2' },
              { label: 'yellow', value: '#fffbeb' },
              { label: 'green', value: '#ecfdf5' },
              { label: 'blue', value: '#eff6ff' },
              { label: 'indigo', value: '#eef2ff' },
              { label: 'purple', value: '#f5f3ff' },
              { label: 'pink', value: '#fdf2f8' },
            ]}
            radioGroupProps={{ row: true }}
          />
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
              disabled={submitting}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              className="shadow-blue-500 hover:shadow-xl-blue-500 w-4/6"
              color="secondary"
              variant="contained"
              disabled={submitting}
              type="submit"
            >
              Adicionar
            </Button>
          </div>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
};

export default UpdateMeal;
