import clsx from 'clsx';
import { useMemo } from 'react';
import SummaryBar from './Summary.Bar';

interface Props {
  className: string;
  consumed: Macros;
  goalMacros: Macros;
  isSpecific: boolean;
}

const SummaryProgressBar = ({
  className,
  consumed,
  goalMacros,
  isSpecific,
}: Props) => {
  const percentages = useMemo(
    () => ({
      kcal: (consumed.kcal / goalMacros.kcal) * 100,
      fat: ((consumed.fat * 9) / goalMacros.kcal) * 100,
      prot: ((consumed.prot * 4) / goalMacros.kcal) * 100,
      carb: ((consumed.carb * 4) / goalMacros.kcal) * 100,
    }),
    [consumed, goalMacros]
  );

  return (
    <div
      className={clsx(
        'relative overflow-hidden flex rounded-full bg-gray-100 border-2 border-gray-200 h-4 w-full',
        className
      )}
    >
      {isSpecific ? (
        <>
          <SummaryBar
            style={{ width: `${percentages.carb}%` }}
            className="bg-indigo-500"
          />
          <SummaryBar
            style={{ width: `${percentages.prot}%` }}
            className="bg-blue-500"
          />
          <SummaryBar
            style={{ width: `${percentages.fat}%` }}
            className="bg-yellow-500"
          />
        </>
      ) : (
        <SummaryBar
          style={{ width: `${percentages.kcal}%` }}
          className="bg-primary-500"
        />
      )}
    </div>
  );
};

export default SummaryProgressBar;
