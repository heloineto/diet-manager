import type { Dispatch, SetStateAction } from 'react';
import type { Hit, BasicDoc } from 'react-instantsearch-core';

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
      className={`hit ${isSelected ? 'active' : ''}`}
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
      <div className="label">{label}</div>
      <div className="carb">{carb}</div>
      <div className="prot">{prot}</div>
      <div className="fat">{fat}</div>
      <div className="kcal">{kcal}</div>
    </a>
  );
};

export default SearchFoodHit;
