import type { Row } from 'react-table';

import { useMemo } from 'react';
import { useTable } from 'react-table';
import { omit, round, pick } from 'lodash';
import clsx from 'clsx';

import { useMediaQuery, useTheme } from '@material-ui/core';
import { useMealState } from './Meal.state';
import MealActions from './Meal.Actions';
import { useColors } from '@lib/hooks';
import { isKeyInShallowObject } from '@utils/typescript';

interface Info {
  rows: Row[];
}

interface Props {
  meal: MealWithRef;
}

const Meal = ({ meal }: Props) => {
  const formattedFoods: FormattedFood[] = useMemo(
    () =>
      meal.foods.map((food) => {
        const { amount, unit } = food;
        const formattedFood = {
          ...food,
          amount: `${amount}${unit}`,
        };

        const macros = pick(formattedFood, ['carb', 'prot', 'fat', 'kcal']);
        Object.entries(macros).forEach(([key, value]) => {
          if (isKeyInShallowObject(key, macros))
            formattedFood[key] = round(value * amount, 2) || 0;
        });

        return formattedFood;
      }),
    [meal]
  );

  const colors = useColors();
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const { expanded, setExpanded, hover, setHover, selectedRows, setSelectedRows } =
    useMealState();

  const selectRow = (row: Row<FormattedFood>) => {
    setSelectedRows((value) => ({ ...value, [row.id]: row }));
  };

  const unselectRow = (row: Row<FormattedFood>) => {
    setSelectedRows((value) => omit(value, [row.id]));
  };

  const data = useMemo(() => formattedFoods, [formattedFoods]);

  const columns = useMemo(() => {
    const Footer = ({ rows }: Info, accessor: string) => {
      const getTotal = () =>
        useMemo(() => rows.reduce((sum, row) => row.values[accessor] + sum, 0), [rows]);

      return <>{round(getTotal(), 2) || 0}</>;
    };

    return [
      {
        Header: 'Qtn.',
        accessor: 'amount',
        Footer: 'Total',
      },
      {
        Header: compact ? 'Alimento' : 'Descrição Do Alimento',
        accessor: 'label',
      },
      {
        Header: 'Carb',
        accessor: 'carb',
        Footer: (info: Info) => Footer(info, 'carb'),
      },
      {
        Header: 'Prot',
        accessor: 'prot',
        Footer: (info: Info) => Footer(info, 'prot'),
      },
      {
        Header: 'Gord',
        accessor: 'fat',
        Footer: (info: Info) => Footer(info, 'fat'),
      },
      {
        Header: 'Kcal',
        accessor: 'kcal',
        Footer: (info: Info) => Footer(info, 'kcal'),
      },
    ];
  }, [formattedFoods, compact]);

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
              style={{ backgroundColor: colors?.[meal?.color]?.[50] ?? 'white' }}
              colSpan={999}
            >
              {meal.label}
              <MealActions
                compact={compact}
                expanded={expanded}
                setExpanded={setExpanded}
                hover={hover}
                meal={meal}
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
                      id === 'carb' && 'bg-indigo-300 text-indigo-900',
                      id === 'prot' && 'bg-blue-300 text-blue-900',
                      id === 'fat' && 'bg-yellow-300 text-yellow-900',
                      id === 'kcal' && 'bg-green-300 text-green-900',
                      id === 'label' && 'bg-gray-100 w-6/12 text-left',
                      id === 'amount' && 'bg-gray-100',
                      `font-bold border-gray-300 border-b-2 table-cell w-1/12 h-8`
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
          {rows.map((row: Row<FormattedFood>, idx) => {
            prepareRow(row);

            const selected = !!selectedRows[row.id];
            const aboveSelected = idx > 0 && !!selectedRows[rows[idx - 1].id];
            const belowSelected =
              idx < rows.length - 1 && !!selectedRows[rows[idx + 1].id];

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
              >
                {row.cells.map((cell) => {
                  const { id } = cell.column;

                  return (
                    <td
                      className={clsx(
                        id === 'carb' &&
                          'bg-indigo-100 text-indigo-900 group-odd:bg-indigo-200',
                        id === 'prot' &&
                          'bg-blue-100 text-blue-900 group-odd:bg-blue-200',
                        id === 'fat' &&
                          'bg-yellow-100 text-yellow-900 group-odd:bg-yellow-200',
                        id === 'kcal' &&
                          'bg-green-100 text-green-900 group-odd:bg-green-200',
                        id === 'label'
                          ? 'w-6/12 text-left font-medium'
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
                        'table-cell border-b w-1/12 h-8'
                      )}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
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
                        id === 'carb' && 'bg-indigo-300 text-indigo-900',
                        id === 'prot' && 'bg-blue-300 text-blue-900',
                        id === 'fat' && 'bg-yellow-300 text-yellow-900',
                        id === 'kcal' && 'bg-green-300 text-green-900',
                        id === 'label' && 'bg-gray-100 w-6/12 text-left',
                        id === 'amount' && 'bg-gray-100',
                        'table-cell w-1/12 h-8 font-bold border-gray-300 border-b-0 border-t-2'
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

export default Meal;
