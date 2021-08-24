import { Button, Dialog } from '@material-ui/core';
import {
  Checkboxes,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  Radios,
  Switches,
  TextField,
  TimePicker,
} from 'mui-rff';
import { Form } from 'react-final-form';
import clsx from 'clsx';

interface Props {
  className?: string;
  onCancel: () => void;
}

export const AddMeal = ({ className, onCancel }: Props) => {
  const addMeal = async () => {};

  return (
    <Form
      onSubmit={addMeal}
      initialValues={{
        date: new Date(),
        time: new Date(),
      }}
    >
      {({ handleSubmit, submitError, submitting, form, values }) => (
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
            name="public"
            data={{ label: '', value: true }}
          />
          <Radios
            label="Cor"
            name="color"
            data={[
              { label: 'Masculino', value: 'M' },
              { label: 'Feminino', value: 'F' },
              { label: 'Outro', value: 'O' },
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
              className="bg-gray-500 text-white w-2/5"
              variant="contained"
              disabled={submitting}
              onClick={() => onCancel && onCancel()}
            >
              Cancelar
            </Button>
            <Button
              className="shadow-blue-500 hover:shadow-xl-blue-500 w-3/5"
              color="secondary"
              variant="contained"
              disabled={submitting}
              type="submit"
            >
              Adicionar
            </Button>
          </div>
          <pre>{JSON.stringify(values, undefined, 2)}</pre>
        </form>
      )}
    </Form>
  );
};
