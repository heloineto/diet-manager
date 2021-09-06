import { Form } from 'react-final-form';
import clsx from 'clsx';
import { TextField } from 'mui-rff';
import { Button, ButtonGroup, InputAdornment } from '@material-ui/core';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { round } from 'lodash';
import { useMacrosInfo } from '@lib/hooks';
import { useContext, useState } from 'react';
import createDecorator from 'final-form-calculate';
import updateNutritionGoalsFirestore from './UpdateNutritionGoals.firestore';
import { UserContext } from '@lib/context';

interface Props {
  className?: string;
  onClose?: () => void;
}

const UpdateNutritionGoals = ({ className, onClose }: Props) => {
  const [inputMode, setInputMode] = useState<'grams' | 'percentage'>('grams');
  const { userDetails } = useContext(UserContext);

  const initialValues = {
    carb: userDetails?.goals?.nutrition?.carb || 0,
    prot: userDetails?.goals?.nutrition?.prot || 0,
    fat: userDetails?.goals?.nutrition?.fat || 0,
    kcal: userDetails?.goals?.nutrition?.kcal || 0,
  };

  const { carbInfo, protInfo, fatInfo, kcalInfo } = useMacrosInfo();

  const updateNutritionGoals = async ({
    carb,
    prot,
    fat,
    kcal,
  }: UpdateNutritionGoalsValuesType) => {
    onClose && onClose();

    const nutritionGoals = {
      carb: Number(carb) || 0,
      prot: Number(prot) || 0,
      fat: Number(fat) || 0,
      kcal: Number(kcal) || 0,
    };

    await updateNutritionGoalsFirestore(nutritionGoals);
  };

  const decorators = [
    createDecorator({
      field: /^(carb|prot|fat)$/,
      updates: (
        value,
        field,
        allValues: Partial<UpdateNutritionGoalsValuesType> | undefined,
        prevValues
      ) => {
        if (inputMode !== 'grams') return {};
        if (!allValues) return {};

        const { carb, prot, fat } = allValues;

        const calculatedKcal =
          (Number(carb) || 0) * carbInfo.kcalPerUnit +
          (Number(prot) || 0) * protInfo.kcalPerUnit +
          (Number(fat) || 0) * fatInfo.kcalPerUnit;

        const updates = {
          kcal: String(round(calculatedKcal, 2)),
        };

        [carbInfo, protInfo, fatInfo].forEach(({ key, kcalPerUnit }) =>
          Object.assign(updates, {
            [`${key}Percentage`]: String(
              round(
                (Number(allValues[key]) * kcalPerUnit * 100) /
                  Number(calculatedKcal),
                2
              ) || 0
            ),
          })
        );

        return updates;
      },
    }),
    createDecorator({
      field: /^(carbPercentage|protPercentage|fatPercentage|kcal)$/,
      updates: (
        value,
        field,
        allValues: Partial<UpdateNutritionGoalsValuesType> | undefined,
        prevValues
      ) => {
        if (inputMode !== 'percentage') return {};
        if (!allValues) return {};

        const updates = {};

        [carbInfo, protInfo, fatInfo].forEach(({ key, kcalPerUnit }) =>
          Object.assign(updates, {
            [key]: String(
              round(
                (Number(allValues[`${key}Percentage`]) *
                  Number(allValues.kcal)) /
                  (kcalPerUnit * 100),
                2
              ) || 0
            ),
          })
        );

        return updates;
      },
    }),
  ];

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
        initialValues={initialValues}
        // @ts-ignore
        //validate={makeValidate(updateAccountSchema)}
        decorators={decorators}
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
                          step: '.01',
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
                      }}
                      InputProps={{
                        inputProps: {
                          min: 0,
                          max: 100,
                          step: '.01',
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
