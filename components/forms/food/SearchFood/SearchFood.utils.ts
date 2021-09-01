import type { Hit, BasicDoc } from 'react-instantsearch-core';

export const convertHitToFood = (hit: Hit<Hit<BasicDoc>>) => {
  const food: FoodRecord & { foodId: string } = {
    carb: Number(hit.carb),
    prot: Number(hit.prot),
    fat: Number(hit.fat),
    kcal: Number(hit.kcal),
    label: String(hit.label),
    unit: String(hit.unit),
    kj: Number(hit.kj),
    cholesterol: Number(hit.cholesterol),
    fiber: Number(hit.fiber),
    calcium: Number(hit.calcium),
    magnesium: Number(hit.magnesium),
    manganese: Number(hit.manganese),
    phosphor: Number(hit.phosphor),
    iron: Number(hit.iron),
    sodium: Number(hit.sodium),
    potassium: Number(hit.potassium),
    copper: Number(hit.copper),
    zinc: Number(hit.zinc),
    retinol: Number(hit.retinol),
    thiamine: Number(hit.thiamine),
    riboflavin: Number(hit.riboflavin),
    pyridoxine: Number(hit.pyridoxine),
    niacin: Number(hit.niacin),
    vitaminC: Number(hit.vitaminC),
    foodId: String(hit.objectID),
  };

  return food;
};
