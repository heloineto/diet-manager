import { Form } from 'react-final-form';
import clsx from 'clsx';
import { TextField } from 'mui-rff';
import { Button, ButtonGroup, InputAdornment } from '@material-ui/core';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { round } from 'lodash';
import { useMacrosInfo } from '@lib/hooks';
import { useState } from 'react';

interface Props {
  className?: string;
  onClose?: () => void;
}

const UpdateNutritionGoals = ({ className, onClose }: Props) => {
  const [inputMode, setInputMode] = useState<'grams' | 'percentage'>('grams');

  // 'goals.nutrition.carb',
  // 'goals.nutrition.prot',
  // 'goals.nutrition.fat',
  // 'goals.nutrition.kcal',

  const { carbInfo, protInfo, fatInfo, kcalInfo } = useMacrosInfo();

  const updateNutritionGoals = () => {};

  return (
    <>
      <div className="flex justify-center mb-5">
        <ButtonGroup
          size="small"
          color="secondary"
          aria-label="outlined primary button group"
          disableElevation
        >
          <Button
            className="w-36"
            variant={inputMode === 'grams' ? 'contained' : 'outlined'}
            onClick={() => setInputMode('grams')}
          >
            Gramas
          </Button>
          <Button
            className="w-36"
            onClick={() => setInputMode('percentage')}
            variant={inputMode === 'percentage' ? 'contained' : 'outlined'}
          >
            Porcentagem
          </Button>
        </ButtonGroup>
      </div>
      <Form
        onSubmit={updateNutritionGoals}
        //initialValues={initialValues}
        // @ts-ignore
        //validate={makeValidate(updateAccountSchema)}
      >
        {({ handleSubmit, submitting, values }) => (
          <form className={clsx(className)} onSubmit={handleSubmit}>
            <div className="grid grid-flow-col grid-rows-2 grid-cols-1 gap-y-5 sm:grid-cols-3 sm:gap-x-3">
              {[carbInfo, protInfo, fatInfo].map(({ label, key }) => (
                <>
                  <TextField
                    key={key}
                    label={label}
                    name={key}
                    type="number"
                    autoComplete="off"
                    disabled={inputMode !== 'grams'}
                    onClick={() => {
                      if (inputMode !== 'grams') setInputMode('grams');
                    }}
                    fieldProps={{
                      parse: (value) => {
                        if (value < 0) return 0;
                        return value;
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    key={key}
                    label={label}
                    name={`${key}`}
                    type="number"
                    autoComplete="off"
                    disabled={inputMode !== 'percentage'}
                    onClick={() => {
                      if (inputMode !== 'percentage')
                        setInputMode('percentage');
                    }}
                    fieldProps={{
                      parse: (value) => {
                        if (value > 100) return 100;
                        if (value < 0) return 0;
                        return value;
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="font-bold text-gray-500">%</div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              ))}
            </div>

            <div className="flex justify-center">
              <TextField
                className="my-5 w-1/2"
                key={kcalInfo.key}
                label={kcalInfo.label}
                name={kcalInfo.key}
                type="number"
                autoComplete="off"
                onClick={() => {
                  if (inputMode !== 'percentage') setInputMode('percentage');
                }}
                fieldProps={{
                  parse: (value) => {
                    if (value > 100) return 100;
                    if (value < 0) return 0;
                    return value;
                  },
                }}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 100,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <div className="font-bold text-gray-500">%</div>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

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
