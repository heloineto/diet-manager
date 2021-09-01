import type { SearchBoxProvided } from 'react-instantsearch-core';

import clsx from 'clsx';
import { connectSearchBox } from 'react-instantsearch-dom';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { SearchIcon } from '@heroicons/react/outline';

const SearchFoodSeachBox = ({
  currentRefinement,
  isSearchStalled,
  refine,
}: SearchBoxProvided) => {
  return (
    <FormControl variant="outlined" size="small">
      <InputLabel htmlFor="outlined-adornment-search">Pesquisar</InputLabel>
      <OutlinedInput
        id="outlined-adornment-search"
        type="text"
        value={currentRefinement}
        onChange={(e) => refine(e.currentTarget.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className="p-0 h-8 w-8"
              aria-label="search food"
              edge="end"
            >
              <SearchIcon className="h-5 w-5 hover:text-blue-500" />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={80}
      />
      {isSearchStalled && 'Erro nas buscas'}
    </FormControl>
  );
};

export default connectSearchBox(SearchFoodSeachBox);
