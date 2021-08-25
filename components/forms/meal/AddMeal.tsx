import { Button, IconButton, Toolbar } from '@material-ui/core';
import {
  KeyboardDatePicker,
  Radios,
  Switches,
  TextField,
  TimePicker,
} from 'mui-rff';
import { Form } from 'react-final-form';
import clsx from 'clsx';
import { XIcon } from '@heroicons/react/outline';
import { auth, firestore, serverTimestamp } from '@lib/firebase';

interface Props {
  className?: string;
  onClose: () => void;
}

export const AddMeal = ({ className, onClose }: Props) => {
  const addMeal = async ({
    label,
    isPublic,
    color,
    date,
    time,
  }: {
    label: string;
    isPublic: boolean;
    color: Meal['color'];
    date: Date;
    time: Date;
  }) => {
    onClose();

    const newMeal: Meal = {
      label,
      color,
      isPublic,
      startsAt: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      ),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      foods: [],
    };

    console.log(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      )
    );

    if (auth?.currentUser?.uid) {
      const mealsRef = firestore
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('meals');

      await mealsRef.add(newMeal);
    } else {
    }
  };

  return (
    <>
      <Toolbar
        className="bg-gray-300 text-lg font-bold text-gray-800 mb-2.5 mt-px rounded-t-xl"
        style={{
          boxShadow: 'inset 0 0.75px 0 #fff',
        }}
      >
        Adicionar Refeição
        <IconButton
          className="ml-auto"
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <XIcon className="w-7 h-7" />
        </IconButton>
      </Toolbar>
      <div className="p-2.5">
        <Form
          onSubmit={addMeal}
          initialValues={{
            date: new Date(),
            time: new Date(),
            isPublic: false,
            color: 'blue',
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
                name="isPublic"
                data={{ label: '', value: true }}
              />
              <Radios
                label="Cor"
                name="color"
                data={[
                  { label: 'red', value: 'red' },
                  { label: 'yellow', value: 'yellow' },
                  { label: 'green', value: 'green' },
                  { label: 'blue', value: 'blue' },
                  { label: 'indigo', value: 'indigo' },
                  { label: 'purple', value: 'purple' },
                  { label: 'pink', value: 'pink' },
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
                  onClick={onClose}
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
      </div>
    </>
  );
};
