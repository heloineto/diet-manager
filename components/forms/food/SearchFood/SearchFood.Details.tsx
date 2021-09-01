import type { Dispatch, SetStateAction } from 'react';

import HexagonLabel from '@components/data-displays/HexagonLabel';
import { round } from 'lodash';
import { useMemo } from 'react';

interface Props {
  food: FoodRecord;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}

const SearchFoodDetails = ({ food, amount, setAmount }: Props) => {
  const { label, kcal, prot, fat, carb, unit } = food;
  let totalKcal = ((carb || 0) + (prot || 0)) * 4 + (fat || 0) * 9;

  const macrosInfo = [
    {
      label: 'Carboid.',
      value: carb,
      color: '#a78bfa',
      kcalPerUnit: 4,
    },
    {
      label: 'Proteina',
      value: prot,
      color: '#60a5fa',
      kcalPerUnit: 4,
    },
    {
      label: 'Gordura',
      value: fat,
      color: '#fbbf24',
      kcalPerUnit: 9,
    },
  ];

  const renderHexagons = () =>
    macrosInfo.map(({ value, label, color, kcalPerUnit }) => (
      <HexagonLabel
        key={value}
        value={`${round(value * amount, 2)}${unit ?? 'g'}`}
        percentage={round((value * kcalPerUnit * 100) / totalKcal, 2)}
        label={label}
        color={color}
      />
    ));

  return (
    <>
      <div className="pl-5 font-bold top-bar h-10 w-full flex items-center justify-between pr-5 bg-gray-200 text-gray-700 rounded-t-xl">
        {label}
      </div>
      <div className="p-5">{'aside'}</div>
    </>
  );
};

export default SearchFoodDetails;
