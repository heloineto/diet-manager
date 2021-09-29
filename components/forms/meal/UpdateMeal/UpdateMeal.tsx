import type { UpdateMealValuesType } from './UpdateMeal.types';

import clsx from 'clsx';
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

import updateMealSchema from './UpdateMeal.schema';
import updateMealFirestore from './UpdateMeal.firestore';
import { DateTime } from 'luxon';
import ColorField from '@components/inputs/ColorField';

interface Props {
  className?: string;
  onClose: () => void;
  meal: MealWithRef;
}

const UpdateMeal = ({ className, onClose, meal }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  // @ts-ignore
  const startsAtJSDate = DateTime.fromSeconds(meal.startsAt.seconds).toJSDate();

  const initialValues = {
    label: meal.label,
    isPublic: meal.isPublic,
    color: meal.color,
    date: startsAtJSDate,
    time: startsAtJSDate,
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
          <TextField label="Título" name="label" placeholder="Adicionar Título" />
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
              Editar
            </Button>
          </div>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
};

export default UpdateMeal;
