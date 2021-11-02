import type { Dispatch, SetStateAction } from 'react';
import type { Row } from 'react-table';

import { useMemo, useState } from 'react';
import classNames from 'clsx';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Badge, IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  PencilAltIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from '@heroicons/react/outline';

import Modal from '@components/overlays/Modal';
import RemoveMeal from '@components/forms/meal/RemoveMeal';
import UpdateMeal from '@components/forms/meal/UpdateMeal';
import AddFood from '@components/forms/food/AddFood';
import { removeFoodsAtRows } from './Meal.utils';

interface Props {
  compact: boolean;
  hover: boolean;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  meal: MealWithRef;
  selectedRows: {
    [k: string]: Row<FormattedFood>;
  };
  setSelectedRows: Dispatch<
    SetStateAction<{
      [k: string]: Row<FormattedFood>;
    }>
  >;
}

const MealActions = ({
  compact,
  hover,
  expanded,
  setExpanded,
  meal,
  selectedRows,
  setSelectedRows,
}: Props) => {
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [removeMealOpen, setRemoveMealOpen] = useState(false);
  const [updateMealOpen, setUpdateMealOpen] = useState(false);

  const qntOfSelectedRows = useMemo(
    () => Object.keys(selectedRows).length,
    [selectedRows]
  );

  const actions = useMemo(
    () => [
      {
        label: expanded ? 'Retrair' : 'Expandir',
        Icon: expanded ? ChevronUpIcon : ChevronDownIcon,
        className: '',
        onClick: () => setExpanded((value) => !value),
      },
      {
        label: 'Editar',
        Icon: PencilAltIcon,
        className: 'hover:text-blue-700',
        onClick: () => setUpdateMealOpen(true),
      },
      {
        label: 'Apagar',
        Icon: TrashIcon,
        className: 'hover:text-red-700',
        onClick: () => setRemoveMealOpen(true),
      },
    ],
    [expanded, setExpanded]
  );

  const renderResponsiveActions = () => {
    if (compact)
      return (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <IconButton className="w-7 h-7 p-0" {...bindTrigger(popupState)}>
                <DotsVerticalIcon className="h-4 w-4 text-gray-800" />
              </IconButton>

              <Menu {...bindMenu(popupState)}>
                {actions.map(({ label, Icon, onClick, className }, idx) => (
                  <MenuItem
                    className={classNames(className)}
                    key={idx}
                    onClick={() => {
                      popupState.close();
                      onClick();
                    }}
                  >
                    <Icon className="h-4 w-4 mr-2.5" />
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </PopupState>
      );

    if (hover)
      return (
        <>
          {actions.map(({ label, Icon, onClick, className }) => (
            <Tooltip key={label} title={label} arrow>
              <IconButton
                className={classNames(className, 'w-7 h-7 p-0')}
                onClick={onClick}
              >
                <Icon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          ))}
        </>
      );
  };

  return (
    <>
      <div className="absolute top-0 h-full w-full mx-1 flex items-center text-gray-800">
        <Tooltip title="Adicionar alimento" arrow>
          <IconButton
            className={classNames(
              compact && 'bg-primary-500 text-white shadow-primary-500',
              hover
                ? 'bg-primary-500 text-white shadow-primary-500'
                : 'bg-white bg-opacity-50 text-gray-800',
              'w-7 h-7 p-0 transition-colors duration-500 mr-0.5 sm:mr-2.5'
            )}
            color="primary"
            onClick={() => setAddFoodOpen(true)}
          >
            <PlusIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        {renderResponsiveActions()}

        {!!qntOfSelectedRows && (hover || compact) && (
          <div className="ml-auto pr-3">
            <Badge
              classes={{
                badge: 'font-bold text-xs px-0 py-0 h-4 w-4 min-w-0 top-1 right-1',
              }}
              badgeContent={qntOfSelectedRows}
              color="error"
            >
              <Tooltip
                title={`Remover Alimentos ${qntOfSelectedRows} Selecionados`}
                arrow
              >
                <IconButton
                  className="w-7 h-7 p-0 hover:text-red-700"
                  onClick={() => {
                    removeFoodsAtRows(meal, Object.values(selectedRows));
                    setSelectedRows({});
                  }}
                >
                  <XIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </Badge>
          </div>
        )}
      </div>

      <>
        <AddFood open={addFoodOpen} meal={meal} onClose={() => setAddFoodOpen(false)} />

        <Modal
          label="Editar Refeição"
          open={updateMealOpen}
          onClose={() => setUpdateMealOpen(false)}
        >
          <UpdateMeal onClose={() => setUpdateMealOpen(false)} meal={meal} />
        </Modal>

        <Modal
          label="Remover Refeição"
          open={removeMealOpen}
          onClose={() => setRemoveMealOpen(false)}
        >
          <RemoveMeal
            label={meal.label}
            meal={meal}
            onClose={() => setRemoveMealOpen(false)}
          />
        </Modal>
      </>
    </>
  );
};

export default MealActions;
