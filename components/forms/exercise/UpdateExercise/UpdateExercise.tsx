import clsx from 'clsx';
import { makeValidate, TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import updateExerciseSchema from './UpdateExercise.schema';

interface Props {
  className?: string;
  exercise: Exercise;
}

const UpdateExercise = ({ className, exercise }: Props) => {
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
              'table-row cursor-pointer relative odd:bg-gray-50 group'
            )}
          >
            <td
              className={clsx(
                // id === 'carb' &&
                //   'bg-indigo-100 text-indigo-900 group-odd:bg-indigo-200',
                // id === 'prot' &&
                //   'bg-blue-100 text-blue-900 group-odd:bg-blue-200',
                // id === 'fat' &&
                //   'bg-yellow-100 text-yellow-900 group-odd:bg-yellow-200',
                // id === 'kcal' &&
                //   'bg-green-100 text-green-900 group-odd:bg-green-200',
                // id === 'label'
                //   ? 'w-6/12 text-left font-medium'
                //   : 'font-semibold md:font-medium',
                // selected &&
                //   `
                //   first:after:absolute
                //   first:after:top-0
                //   first:after:left-0
                //   first:after:w-full
                //   first:after:h-full
                //   first:after:border-2
                //   first:after:border-blue-500
                //   first:after:inline-block
                //   `,
                // selected && aboveSelected && 'first:after:border-t',
                // selected && belowSelected && 'first:after:border-b',
                // `
                // group-hover:first:after:absolute
                // group-hover:first:after:top-0
                // group-hover:first:after:left-0
                // group-hover:first:after:w-full
                // group-hover:first:after:h-full
                // group-hover:first:after:shadow-inner
                // `,
                'table-cell border-b w-1/12 h-8'
              )}
            >
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
                    step: '.01',
                  },
                }}
              />
            </td>

            <td>
              <TextField
                label="Nome"
                name="label"
                // placeholder="Adicionar Título"
                autoFocus
                autoComplete="off"
              />
            </td>
          </tr>
        )}
      </Form>
    </>
  );
};

export default UpdateExercise;
