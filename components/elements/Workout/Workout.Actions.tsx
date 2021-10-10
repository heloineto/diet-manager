import type { Dispatch, SetStateAction } from 'react';
import type { Row } from 'react-table';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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
import RemoveWorkout from '@components/forms/workout/RemoveWorkout';
import UpdateWorkout from '@components/forms/workout/UpdateWorkout';
// import AddExercise from '@components/forms/exercise/AddExercise';
import { removeExercisesAtRows } from './Workout.utils';
import AddExercise from '@components/forms/exercise/AddExercise';

interface Props {
  workout: WorkoutWithRef;
  compact: boolean;
  hover: boolean;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  selectedRows: {
    [k: string]: Row<Exercise>;
  };
  setSelectedRows: Dispatch<
    SetStateAction<{
      [k: string]: Row<Exercise>;
    }>
  >;
}

const WorkoutActions = ({
  workout,
  compact,
  hover,
  expanded,
  setExpanded,
  selectedRows,
  setSelectedRows,
}: Props) => {
  const [addExerciseOpen, setAddExerciseOpen] = useState(false);
  const [removeWorkoutOpen, setRemoveWorkoutOpen] = useState(false);
  const [updateWorkoutOpen, setUpdateWorkoutOpen] = useState(false);

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
        onClick: () => setUpdateWorkoutOpen(true),
      },
      {
        label: 'Apagar',
        Icon: TrashIcon,
        className: 'hover:text-red-700',
        onClick: () => setRemoveWorkoutOpen(true),
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
                  <MenuItem
                    className={clsx(className)}
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
              <IconButton className={clsx(className, 'w-7 h-7 p-0')} onClick={onClick}>
                <Icon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          ))}
        </>
      );
  };

  return (
    <>
      <div
        className={`absolute top-0 h-full w-full mx-1 flex items-center text-gray-800`}
      >
        <Tooltip title="Adicionar exercício" arrow>
          <IconButton
            className={clsx(
              compact && 'bg-primary-500 text-white shadow-primary-500',
              hover
                ? 'bg-primary-500 text-white shadow-primary-500'
                : 'bg-white bg-opacity-50 text-gray-800',
              'w-7 h-7 p-0 transition-colors duration-500 mr-0.5 sm:mr-2.5'
            )}
            color="primary"
            onClick={() => setAddExerciseOpen(true)}
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
                    removeExercisesAtRows(workout, Object.values(selectedRows));
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
        <AddExercise
          open={addExerciseOpen}
          workout={workout}
          onClose={() => setAddExerciseOpen(false)}
        />

        <Modal
          label="Editar Treino"
          open={updateWorkoutOpen}
          onClose={() => setUpdateWorkoutOpen(false)}
        >
          <UpdateWorkout onClose={() => setUpdateWorkoutOpen(false)} workout={workout} />
        </Modal>

        <Modal
          label="Remover Treino"
          open={removeWorkoutOpen}
          onClose={() => setRemoveWorkoutOpen(false)}
        >
          <RemoveWorkout
            label={workout.label}
            workout={workout}
            onClose={() => setRemoveWorkoutOpen(false)}
          />
        </Modal>
      </>
    </>
  );
};

export default WorkoutActions;
