import type { Row, Renderer, FooterProps } from 'react-table';
import type { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  PencilAltIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';

interface Props {
  compact: boolean;
  hover: boolean;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const a = ({ compact, hover, expanded }: Props) => {
  if (compact)
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <IconButton className="w-7 h-7 p-0" {...bindTrigger(popupState)}>
              <DotsVerticalIcon className="h-4 w-4 text-gray-800" />
            </IconButton>
            <Menu {...bindMenu(popupState)}>
              <MenuItem
              //  onClick={popupState.close}
              >
                <PencilAltIcon className="h-4 w-4 hover:text-blue-700 mr-2.5" />
                Editar
              </MenuItem>
              <MenuItem
              //  onClick={popupState.close}
              >
                <TrashIcon className="h-4 w-4 hover:text-red-700 mr-2.5" />
                Apagar
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
    );

  return (
    <div
      className={`absolute top-0 h-full mx-1 flex items-center justify-center text-gray-800`}
    >
      <IconButton
        className={clsx(
          compact && 'bg-primary-500 text-white shadow-primary-500',
          hover
            ? 'bg-primary-500 text-white shadow-primary-500'
            : 'bg-white bg-opacity-50 text-gray-800',
          'w-7 h-7 p-0 transition-colors duration-500 mr-2.5'
        )}
        color="primary"
        // onClick={() => setIsFoodFormOpen(true)}
      >
        <PlusIcon className="h-4 w-4" />
      </IconButton>
      {hover && (
        <>
          <IconButton
            className="w-7 h-7 p-0"
            // onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </IconButton>
          <IconButton
            className="w-7 h-7 p-0"
            // onClick={() => setIsMealFormOpen(true)}
          >
            <PencilAltIcon className="h-4 w-4 hover:text-blue-700" />
          </IconButton>
          <IconButton
            className="w-7 h-7 p-0"
            // onClick={() => setIsRemoveMealOpen(true)}
          >
            <TrashIcon className="h-4 w-4 hover:text-red-700" />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default MealActions;
