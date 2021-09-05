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

interface Props {
  className?: string;
  onClose?: () => void;
}

const UpdateNutritionGoals = ({ className, onClose }: Props) => {
  const [inputMode, setInputMode] = useState<'grams' | 'percentage'>('grams');
  const [kcal, setKcal] = useState<string>('');

  // 'goals.nutrition.carb',
  // 'goals.nutrition.prot',
  // 'goals.nutrition.fat',
  // 'goals.nutrition.kcal',

  const { carbInfo, protInfo, fatInfo, kcalInfo } = useMacrosInfo();

  const updateKcal = ({
    values: { carb, prot, fat },
  }: FormState<
    {
      carb: any;
      prot: any;
      fat: any;
    },
    Partial<{
      carb: any;
      prot: any;
      fat: any;
    }>
  >) => {
    //console.log({ carb, prot, fat });

    setKcal(
      String(
        (Number(carb) || 0) * carbInfo.kcalPerUnit +
          (Number(prot) || 0) * protInfo.kcalPerUnit +
          (Number(fat) || 0) * fatInfo.kcalPerUnit
      )
    );

    console.log({
      carb:
        (Number(carb) * carbInfo.kcalPerUnit) /
        Number(
          String(
            (Number(carb) || 0) * carbInfo.kcalPerUnit +
              (Number(prot) || 0) * protInfo.kcalPerUnit +
              (Number(fat) || 0) * fatInfo.kcalPerUnit
          )
        ),
      prot:
        (Number(prot) * protInfo.kcalPerUnit) /
        Number(
          String(
            (Number(carb) || 0) * carbInfo.kcalPerUnit +
              (Number(prot) || 0) * protInfo.kcalPerUnit +
              (Number(fat) || 0) * fatInfo.kcalPerUnit
          )
        ),
      fat:
        (Number(fat) * fatInfo.kcalPerUnit) /
        Number(
          String(
            (Number(carb) || 0) * carbInfo.kcalPerUnit +
              (Number(prot) || 0) * protInfo.kcalPerUnit +
              (Number(fat) || 0) * fatInfo.kcalPerUnit
          )
        ),

      carbBack:
        (((Number(carb) * carbInfo.kcalPerUnit) /
          Number(
            String(
              (Number(carb) || 0) * carbInfo.kcalPerUnit +
                (Number(prot) || 0) * protInfo.kcalPerUnit +
                (Number(fat) || 0) * fatInfo.kcalPerUnit
            )
          )) *
          Number(
            String(
              (Number(carb) || 0) * carbInfo.kcalPerUnit +
                (Number(prot) || 0) * protInfo.kcalPerUnit +
                (Number(fat) || 0) * fatInfo.kcalPerUnit
            )
          )) /
        carbInfo.kcalPerUnit,
    });
  };

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
                      name={key}
                      type="number"
                      autoComplete="off"
                      disabled={inputMode !== 'percentage'}
                      onClick={() => {
                        if (inputMode !== 'percentage')
                          setInputMode('percentage');
                      }}
                      fieldProps={{
                        parse: (value) => {
                          if (Number(value) > 100) return '100';
                          if (Number(value) < 0) return '0';

                          return (
                            (Number(value) * kcalPerUnit) /
                            Number(
                              String(
                                (Number(values.carb) || 0) *
                                  carbInfo.kcalPerUnit +
                                  (Number(values.prot) || 0) *
                                    protInfo.kcalPerUnit +
                                  (Number(values.fat) || 0) *
                                    fatInfo.kcalPerUnit
                              )
                            )
                          );
                        },

                        format: (value) => {
                          return (
                            (value *
                              Number(
                                String(
                                  (Number(values.carb) || 0) *
                                    carbInfo.kcalPerUnit +
                                    (Number(values.prot) || 0) *
                                      protInfo.kcalPerUnit +
                                    (Number(values.fat) || 0) *
                                      fatInfo.kcalPerUnit
                                )
                              )) /
                            carbInfo.kcalPerUnit
                          );
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
                )
              )}
            </div>

            <div className="flex justify-center">
              <MuiTextField
                className="my-5 w-1/2"
                label={kcalInfo.label}
                name={kcalInfo.key}
                type="number"
                autoComplete="off"
                disabled={inputMode !== 'percentage'}
                onClick={() => {
                  if (inputMode !== 'percentage') setInputMode('percentage');
                }}
                value={kcal}
                onChange={(e) => {
                  let value = e.target.value;

                  if (Number(value) < 0) value = '0';

                  setKcal(value);
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

            <FormSpy subscription={{ values: true }} onChange={updateKcal} />

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
            <pre>{JSON.stringify({ ...values, kcal }, undefined, 2)}</pre>
          </form>
        )}
      </Form>
    </>
  );
};

export default UpdateNutritionGoals;
