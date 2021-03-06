import type { SearchBoxProvided } from 'react-instantsearch-core';

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
    <FormControl className="group" variant="outlined" size="small">
      <InputLabel htmlFor="outlined-adornment-search">Pesquisar</InputLabel>
      <OutlinedInput
        autoFocus
        id="outlined-adornment-search"
        type="text"
        value={currentRefinement}
        onChange={(e) => refine(e.currentTarget.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className="text-gray-700 hover:text-blue-600 group-focus-within:text-blue-600"
              aria-label="search food"
              edge="end"
            >
              <SearchIcon className="h-5 w-5 hover:text-blue-500" />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={80}
      />
    </FormControl>
  );
};

export default connectSearchBox(SearchFoodSeachBox);
