import { Form } from 'react-final-form';
import classNames from 'clsx';
import { Button, ButtonGroup, InputAdornment } from '@material-ui/core';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useMacrosInfo } from '@lib/hooks';
import { useContext, useState } from 'react';
import updateNutritionGoalsFirestore from './UpdateNutritionGoals.firestore';
import { UserContext } from '@lib/context';
import NumberField from '@components/inputs/NumberField';
import useUpdateNutritionGoalsDecorators from './UpdateNutritionGoals.decorators';

interface Props {
  className?: string;
  onClose?: () => void;
  submitButtonProps?: ButtonProps;
  submitButtonInnerText?: string;
}

const UpdateNutritionGoals = ({
  className,
  onClose,
  submitButtonProps,
  submitButtonInnerText,
}: Props) => {
  const [inputMode, setInputMode] = useState<'grams' | 'percentage'>('grams');
  const { userDetails } = useContext(UserContext);

  const initialValues = {
    carb: userDetails?.goals?.nutrition?.carb || 0,
    prot: userDetails?.goals?.nutrition?.prot || 0,
    fat: userDetails?.goals?.nutrition?.fat || 0,
    kcal: userDetails?.goals?.nutrition?.kcal || 0,
  };

  const { carbInfo, protInfo, fatInfo, kcalInfo } = useMacrosInfo();
  const { gramsDecorators, percentageDecorators } = useUpdateNutritionGoalsDecorators();

  const updateNutritionGoals = async ({
    carb,
    prot,
    fat,
    kcal,
  }: UpdateNutritionGoalsValuesType) => {
    onClose?.();
    setInputMode('grams');

    const nutritionGoals = {
      carb: Number(carb) || 0,
      prot: Number(prot) || 0,
      fat: Number(fat) || 0,
      kcal: Number(kcal) || 0,
    };

    await updateNutritionGoalsFirestore(nutritionGoals);
  };

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
        decorators={
          (inputMode === 'grams' ? gramsDecorators : percentageDecorators) as any
        }
      >
        {({ handleSubmit, submitting, values }) => (
          <form className={className} onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-x-1 gap-y-2.5 sm:gap-y-0 sm:gap-x-2.5">
              {[carbInfo, protInfo, fatInfo].map(({ label, key }) => (
                <div
                  key={key}
                  className="w-full flex sm:flex-col gap-x-1 sm:gap-x-0 sm:gap-y-5"
                >
                  <NumberField
                    label={label}
                    name={key}
                    min={0}
                    step={0.01}
                    disabled={inputMode !== 'grams'}
                    onClick={() => {
                      if (inputMode !== 'grams') setInputMode('grams');
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                  />
                  <NumberField
                    label={label}
                    name={`${key}Percentage`}
                    min={0}
                    max={100}
                    step={0.01}
                    disabled={inputMode !== 'percentage'}
                    onClick={() => {
                      if (inputMode !== 'percentage') setInputMode('percentage');
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="font-bold text-gray-500">%</div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <NumberField
                className="my-5 w-1/2"
                label={kcalInfo.label}
                name={kcalInfo.key}
                min={0}
                step={0.01}
                disabled={inputMode !== 'percentage'}
                onClick={() => {
                  if (inputMode !== 'percentage') setInputMode('percentage');
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
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
                {...submitButtonProps}
              >
                {submitButtonInnerText ?? 'Próximo'}
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
