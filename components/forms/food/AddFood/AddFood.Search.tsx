import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import FoodSidePopUp from './FoodSidePopUp';
import algoliasearch from 'algoliasearch/lite';
import { useWindowDimensions } from '@lib/hooks';

//* Client Id and Search-Only API Key
const searchClient = algoliasearch(
  'OZGJFODYXD',
  '8b25a5dd63fb83e5b767998cbc6f62fa'
);

const AddFoodSearch = ({ onChange, value, setSidePopUp }) => {
  const { width, breakpoints } = useWindowDimensions();

  return (
    <InstantSearch searchClient={searchClient} indexName="foods">
      <SearchBox />
      <div className="rounded-lg border border-solid border-gray-400 shadow overflow-hidden text-sm">
        <div className="max-h-64 overflow-y-auto text-sm font-semibold">
          <div className="hit-header">
            <div className="label">
              {width <= breakpoints['sm']
                ? 'Alimento'
                : 'Descrição Do Alimento'}
            </div>
            <div className="carb">Carb</div>
            <div className="prot">Prot</div>
            <div className="fat">Gord</div>
            <div className="kcal">Kcal</div>
          </div>
          <Hits
            hitComponent={({ hit }) => {
              const { label, kcal, prot, fat, carb, objectID } = hit;
              const isSelected = objectID === value.objectID;

              return (
                <a
                  className={`hit ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    if (isSelected) {
                      onChange(null);
                      setSidePopUp(null);
                      return;
                    }

                    onChange(hit);
                    setSidePopUp({
                      title: hit.label,
                      render: () => <FoodSidePopUp {...{ hit, onChange }} />,
                    });
                  }}
                >
                  <div className="label">{label}</div>
                  <div className="carb">{carb}</div>
                  <div className="prot">{prot}</div>
                  <div className="fat">{fat}</div>
                  <div className="kcal">{kcal}</div>
                </a>
              );
            }}
          />
        </div>
      </div>
    </InstantSearch>
  );
};

export default AddFoodSearch;
