import { Form } from 'react-final-form';
import clsx from 'clsx';
import { TextField } from 'mui-rff';
import { Button, ButtonGroup, InputAdornment } from '@material-ui/core';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { round } from 'lodash';
import { useMacrosInfo } from '@lib/hooks';

interface Props {
  className?: string;
  onClose?: () => void;
}

const UpdateNutritionGoals = ({ className, onClose }: Props) => {
  // 'goals.nutrition.carb',
  // 'goals.nutrition.prot',
  // 'goals.nutrition.fat',
  // 'goals.nutrition.kcal',

  const { carbInfo, protInfo, fatInfo } = useMacrosInfo();

  const updateNutritionGoals = () => {};

  return (
    <>
      <div className="my-auto">
        <ButtonGroup size="small" aria-label="outlined primary button group">
          <Button>Gramas</Button>
          <Button>Porcentagem</Button>
        </ButtonGroup>
      </div>
      <Form
        onSubmit={updateNutritionGoals}
        //initialValues={initialValues}
        // @ts-ignore
        //validate={makeValidate(updateAccountSchema)}
      >
        {({ handleSubmit, submitting, values }) => (
          <form
            className={clsx(
              className,
              'grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6'
            )}
            onSubmit={handleSubmit}
          >
            {[carbInfo, protInfo, fatInfo].map(({ label, key }) => (
              <div className="sm:col-span-2">
                <TextField
                  key={key}
                  label={label}
                  name={key}
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">g</InputAdornment>
                    ),
                  }}
                />
              </div>
            ))}

            <div className="sm:col-span-6">
              <Button
                className="shadow-blue-500 hover:shadow-xl-blue-500 w-full group"
                color="secondary"
                variant="contained"
                size="small"
                endIcon={
                  <ArrowRightIcon className="group-hover:ml-1 h-4 w-4" />
                }
                type="submit"
                disabled={submitting}
              >
                Próximo
              </Button>
            </div>
            <pre>{JSON.stringify(values, undefined, 2)}</pre>
          </form>
        )}
      </Form>
    </>
  );
};

export default UpdateNutritionGoals;
