import { Button, Dialog } from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  Switches,
  TextField,
  TimePicker,
} from 'mui-rff';
import { Form } from 'react-final-form';

interface Props {
  onCancel: () => void;
}

export const AddMeal = ({ onCancel }: Props) => {
  const addMeal = async () => {};

  return (
    <Form
      onSubmit={addMeal}
      initialValues={{
        date: Date.now(),
      }}
    >
      {({ handleSubmit, submitError, submitting, form, values }) => (
        <form onSubmit={handleSubmit} className="flex flex-col def-space-y">
          <fieldset className="input-fields-wrapper">
            <TextField
              label="Título"
              name="label"
              placeholder="Adicionar Título"
            />
            <Switches
              label="Público"
              name="public"
              data={{ label: 'Feature X', value: true }}
            />
            {/* <ColorPickerField
              name="color"
              initialValue={initialValues?.color}
            /> */}
            <div className="flex space-x-5">
              <KeyboardDatePicker
                label="Data"
                name="date"
                format="dd/MM/yyyy"
                placeholder="dd/mm/yyyy"
              />
              <TimePicker label="Horário" name="time" />
            </div>
          </fieldset>
          <div className="flex space-x-5 mt-5">
            <Button
              className="bg-gray-500 text-white w-2/5"
              variant="contained"
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button
              className="shadow-blue-500 hover:shadow-xl-blue-500 w-3/5"
              color="secondary"
              variant="contained"
              disabled={submitting}
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
