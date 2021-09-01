import type { Dispatch, SetStateAction } from 'react';
import type { HitsProvided, Hit, BasicDoc } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

import clsx from 'clsx';

interface Props {
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
  selectedFood: Food | null;
}

const SearchFoodHits = ({
  setSelectedFood,
  selectedFood,
  hits,
}: HitsProvided<Hit<BasicDoc>> & Props) => (
  <ol>
    {hits.map(({ label, kcal, prot, fat, carb, unit, objectID }, idx) => {
      const isEven = idx % 2 === 0;
      const isSelected = selectedFood && objectID === selectedFood.foodId;

      return (
        <li key={objectID}>
          <div
            className={clsx(
              isEven ? 'bg-white' : 'bg-gray-50',
              isSelected && 'border-2 border-blue-500',
              'flex h-8 border-b cursor-pointer',
              'hover:border hover:shadow-inner'
            )}
            onClick={() => {
              if (isSelected) {
                setSelectedFood(null);
                // setSidePopUp(null);
                return;
              }

              const food: Food = {
                amount: 100,
                carb: Number(carb),
                prot: Number(prot),
                fat: Number(fat),
                kcal: Number(kcal),
                foodId: objectID,
                label: label,
                unit: unit,
              };

              setSelectedFood(food);
              // setSidePopUp({
              //   title: label,
              //   render: () => <FoodSidePopUp {...{ hit, onChange }} />,
              // });
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

// @ts-ignore
export default connectHits(SearchFoodHits);
