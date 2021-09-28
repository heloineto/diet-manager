import type { Hit, BasicDoc } from 'react-instantsearch-core';

export const convertHitToFood = (hit: Hit<Hit<BasicDoc>>) => {
  const food: FoodRecord & { foodId: string } = {
    label: hit.label || '',
    unit: hit.unit || 'g',
    foodId: hit.objectID,
    carb: Number(hit.carb) || 0,
    prot: Number(hit.prot) || 0,
    fat: Number(hit.fat) || 0,
    kcal: Number(hit.kcal) || 0,
    kj: Number(hit.kj) || 0,
    cholesterol: Number(hit.cholesterol) || 0,
    fiber: Number(hit.fiber) || 0,
    calcium: Number(hit.calcium) || 0,
    magnesium: Number(hit.magnesium) || 0,
    manganese: Number(hit.manganese) || 0,
    phosphor: Number(hit.phosphor) || 0,
    iron: Number(hit.iron) || 0,
    sodium: Number(hit.sodium) || 0,
    potassium: Number(hit.potassium) || 0,
    copper: Number(hit.copper) || 0,
    zinc: Number(hit.zinc) || 0,
    retinol: Number(hit.retinol) || 0,
    thiamine: Number(hit.thiamine) || 0,
    riboflavin: Number(hit.riboflavin) || 0,
    pyridoxine: Number(hit.pyridoxine) || 0,
    niacin: Number(hit.niacin) || 0,
    vitaminC: Number(hit.vitaminC) || 0,
  };

  return food;
};
