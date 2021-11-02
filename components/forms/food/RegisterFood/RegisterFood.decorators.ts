import { useMacrosInfo } from '@lib/hooks';
import createDecorator from 'final-form-calculate';
import { round } from 'lodash';
import { useMemo } from 'react';

const useRegisterFoodDecorators = () => {
  const { carbInfo, protInfo, fatInfo, kcalInfo } = useMacrosInfo();

  const decorators = useMemo(
    () => [
      createDecorator({
        field: /^(carb|prot|fat)$/,
        updates: (
          value,
          field,
          allValues: Partial<UpdateNutritionGoalsValuesType> | undefined,
          prevValues
        ) => {
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
                  (Number(allValues[key]) * kcalPerUnit * 100) / Number(calculatedKcal),
                  2
                ) || 0
              ),
            })
          );

          return updates;
        },
      }),
    ],
    [carbInfo, fatInfo, protInfo]
  );

  return decorators;
};

export default useRegisterFoodDecorators;
