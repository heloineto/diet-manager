import type { Dispatch, SetStateAction } from 'react';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import HexagonLabel from '@components/data-displays/HexagonLabel';
import { round } from 'lodash';
import {
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import ExtraDetails from './SearchFood.ExtraDetails';

interface Props {
  food: FoodRecord & {
    foodId: string;
  };
  setSelectedFood: Dispatch<SetStateAction<Food | null>> | null;
}

const SearchFoodDetails = ({ food, setSelectedFood }: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const [amount, setAmount] = useState(100);

  const { label, kcal, prot, fat, carb, unit, foodId } = food;

  useEffect(() => {
    setSelectedFood &&
      setSelectedFood({
        amount,
        carb,
        prot,
        fat,
        kcal,
        foodId,
        label,
        unit,
      });

    return () => {
      setSelectedFood && setSelectedFood(null);
    };
  }, [amount, food]);

  const totalKcal = (carb + prot) * 4 + fat * 9;

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
        key={label}
        value={`${round(value * amount, 2)}${unit ?? 'g'}`}
        percentage={round((value * kcalPerUnit * 100) / totalKcal, 2)}
        label={label}
        color={color}
      />
    ));

  return (
    <>
      <div
        className={clsx(
          compact ? 'p-5' : 'rounded-t-xl shadow-top-reflection pl-5',
          'h-14 w-full flex items-center justify-between font-bold bg-gray-200 text-gray-700'
        )}
      >
        {label}
      </div>

      <div className="p-5 space-y-3">
        <TextField
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.currentTarget.value) || 0);
          }}
          name="amount"
          label="Quantidade"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">gramas</InputAdornment>
            ),
          }}
          autoFocus
          autoComplete="off"
        />

        {!isNaN(amount) && (
          <div className="flex justify-between">{renderHexagons()}</div>
        )}
        <ExtraDetails food={food} amount={amount} />
      </div>
    </>
  );
};

export default SearchFoodDetails;
