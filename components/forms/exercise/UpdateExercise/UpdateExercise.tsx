import { AnyObject, Field } from 'react-final-form';
import classNames from 'clsx';
import { useEffect, useRef } from 'react';
import { TextField } from 'mui-rff';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { Form } from 'react-final-form';
import updateExerciseFirestore from './UpdateExercise.firestore';
import NumberField from '@components/inputs/NumberField';

interface Props {
  className?: string;
  exercise: Exercise;
  workout: WorkoutWithRef;
  onClickOutside: () => void;
  moveUp: () => void;
  moveDown: () => void;
}

const UpdateExercise = ({
  className,
  exercise,
  workout,
  onClickOutside,
  moveUp,
  moveDown,
}: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const node = useRef<HTMLTableRowElement>(null);

  let submit: () => Promise<AnyObject | undefined> | undefined = () => undefined;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (node?.current?.contains(e.target as Node)) return;

      submit && submit();
      onClickOutside();
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [submit, onClickOutside]);

  const updateExercise = async ({
    label,
    sets,
    reps,
    weight,
  }: UpdateExerciseValuesType) => {
    await updateExerciseFirestore(
      {
        label,
        sets: Number(sets),
        reps: reps.map((eachReps) => Number(eachReps)),
        weight: weight.map((weightWeight) => Number(weightWeight)),
      },
      exercise.index,
      workout.ref
    );
  };

  const initialValues = {
    // index: exercise.index,
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
        {({ handleSubmit, values, submitting }) => {
          submit = handleSubmit;

          return (
            <tr
              onSubmit={handleSubmit}
              className={classNames(
                className,
                'table-row cursor-pointer relative odd:bg-gray-50 group h-16'
              )}
              ref={node}
            >
              <td className="flex justify-center items-center gap-x-2">
                <div className="font-semibold text-gray-700 text-base">
                  {exercise.index + 1}
                </div>
                <div className="flex flex-col">
                  <IconButton
                    className="p-1 h-7 w-7 hover:text-blue-600"
                    onClick={moveUp}
                  >
                    <ChevronUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </IconButton>
                  <IconButton
                    className="p-1 h-7 w-7 hover:text-blue-600"
                    onClick={moveDown}
                  >
                    <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </IconButton>
                </div>
              </td>

              <td>
                <TextField
                  label="Exercício"
                  name="label"
                  autoFocus
                  autoComplete="off"
                  variant="standard"
                />
              </td>
              <td>
                <NumberField
                  label="Sets"
                  name="sets"
                  min={0}
                  max={10}
                  variant="standard"
                />
              </td>
              <td>
                <div className="flex">
                  <Field name="reps">
                    {(props) =>
                      Array.from({ length: values.sets }, (_, idx) => (
                        <NumberField
                          key={idx}
                          label={compact ? `${idx + 1}` : `Reps ${idx + 1}`}
                          name={`reps.${idx}`}
                          min={0}
                          variant="standard"
                        />
                      ))
                    }
                  </Field>
                </div>
              </td>
              <td>
                <div className="flex">
                  <Field name="weight">
                    {(props) =>
                      Array.from({ length: values.sets }, (_, idx) => (
                        <NumberField
                          key={idx}
                          label={compact ? `${idx + 1}` : `Peso ${idx + 1}`}
                          name={`weight.${idx}`}
                          min={0}
                          variant="standard"
                        />
                      ))
                    }
                  </Field>
                </div>
              </td>
              {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
            </tr>
          );
        }}
      </Form>
    </>
  );
};

export default UpdateExercise;
