import type { FormState } from 'final-form';

import { Form, FormSpy } from 'react-final-form';
import clsx from 'clsx';
import { TextField } from 'mui-rff';
import {
  Button,
  ButtonGroup,
  InputAdornment,
  TextField as MuiTextField,
} from '@material-ui/core';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { round } from 'lodash';
import { useMacrosInfo } from '@lib/hooks';
import { useState } from 'react';
import createDecorator from 'final-form-calculate';

interface Props {
  className?: string;
  onClose?: () => void;
}

const UpdateNutritionGoals = ({ className, onClose }: Props) => {
  const [inputMode, setInputMode] = useState<'grams' | 'percentage'>('grams');

  const { carbInfo, protInfo, fatInfo, kcalInfo } = useMacrosInfo();

  const updateNutritionGoals = () => {};

  const decorators = {};

  /**
   * 
   * [carbInfo, protInfo, fatInfo].forEach(({ key, kcalPerUnit }) =>
    Object.assign(decorators, {
      [key]: createDecorator({
        field: key,
        updates: {
          [`${key}Percentage`]: (_, allValues) => {
            if (!allValues) return undefined;

            return (
              (Number(allValues[key]) * kcalPerUnit) / Number(allValues.kcal) ||
              undefined
            );
          },
        },
      }),
    })
  );
   */

  Object.assign(decorators, {
    calcKcal: createDecorator({
      field: /^(carb|prot|fat)$/,
      updates: (value, field, allValues, prevValues) => {
        // console.log({ value, field, allValues, prevValues });

        if (!allValues) return {};

        const { carb, prot, fat } = allValues;

        const updates = {
          kcal:
            String(
              (Number(carb) || 0) * carbInfo.kcalPerUnit +
                (Number(prot) || 0) * protInfo.kcalPerUnit +
                (Number(fat) || 0) * fatInfo.kcalPerUnit
            ) || '',
        };

        [carbInfo, protInfo, fatInfo].forEach(({ key, kcalPerUnit }) =>
          Object.assign(updates, {
            [`${key}Percentage`]:
              String(
                (Number(allValues[key]) * kcalPerUnit) / Number(allValues.kcal)
              ) || '',
          })
        );

        console.log(updates);

        return updates;
      },
    }),
  });

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
        decorators={[decorators.calcKcal]}
      >
        {({ handleSubmit, submitting, values }) => (
          <form className={clsx(className)} onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-x-1 gap-y-2.5 sm:gap-y-0 sm:gap-x-2.5">
              {[carbInfo, protInfo, fatInfo].map(
                ({ label, key, kcalPerUnit }) => (
                  <div
                    key={key}
                    className="flex sm:flex-col gap-x-1 sm:gap-x-0 sm:gap-y-5"
                  >
                    <TextField
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
                          if (Number(value) < 0) return '0';

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
                      label={label}
                      name={`${key}Percentage`}
                      type="number"
                      autoComplete="off"
                      disabled={inputMode !== 'percentage'}
                      onClick={() => {
                        if (inputMode !== 'percentage')
                          setInputMode('percentage');
                      }}
                      fieldProps={{
                        parse: (value: string) => {
                          if (Number(value) > 100) return '100';
                          if (Number(value) < 0) return '0';

                          return value;
                        },
                        /*

                        format: (value) => {
                          console.log('format');

                          return (
                            (value * Number(kcal)) / carbInfo.kcalPerUnit ||
                            undefined
                          );
                        }, */
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
                )
              )}
            </div>

            <div className="flex justify-center">
              <TextField
                className="my-5 w-1/2"
                label={kcalInfo.label}
                name={kcalInfo.key}
                type="number"
                autoComplete="off"
                disabled={inputMode !== 'percentage'}
                onClick={() => {
                  if (inputMode !== 'percentage') setInputMode('percentage');
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
            </div>

            {/**<FormSpy subscription={{ values: true }} onChange={calcKcal} /> */}

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
            <pre>{JSON.stringify({ ...values }, undefined, 2)}</pre>
          </form>
        )}
      </Form>
    </>
  );
};

export default UpdateNutritionGoals;
