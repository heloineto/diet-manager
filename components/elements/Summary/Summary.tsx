import { useMediaQuery, useTheme } from '@material-ui/core';
import { useContext } from 'react';
import clsx from 'clsx';
import { round } from 'lodash';

import { MealsContext, UserContext } from '@lib/context';
import { useMacrosInfo } from '@lib/hooks';
import { safeguard } from '@utils/typescript';

import SummaryMacroLabel from './Summary.MacroLabel';
import SummaryProgressBar from './Summary.ProgressBar';
import HexagonLabel from '@components/data-displays/HexagonLabel';

interface Props {
  className?: string;
}

const Summary = ({ className }: Props) => {
  const { userDetails } = useContext(UserContext);
  const { meals } = useContext(MealsContext);
  const { carbInfo, protInfo, fatInfo } = useMacrosInfo();

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  // @ts-ignore
  const goalMacros: Macros = safeguard(
    userDetails?.goals?.nutrition,
    ['kcal', 'carb', 'prot', 'fat'],
    0
  );

  const consumedMacros = {
    kcal: 0,
    carb: 0,
    prot: 0,
    fat: 0,
  };

  meals.map(({ foods }) =>
    foods.map((food) => {
      consumedMacros.kcal += food.kcal * food.amount || 0;
      consumedMacros.prot += food.prot * food.amount || 0;
      consumedMacros.carb += food.carb * food.amount || 0;
      consumedMacros.fat += food.fat * food.amount || 0;
    })
  );

  return (
    <div className={clsx(className, 'flex flex-col items-center')}>
      <h5 className="font-bold text-3xl md:text-4xl mb-7">Sumário do Dia</h5>

      <div className="flex items-center w-full justify-evenly mb-5">
        <SummaryMacroLabel name="Meta" macro="kcal" value={goalMacros.kcal} />
        <SummaryMacroLabel
          name="Restam"
          macro="kcal"
          value={Math.max(goalMacros.kcal - consumedMacros.kcal, 0)}
        />
        <SummaryMacroLabel
          name="Consumido"
          macro="kcal"
          value={consumedMacros.kcal}
        />
      </div>
      <SummaryProgressBar
        className="mb-5"
        consumed={consumedMacros}
        goalMacros={goalMacros}
        isSpecific={false}
      />
      <div className="flex gap-x-5">
        {[carbInfo, protInfo, fatInfo].map(({ key, label, color }) => (
          <HexagonLabel
            key={key}
            label={label}
            value={`${round(consumedMacros[key], 2)}g`}
            subLabel={`Resta ${Math.max(
              round(goalMacros[key] - consumedMacros[key], 2),
              0
            )}g`}
            percentage={Math.min(
              (consumedMacros[key] * 100) / goalMacros[key] || 0,
              100
            )}
            color={color}
            size={compact ? 'small' : 'large'}
          />
        ))}
      </div>
    </div>
  );
};

export default Summary;
