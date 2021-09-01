import type { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import HexagonLabel from '@components/data-displays/HexagonLabel';
import { round } from 'lodash';
import {
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

interface Props {
  food: FoodRecord;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}

const SearchFoodDetails = ({ food, amount, setAmount }: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

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
      <div
        className={clsx(
          compact ? 'p-5' : 'rounded-t-xl shadow-top-reflection pl-5',
          'h-14 w-full flex items-center justify-between font-bold bg-gray-200 text-gray-700'
        )}
      >
        {label}
      </div>
      <div className="p-5">
        <TextField
          label="Quantidade"
          id="standard-start-adornment"
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
        />
      </div>
    </>
  );
};

export default SearchFoodDetails;
