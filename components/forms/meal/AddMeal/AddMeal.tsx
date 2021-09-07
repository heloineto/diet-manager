import type { AddMealValuesType } from './AddMeal.types';

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

import addMealSchema from './AddMeal.schema';
import addMealFirestore from './AddMeal.firestore';
import { useContext } from 'react';
import { SelectedDateContext } from '@lib/context';

interface Props {
  className?: string;
  onClose: () => void;
}

const AddMeal = ({ className, onClose }: Props) => {
  const { selectedDate } = useContext(SelectedDateContext);

  const { enqueueSnackbar } = useSnackbar();

  const addMeal = async (values: AddMealValuesType) => {
    onClose();
    const res = await addMealFirestore(values);

    if (res?.error)
      enqueueSnackbar(`Erro ao adicionar refeição: ${res.error}.`, {
        variant: 'error',
      });
  };

  return (
    <Form
      onSubmit={addMeal}
      initialValues={{
        date: selectedDate.toJSDate(),
        time: new Date(),
        isPublic: false,
        color: '#eff6ff',
      }}
      // @ts-ignore
      validate={makeValidate(addMealSchema)}
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

export default AddMeal;
