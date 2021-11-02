import { useMacrosInfo } from '@lib/hooks';
import createDecorator from 'final-form-calculate';
import { round } from 'lodash';
import { useMemo } from 'react';

const useUpdateNutritionGoalsDecorators = (inputMode: 'grams' | 'percentage') => {
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
                  (Number(allValues[key]) * kcalPerUnit * 100) / Number(calculatedKcal),
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
                  // @ts-ignore
                  (Number(allValues[`${key}Percentage`]) * Number(allValues.kcal)) /
                    (kcalPerUnit * 100),
                  2
                ) || 0
              ),
            })
          );

          return updates;
        },
      }),
    ],
    [carbInfo, fatInfo, protInfo, inputMode]
  );

  return decorators;
};

export default useUpdateNutritionGoalsDecorators;
