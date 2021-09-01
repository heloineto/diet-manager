import type { Dispatch, SetStateAction } from 'react';
import type { Hit, BasicDoc } from 'react-instantsearch-core';

import clsx from 'clsx';

interface Props {
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
  selectedFood: Food | null;
  hit: Hit<BasicDoc>;
}

const SearchFoodHit = ({ setSelectedFood, selectedFood, hit }: Props) => {
  const { label, kcal, prot, fat, carb, unit, objectID } = hit;
  const isSelected = selectedFood && objectID === selectedFood.foodId;

  return (
    <a
      className={clsx(
        isSelected && 'border-2 border-blue-500',
        'flex h-8 border-b cursor-pointer',
        'hover:border hover:shadow-inner',
        ''
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
        //   title: hit.label,
        //   render: () => <FoodSidePopUp {...{ hit, onChange }} />,
        // });
      }}
    >
      <div className="flex-grow inline-block my-auto px-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {label}
      </div>
      <div className="flex items-center justify-center min-w-[10%] bg-indigo-300 text-indigo-900">
        {carb}
      </div>
      <div className="flex items-center justify-center min-w-[10%] bg-blue-300 text-blue-900">
        {prot}
      </div>
      <div className="flex items-center justify-center min-w-[10%] bg-yellow-300 text-yellow-900">
        {fat}
      </div>
      <div className="flex items-center justify-center min-w-[10%] bg-green-300 text-green-900">
        {kcal}
      </div>
    </a>
  );
};

export default SearchFoodHit;
