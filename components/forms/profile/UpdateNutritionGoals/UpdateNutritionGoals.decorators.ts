import { useMacrosInfo } from '@lib/hooks';
import createDecorator from 'final-form-calculate';
import { round } from 'lodash';
import { useMemo } from 'react';

const useUpdateNutritionGoalsDecorators = () => {
  const { carbInfo, protInfo, fatInfo } = useMacrosInfo();

  const gramsDecorators = useMemo(
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

          const updates: { [key: string]: string } = {
            kcal: String(round(calculatedKcal, 2)),
          };

          [carbInfo, protInfo, fatInfo].forEach(({ key, kcalPerUnit }) => {
            updates[`${key}Percentage`] = String(
              round(
                (Number(allValues[key]) * kcalPerUnit * 100) / Number(calculatedKcal),
                2
              ) || 0
            );
          });

          return updates;
        },
      }),
    ],
    [carbInfo, fatInfo, protInfo]
  );

  const percentageDecorators = useMemo(
    () => [
      createDecorator({
        field: /^(carbPercentage|protPercentage|fatPercentage|kcal)$/,
        updates: (
          value,
          field,
          allValues: Partial<UpdateNutritionGoalsValuesType> | undefined,
          prevValues
        ) => {
          if (!allValues) return {};

          const updates: { [key: string]: string } = {};

          [carbInfo, protInfo, fatInfo].forEach(({ key, kcalPerUnit }) => {
            updates[key] = String(
              round(
                (Number(allValues[`${key}Percentage`]) * Number(allValues.kcal)) /
                  (kcalPerUnit * 100),
                2
              ) || 0
            );
          });

          return updates;
        },
      }),
    ],
    [carbInfo, fatInfo, protInfo]
  );

  return { gramsDecorators, percentageDecorators };
};

export default useUpdateNutritionGoalsDecorators;
