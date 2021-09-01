import type { Dispatch, SetStateAction } from 'react';

import { useContext, useState } from 'react';
import type { HitsProvided, Hit, BasicDoc } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

import clsx from 'clsx';
import { AsideContext } from '@components/overlays/ModalWithAside/ModalWithAside.context';
import SearchFoodDetails from './SearchFood.Details';
import { convertHitToFood } from './SearchFood.utils';

interface Props {
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
  selectedFood: Food | null;
}

const SearchFoodHits = ({
  setSelectedFood,
  selectedFood,
  hits,
}: HitsProvided<Hit<BasicDoc>> & Props) => {
  const [amount, setAmount] = useState(100);

  return (
    <ol>
      {hits.map((hit, idx) => {
        const food = convertHitToFood(hit);

        const { label, kcal, prot, fat, carb, unit, foodId } = food;

        const isEven = idx % 2 === 0;
        const isSelected = selectedFood && foodId === selectedFood.foodId;

        const { setAside } = useContext(AsideContext);

        return (
          <li key={foodId}>
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
                  setSelectedFood(null);
                  setAside && setAside(null);
                  return;
                }

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

                setAside &&
                  setAside(
                    <SearchFoodDetails
                      food={food}
                      amount={amount}
                      setAmount={setAmount}
                    />
                  );
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
                {carb}
              </div>
              <div
                className={clsx(
                  isEven ? 'bg-blue-300' : 'bg-blue-200',
                  'flex items-center justify-center min-w-[10%] text-blue-900'
                )}
              >
                {prot}
              </div>
              <div
                className={clsx(
                  isEven ? 'bg-yellow-300' : 'bg-yellow-200',
                  'flex items-center justify-center min-w-[10%] text-yellow-900'
                )}
              >
                {fat}
              </div>
              <div
                className={clsx(
                  isEven ? 'bg-green-300' : 'bg-green-200',
                  'flex items-center justify-center min-w-[10%] text-green-900'
                )}
              >
                {kcal}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

// @ts-ignore
export default connectHits(SearchFoodHits);
