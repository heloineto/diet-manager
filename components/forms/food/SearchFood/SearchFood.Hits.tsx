import { useEffect } from 'react';
import { useContext } from 'react';
import type { BasicDoc, Hit, HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

import { AsideContext } from '@components/overlays/ModalWithAside/ModalWithAside.context';
import SearchFoodHit from './SearchFood.Hit';

const SearchFoodHits = ({ hits }: HitsProvided<Hit<BasicDoc>>) => {
  const { setAside, setAsideLabel } = useContext(AsideContext);

  useEffect(() => {
    return () => {
      setAside && setAside(null);
      setAsideLabel && setAsideLabel('');
    };
  });

  return (
    <ol>
      {hits.map((hit, idx) => (
        <SearchFoodHit key={idx} hit={hit} isEven={idx % 2 === 0} />
      ))}
    </ol>
  );
};

export default connectHits(SearchFoodHits);
