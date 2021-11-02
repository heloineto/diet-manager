import { useState } from 'react';
import classNames from 'clsx';
import { round } from 'lodash';

import Divider from '@components/layout/Divider';
import { isKeyInShallowObject } from '@utils/typescript';

interface Props {
  food: FoodRecord;
  amount: number;
}

const ExtraDetails = ({ food, amount }: Props) => {
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
      .filter(([key]) => isKeyInShallowObject(key, food) && !isNaN(Number(food[key])))
      .map(([key, value], idx) => {
        const isEven = idx % 2 === 0;
        let nutrientValue = isKeyInShallowObject(key, food) && food[key];

        if (typeof nutrientValue !== 'number') nutrientValue = 0;

        return (
          <li
            key={key}
            className={classNames(
              isEven ? 'bg-white' : 'bg-gray-50',
              'flex justify-between items-center h-6 px-2 border-b'
            )}
          >
            <div>{value.label}</div>
            <div className="font-bold">
              {round(nutrientValue * (amount ?? 1), 2)}
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

export default ExtraDetails;
