import { TextField } from 'mui-rff';
import React, { useContext } from 'react';
import { Form } from 'react-final-form';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { Button, InputAdornment } from '@material-ui/core';
import clsx from 'clsx';

import { UserContext } from '@lib/context';
import ActivityLevelSlider from '@components/inputs/ActivityLevelSlider';
import updateMetricsFirestore from './UpdateMetrics.firestore';
import NumberField from '@components/inputs/NumberField';

interface Props {
  className?: string;
  onClose?: () => void;
  submitButtonProps?: {
    innerText?: string;
  };
}

const UpdateMetrics = ({ className, onClose, submitButtonProps }: Props) => {
  const { userDetails } = useContext(UserContext);

  const initialValues = {
    activityLevel: userDetails?.metrics?.activityLevel,
    heightCurrent: userDetails?.metrics?.height?.current,
    weightCurrent: userDetails?.metrics?.weight?.current,
    weightDesired: userDetails?.metrics?.weight?.desired,
  };

  const updateMetrics = async ({
    weightCurrent,
    weightDesired,
    heightCurrent,
    activityLevel,
  }: UpdateMetricsValuesType) => {
    onClose && onClose();

    const metrics = {
      activityLevel,
      weight: {
        current: Number(weightCurrent) || 0,
        desired: Number(weightDesired) || 0,
      },
      height: {
        current: Number(heightCurrent) || 0,
      },
    };

    await updateMetricsFirestore(metrics);
  };

  return (
    <Form onSubmit={updateMetrics} initialValues={initialValues}>
      {({ handleSubmit, submitting, values }) => (
        <form
          className={clsx(
            className,
            'grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6'
          )}
          onSubmit={handleSubmit}
        >
          <div className="sm:col-span-3">
            <NumberField
              label="Peso atual"
              name="weightCurrent"
              min={0}
              step={0.01}
              InputProps={{
                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
              }}
            />
          </div>

          <div className="sm:col-span-3">
            <NumberField
              label="Peso alvo"
              name="weightDesired"
              min={0}
              InputProps={{
                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
              }}
            />
          </div>

          <div className="sm:col-span-6">
            <NumberField
              label="Altura"
              name="heightCurrent"
              min={0}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
            />
          </div>

          <div className="sm:col-span-6">
            <ActivityLevelSlider label="Nível de atividade" name="activityLevel" />
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
              {submitButtonProps?.innerText || 'Próximo'}
            </Button>
          </div>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
};

export default UpdateMetrics;
