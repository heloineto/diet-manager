import { KeyboardDatePicker, makeValidate, TextField } from 'mui-rff';
import React, { useContext } from 'react';
import { Form } from 'react-final-form';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { Button, InputAdornment, Slider } from '@material-ui/core';
import clsx from 'clsx';

import { UserContext } from '@lib/context';
import GenderField from '@components/inputs/GenderField';
import UsernameField from '@components/inputs/UsernameField';
import ActivityLevelSlider from '@components/inputs/ActivityLevelSlider';

interface Props {
  className?: string;
  onClose?: () => void;
}

const UpdateMetrics = ({ className, onClose }: Props) => {
  // 'metrics.activityLevel',
  // 'metrics.height.current',
  // 'metrics.weight.current',
  // 'metrics.weight.desired',

  const { userDetails } = useContext(UserContext);

  const initialValues = {
    activityLevel: userDetails?.metrics?.activityLevel,
    heightCurrent: userDetails?.metrics?.height?.current,
    weightCurrent: userDetails?.metrics?.weight?.current,
    weightDesired: userDetails?.metrics?.weight?.desired,
  };

  const updateAccount = async () => {
    onClose && onClose();
  };

  return (
    <Form
      onSubmit={updateAccount}
      initialValues={initialValues}
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
          <div className="sm:col-span-3">
            <TextField
              label="Peso atual"
              name="weightCurrent"
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
                endAdornment: (
                  <InputAdornment position="end">Kg</InputAdornment>
                ),
              }}
            />
          </div>

          <div className="sm:col-span-3">
            <TextField
              label="Peso alvo"
              name="weightDesired"
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
                endAdornment: (
                  <InputAdornment position="end">Kg</InputAdornment>
                ),
              }}
            />
          </div>

          <div className="sm:col-span-6">
            <TextField
              label="Altura"
              name="heightCurrent"
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
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
            />
          </div>

          <div className="sm:col-span-6">
            <ActivityLevelSlider
              label="Nível de atividade"
              name="activityLevel"
            />
          </div>

          <div className="sm:col-span-6">
            <Button
              className="shadow-blue-500 hover:shadow-xl-blue-500 w-full group"
              color="secondary"
              variant="contained"
              size="small"
              endIcon={<ArrowRightIcon className="group-hover:ml-1 h-4 w-4" />}
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
  );
};

export default UpdateMetrics;
