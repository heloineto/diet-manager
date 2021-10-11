import type { BasicDoc, Hit } from 'react-instantsearch-core';

import { useContext } from 'react';
import clsx from 'clsx';
import { AsideContext } from '@components/overlays/ModalWithAside/ModalWithAside.context';
import SearchFoodDetails from './SearchFood.Details';
import { convertHitToFood } from './SearchFood.utils';
import { SelectedFoodContext } from './SearchFood.context';
import { round } from 'lodash';

interface Props {
  hit: Hit<Hit<BasicDoc>>;
  isEven: boolean;
}

const SearchFoodHit = ({ hit, isEven }: Props) => {
  const { setAside, setAsideLabel } = useContext(AsideContext);
  const { selectedFood, setSelectedFood } = useContext(SelectedFoodContext);

  const food = convertHitToFood(hit);

  const { label, kcal, prot, fat, carb, foodId } = food;

  const isSelected = foodId === selectedFood?.foodId;

  return (
    <li>
      <div
        className={clsx(
          isEven ? 'bg-white' : 'bg-gray-50',
          isSelected &&
            'relative after:border-2 after:border-blue-500 after:h-full after:w-full after:absolute',
          'flex h-8 border-b cursor-pointer',
          'hover:border hover:shadow-inner'
        )}
        onClick={() => {
          if (isSelected) {
            setAside && setAside(null);
            return;
          }

          setAside &&
            setAside(<SearchFoodDetails food={food} setSelectedFood={setSelectedFood} />);

          setAsideLabel && setAsideLabel(food.label);
        }}
      >
        <div className="flex-grow inline-block my-auto px-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {label}
        </div>
        <div
          className={clsx(
            isEven ? 'bg-indigo-300' : 'bg-indigo-200',
            'flex items-center justify-center min-w-[10%] text-indigo-900'
          )}
        >
          {round(carb * 100, 2)}
        </div>
        <div
          className={clsx(
            isEven ? 'bg-blue-300' : 'bg-blue-200',
            'flex items-center justify-center min-w-[10%] text-blue-900'
          )}
        >
          {round(prot * 100, 2)}
        </div>
        <div
          className={clsx(
            isEven ? 'bg-yellow-300' : 'bg-yellow-200',
            'flex items-center justify-center min-w-[10%] text-yellow-900'
          )}
        >
          {round(fat * 100, 2)}
        </div>
        <div
          className={clsx(
            isEven ? 'bg-green-300' : 'bg-green-200',
            'flex items-center justify-center min-w-[10%] text-green-900'
          )}
        >
          {round(kcal * 100, 2)}
        </div>
      </div>
    </li>
  );
};

export default SearchFoodHit;
