import clsx from 'clsx';
import { makeValidate, TextField } from 'mui-rff';
import { useEffect, useRef } from 'react';
import { Form } from 'react-final-form';
import updateExerciseSchema from './UpdateExercise.schema';

interface Props {
  className?: string;
  exercise: Exercise;
  onClickOutside: () => void;
}

const UpdateExercise = ({ className, onClickOutside, exercise }: Props) => {
  const node = useRef<HTMLTableRowElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (node?.current?.contains(e.target as Node)) return;

    //! TRIGGER SUBMIT
    onClickOutside();
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const updateExercise = async () => {};

  const initialValues = {
    index: exercise.index,
    label: exercise.label,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
  };

  return (
    <>
      <Form
        onSubmit={updateExercise}
        initialValues={initialValues}
        // @ts-ignore
        // validate={makeValidate(updateExerciseSchema)}
      >
        {({ handleSubmit, submitting }) => (
          <tr
            onSubmit={handleSubmit}
            className={clsx(
              className,
              'table-row cursor-pointer relative odd:bg-gray-50 group py-2.5'
            )}
            ref={node}
          >
            <td>
              <TextField
                label="Nº"
                name="index"
                type="number"
                autoComplete="off"
                fieldProps={{
                  parse: (value) => {
                    if (Number(value) < 0) return '0';
                    return value;
                  },
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                    step: '1',
                  },
                }}
              />
            </td>

            <td>
              <TextField label="Exercício" name="label" autoFocus autoComplete="off" />
            </td>
            <td>
              <TextField label="Sets" name="sets" autoComplete="off" />
            </td>
            <td>
              <TextField label="Reps" name="reps" autoComplete="off" />
            </td>
            <td>
              <TextField label="Peso" name="weight" autoComplete="off" />
            </td>
          </tr>
        )}
      </Form>
    </>
  );
};

export default UpdateExercise;
