import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import clsx from 'clsx';
import HexagonLabel from '@components/data-displays/HexagonLabel';
import { round } from 'lodash';
import {
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
// import { Form } from 'react-final-form';
// import { TextField } from 'mui-rff';
import Divider from '@components/layout/Divider';

interface Props {
  food: FoodRecord & {
    foodId: string;
  };
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
}

const SearchFoodDetails = ({ food, setSelectedFood }: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const [amount, setAmount] = useState(100);

  const { label, kcal, prot, fat, carb, unit, foodId } = food;

  useEffect(() => {
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
  }, [amount]);

  let totalKcal = (carb + prot) * 4 + fat * 9;

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
        <MoreInfo food={food} amount={amount} />
      </div>
    </>
  );
};

const MoreInfo = ({ food, amount }: { food: FoodRecord; amount: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const nutrientsAux: {
    [k in keyof Partial<FoodRecord>]: { label: string; unit: string };
  } = {
    kcal: { label: 'Kcal', unit: 'kcal' },
    kj: { label: 'Kj', unit: 'kJ' },
    cholesterol: { label: 'Colesterol', unit: 'mg' },
    fiber: { label: 'Fibra', unit: 'g' },
    calcium: { label: 'Cálcio', unit: 'mg' },
    magnesium: { label: 'Magnésio', unit: 'mg' },
    manganese: { label: 'Manganês', unit: 'mg' },
    phosphor: { label: 'Fósforo', unit: 'mg' },
    iron: { label: 'Ferro', unit: 'mg' },
    sodium: { label: 'Sódio', unit: 'mg' },
    potassium: { label: 'Potássio', unit: 'mg' },
    copper: { label: 'Cobre', unit: 'mg' },
    zinc: { label: 'Zinco', unit: 'mg' },
    retinol: { label: 'Retinol', unit: 'mcg' },
    thiamine: { label: 'Tiamina', unit: 'mg' },
    riboflavin: { label: 'Riboflavina', unit: 'mg' },
    pyridoxine: { label: 'Piridoxina', unit: 'mg' },
    niacin: { label: 'Niacina', unit: 'mg' },
    vitaminC: { label: 'Vitamina C', unit: 'mg' },
  };

  const renderInfo = () =>
    Object.entries(nutrientsAux)
      // @ts-ignore
      .filter(([key]) => !isNaN(food[key]))
      .map(([key, value], idx) => {
        const isEven = idx % 2 === 0;

        return (
          <li
            key={key}
            className={clsx(
              isEven ? 'bg-white' : 'bg-gray-50',
              'flex justify-between items-center h-6 px-2 border-b'
            )}
          >
            <div>{value.label}</div>
            <div className="font-bold">
              {
                // @ts-ignore
                round(food[key] * (amount ?? 1), 2)
              }
              <span className="text-xs text-gray-800 font-semibold">
                {value.unit ?? 'g'}
              </span>
            </div>
          </li>
        );
      });

  return (
    <div>
      <button
        className="w-full mb-2.5 group"
        onClick={() => setIsOpen((value) => !value)}
      >
        <Divider
          classes={{
            text: 'group-hover:text-blue-500',
            bars: 'group-hover:bg-blue-400',
          }}
        >
          {`${isOpen ? 'Menos' : 'Mais'} Informação`}
        </Divider>
      </button>
      {isOpen && (
        <div className="rounded-lg border border-solid border-gray-400 shadow overflow-hidden text-sm font-semibold">
          <ul className="max-h-48 overflow-y-scroll">{renderInfo()}</ul>
        </div>
      )}
    </div>
  );
};

export default SearchFoodDetails;
