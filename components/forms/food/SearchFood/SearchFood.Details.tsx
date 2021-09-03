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
import { useMacrosInfo } from '@lib/hooks';

interface Props {
  food: FoodRecord & {
    foodId: string;
  };
  setSelectedFood: Dispatch<SetStateAction<Food | null>> | null;
}

const SearchFoodDetails = ({ food, setSelectedFood }: Props) => {
  const [amount, setAmount] = useState(100);

  const { carbInfo, protInfo, fatInfo } = useMacrosInfo();
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
      ...carbInfo,
      value: carb,
    },
    {
      ...protInfo,
      value: prot,
    },
    {
      ...fatInfo,
      value: fat,
    },
  ];

  const renderHexagons = () =>
    macrosInfo.map(({ value, compactLabel, color, kcalPerUnit }) => (
      <HexagonLabel
        key={compactLabel}
        value={`${round(value * amount, 2)}${unit ?? 'g'}`}
        percentage={round((value * kcalPerUnit * 100) / totalKcal, 2)}
        label={compactLabel}
        color={color}
      />
    ));

  return (
    <div className="space-y-3">
      <TextField
        className="w-full"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.currentTarget.value) || 0);
        }}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
        }
        name="amount"
        label="Quantidade"
        InputProps={{
          endAdornment: <InputAdornment position="end">gramas</InputAdornment>,
        }}
        autoFocus
        autoComplete="off"
      />
      {!isNaN(amount) && (
        <div className="flex justify-between md:mx-36 lg:mx-0">
          {renderHexagons()}
        </div>
      )}
      <ExtraDetails food={food} amount={amount} />
    </div>
  );
};

export default SearchFoodDetails;
