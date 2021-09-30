import type { Row } from 'react-table';

import { useMemo } from 'react';
import { useTable } from 'react-table';
import { omit } from 'lodash';
import clsx from 'clsx';

import { useMediaQuery, useTheme } from '@material-ui/core';
import { useWorkoutState } from './Workout.state';
import WorkoutActions from './Workout.Actions';
import UpdateExercise from '@components/forms/exercise/UpdateExercise';

interface Props {
  workout: WorkoutWithRef;
}

const Workout = ({ workout }: Props) => {
  const { exercises } = workout;

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const {
    expanded,
    setExpanded,
    hover,
    setHover,
    selectedRows,
    setSelectedRows,
    editingRow,
    setEditingRow,
  } = useWorkoutState();

  const selectRow = (row: Row<Exercise>) => {
    setSelectedRows((value) => ({ ...value, [row.id]: row }));
  };

  const unselectRow = (row: Row<Exercise>) => {
    setSelectedRows((value) => omit(value, [row.id]));
  };

  const data = useMemo(() => Object.values(exercises), [exercises]);

  const columns = useMemo(() => {
    return [
      {
        Header: 'Nº',
        accessor: 'index',
      },
      {
        Header: 'Exercício',
        accessor: 'label',
      },
      {
        Header: 'Sets',
        accessor: 'sets',
      },
      {
        Header: 'Reps',
        accessor: 'reps',
      },
      {
        Header: 'Peso',
        accessor: 'weight',
      },
    ];
  }, [exercises]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    // @ts-ignore //* React Table is dumb
  } = useTable({ columns, data });

  return (
    <div className="border-2 rounded-lg overflow-hidden relative">
      <table
        {...getTableProps()}
        className="w-full text-xs md:text-sm text-center"
        cellSpacing="0"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <thead>
          <tr>
            <th
              className={clsx(
                `
                table-cell w-1/12 h-10
                text-[0.875rem] md:text-base font-extrabold relative
               border-gray-300 border-b-2
                `
              )}
              style={{ backgroundColor: workout.color }}
              colSpan={999}
            >
              {workout.label}
              <WorkoutActions
                compact={compact}
                expanded={expanded}
                setExpanded={setExpanded}
                hover={hover}
                workout={workout}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const { id } = column;

                return (
                  <th
                    className={clsx(
                      id === 'index' && 'w-1/12',
                      id === 'sets' && 'w-1/12',
                      id === 'reps' && 'w-3/12',
                      id === 'weight' && 'w-3/12',
                      id === 'label' && 'w-3/12 bg-gray-100 text-left',
                      `font-bold border-gray-300 border-b-2 table-cell h-8 uppercase`
                    )}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className={expanded ? '' : 'hidden'} {...getTableBodyProps()}>
          {rows.map((row: Row<Exercise>, idx) => {
            prepareRow(row);

            const selected = !!selectedRows[row.id];
            const aboveSelected = idx > 0 && !!selectedRows[rows[idx - 1].id];
            const belowSelected =
              idx < rows.length - 1 && !!selectedRows[rows[idx + 1].id];

            const editing = editingRow?.id === row.id;

            if (editing)
              return (
                <UpdateExercise
                  exercise={exercises[Number(row.id)]}
                  workoutRef={workout.ref}
                  onClickOutside={() => setEditingRow(null)}
                />
              );

            return (
              <tr
                className="table-row cursor-pointer relative odd:bg-gray-50 group"
                {...row.getRowProps()}
                onClick={() => {
                  if (selected) {
                    unselectRow(row);
                    return;
                  }

                  selectRow(row);
                }}
                onDoubleClick={() => {
                  unselectRow(row);
                  setEditingRow(row);
                }}
              >
                {row.cells.map((cell) => {
                  const { value } = cell;
                  const { id } = cell.column;

                  const reps = id === 'reps';
                  const weight = id === 'weight';

                  return (
                    <td
                      className={clsx(
                        id === 'label'
                          ? 'text-left font-medium'
                          : 'font-semibold md:font-medium',
                        selected &&
                          `
                          first:after:absolute
                          first:after:top-0
                          first:after:left-0
                          first:after:w-full
                          first:after:h-full
                          first:after:border-2
                          first:after:border-blue-500
                          first:after:inline-block
                          `,
                        selected && aboveSelected && 'first:after:border-t',
                        selected && belowSelected && 'first:after:border-b',
                        `
                        group-hover:first:after:absolute
                        group-hover:first:after:top-0
                        group-hover:first:after:left-0
                        group-hover:first:after:w-full
                        group-hover:first:after:h-full
                        group-hover:first:after:shadow-inner
                        `,
                        'table-cell border-l-2 border-gray-200 h-8'
                      )}
                      {...cell.getCellProps()}
                    >
                      {Array.isArray(value) ? (
                        <div
                          className="grid h-full"
                          style={{
                            gridTemplateColumns: `repeat(${value.length}, minmax(0, 1fr))`,
                          }}
                        >
                          {value.map((eachValue) => (
                            <div
                              key={eachValue}
                              className="border-l-2 h-full flex justify-center items-center"
                            >
                              {eachValue}
                            </div>
                          ))}
                        </div>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((group) => {
            return (
              <tr {...group.getFooterGroupProps()}>
                {group.headers.map((column) => {
                  const { id } = column;

                  return (
                    <td
                      className={clsx(
                        id === 'label' && 'bg-gray-100 text-left',
                        'table-cell h-8 font-bold border-gray-300 border-b-0 border-t-2'
                      )}
                      {...column.getFooterProps()}
                    >
                      {column.render('Footer')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tfoot>
      </table>
    </div>
  );
};

export default Workout;
