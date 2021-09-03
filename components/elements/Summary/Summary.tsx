import { MealsContext, UserContext } from '@lib/context';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useContext } from 'react';

import clsx from 'clsx';
import SummaryMacroLabel from './Summary.MacroLabel';
import { has, round } from 'lodash';
import { safeguard } from '@utils/typescript';
import SummaryProgressBar from './Summary.ProgressBar';
import HexagonLabel from '@components/data-displays/HexagonLabel';
import { useMacrosInfo } from '@lib/hooks';

interface Props {
  className: string;
}

const Summary = ({ className }: Props) => {
  const { userDetails } = useContext(UserContext);
  const { meals } = useContext(MealsContext);
  const { carbInfo, protInfo, fatInfo } = useMacrosInfo();

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const goalMacros = safeguard(
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

        {/* <HexagonLabel
          label="Proteinas"
          value={`${round(consumedMacros.prot, 2)}g`}
          subLabel={`Resta ${Math.max(
            round(goalMacros.prot - consumedMacros.prot, 2),
            0
          )}g`}
          percentage={Math.min(
            (consumedMacros.prot * 100) / goalMacros.prot || 0,
            100
          )}
          color={colors['blue-500']}
          size={compact ? 'small' : 'large'}
        />
        <HexagonLabel
          label="Gorduras"
          value={`${round(consumedMacros.fat, 2)}g`}
          subLabel={`Resta ${Math.max(
            round(goalMacros.fat - consumedMacros.fat, 2),
            0
          )}g`}
          percentage={Math.min(
            (consumedMacros.fat * 100) / goalMacros.fat || 0,
            100
          )}
          color={colors['yellow-500']}
          size={compact ? 'small' : 'large'}
        /> */}
      </div>
    </div>
  );
};

export default Summary;
