import { Dispatch, SetStateAction, useState } from 'react';

import { useMemo } from 'react';
import clsx from 'clsx';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  PencilAltIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import Modal from '@components/overlays/Modal';
import RemoveMeal from '@components/forms/meal/RemoveMeal';

interface Props {
  compact: boolean;
  hover: boolean;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  mealRef: FirebaseRef;
  mealLabel: string;
}

const MealActions = ({
  compact,
  hover,
  expanded,
  setExpanded,
  mealRef,
  mealLabel,
}: Props) => {
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [removeMealOpen, setRemoveMealOpen] = useState(false);
  const [updateMealOpen, setUpdateMealOpen] = useState(false);

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
    [expanded]
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
                  <MenuItem key={idx} onClick={onClick}>
                    <Icon className={clsx(className, 'h-4 w-4 mr-2.5')} />
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
          {actions.map(({ label, Icon, onClick, className }, idx) => (
            <Tooltip title={label} arrow>
              <IconButton className="w-7 h-7 p-0" key={idx} onClick={onClick}>
                <Icon className={clsx(className, 'h-4 w-4')} />
              </IconButton>
            </Tooltip>
          ))}
        </>
      );
  };

  return (
    <>
      <div
        className={`absolute top-0 h-full mx-1 flex items-center justify-center text-gray-800`}
      >
        <Tooltip title="Adicionar alimento" arrow>
          <IconButton
            className={clsx(
              compact && 'bg-primary-500 text-white shadow-primary-500',
              hover
                ? 'bg-primary-500 text-white shadow-primary-500'
                : 'bg-white bg-opacity-50 text-gray-800',
              'w-7 h-7 p-0 transition-colors duration-500 mr-2.5'
            )}
            color="primary"
            // onClick={() => setIsFoodFormOpen}
          >
            <PlusIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        {renderResponsiveActions()}
      </div>
      <div>
        {/* <Modal
          open={addFoodOpen}
          setOpen={setIsFoodFormOpen}
          onClose={() => setSidePopUp(null)}
          SidePopUp={SidePopUp}
        >
          <FoodForm
            mealRef={meal.ref}
            onClose={() => {
              // setIsFoodFormOpen(false);
            }}
            setSidePopUp={setSidePopUp}
          />
        </Modal> */}
        <Modal open={removeMealOpen} setOpen={setRemoveMealOpen}>
          {/* <RemoveMeal
            label={meal.label}
            mealRef={meal.ref}
            onClose={() => {
              setIsRemoveMealOpen(false);
            }}
          /> */}
          <RemoveMeal
            label={mealLabel}
            mealRef={mealRef}
            onClose={() => setRemoveMealOpen(false)}
          />
        </Modal>

        <Modal open={updateMealOpen} setOpen={setUpdateMealOpen}>
          {/* <MealForm onClose={() => setIsMealFormOpen(false)} meal={meal} /> */}
        </Modal>
      </div>
    </>
  );
};

export default MealActions;
