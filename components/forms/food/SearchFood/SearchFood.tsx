import type { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import { InstantSearch, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { useMediaQuery, useTheme } from '@material-ui/core';
import SearchFoodSeachBox from './SearchFood.SeachBox';
import SearchFoodHit from './SearchFood.Hit';
import SearchFoodHits from './SearchFoodHits';

//* Client Id and Search-Only API Key
const searchClient = algoliasearch(
  'OZGJFODYXD',
  '8b25a5dd63fb83e5b767998cbc6f62fa'
);

interface Props {
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
  selectedFood: Food | null;
}

const SearchFood = ({ setSelectedFood, selectedFood }: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('sm'));

  return (
    <InstantSearch searchClient={searchClient} indexName="foods">
      <SearchFoodSeachBox />
      <div className="rounded-lg border border-solid border-gray-400 shadow overflow-hidden text-sm">
        <div className="max-h-64 overflow-y-auto text-sm font-semibold">
          <div className="flex h-8 border-b-2 border-gray-300 bg-gray-200">
            <div className="flex-grow flex items-center justify-start px-2">
              {compact ? 'Alimento' : 'Descrição Do Alimento'}
            </div>
            <div className="text-xs md:text-sm flex items-center justify-center min-w-[10%] bg-indigo-300 text-indigo-900">
              Carb
            </div>
            <div className="text-xs md:text-sm flex items-center justify-center min-w-[10%] bg-blue-300 text-blue-900">
              Prot
            </div>
            <div className="text-xs md:text-sm flex items-center justify-center min-w-[10%] bg-yellow-300 text-yellow-900">
              Gord
            </div>
            <div className="text-xs md:text-sm flex items-center justify-center min-w-[10%] bg-green-300 text-green-900">
              Kcal
            </div>
          </div>
          <SearchFoodHits
            // @ts-ignore
            setSelectedFood={setSelectedFood}
            selectedFood={selectedFood}
          />
        </div>
      </div>
    </InstantSearch>
  );
};

export default SearchFood;
