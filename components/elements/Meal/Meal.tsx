import type { Row, Renderer, FooterProps } from 'react-table';

import { useContext, useMemo, useState } from 'react';
import { useTable } from 'react-table';

import { round } from 'lodash';

import clsx from 'clsx';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import removeFoodsByIndex from './removeFoodsByIndex';

import {
  ButtonGroup,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  PencilAltIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { useMealState } from './Meal.state';
import MealActions from './Meal.Actions';

interface Props {
  meal: MealWithRef;
  formattedFoods: FormattedFood[];
}

const Meal = ({ meal, formattedFoods }: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('sm'));

  const {
    expanded,
    setExpanded,
    hover,
    setHover,
    selectedRows,
    setSelectedRows,
  } = useMealState();

  const selectRow = (row: Row<FormattedFood>) => {
    setSelectedRows((value) => [...value, row]);
  };

  const unselectRow = (row: Row<FormattedFood>) => {
    setSelectedRows((value) =>
      value.filter((selectedRow) => selectedRow.id !== row.id)
    );
  };

  const removeFoodsAtRows = (rows: Row[]) => {
    // removeFoodsByIndex(
    //   meal,
    //   rows.map((row) => Number(row.id))
    // );
  };

  const data = useMemo(() => formattedFoods, [formattedFoods]);

  const columns = useMemo(() => {
    const Footer = ({ rows }: { rows: Row[] }, accessor: string) => {
      const getTotal = () =>
        useMemo(
          () => rows.reduce((sum, row) => row.values[accessor] + sum, 0),
          [rows]
        );

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
        Footer: (info) => Footer(info, 'carb'),
      },
      {
        Header: 'Prot',
        accessor: 'prot',
        Footer: (info) => Footer(info, 'prot'),
      },
      {
        Header: 'Gord',
        accessor: 'fat',
        Footer: (info) => Footer(info, 'fat'),
      },
      {
        Header: 'Kcal',
        accessor: 'kcal',
        Footer: (info) => Footer(info, 'kcal'),
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
              className={`table-cell border-b w-1/12 h-10 text-[0.875rem] md:text-base font-extrabold relative`}
              style={{ backgroundColor: meal.color }}
              colSpan={999}
            >
              {meal.label}
              <MealActions
                compact={compact}
                expanded={expanded}
                setExpanded={setExpanded}
                hover={hover}
                mealRef={meal.ref}
                mealLabel={meal.label}
              />
              <div className="absolute top-0 h-full mx-1 flex items-center justify-center right-0">
                {!!selectedRows?.length && (
                  <div className="flex justify-center items-center">
                    <IconButton
                      onClick={() => {
                        removeFoodsAtRows(selectedRows);
                        setSelectedRows([]);
                      }}
                    >
                      <TrashIcon className="hover:text-red-700" />
                    </IconButton>
                  </div>
                )}
              </div>
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps()}
                    className={`${column.id} font-bold bg-gray-100 border-gray-300 border-b-2`}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className={expanded ? '' : 'hidden'} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            let isSelectedRow = false;

            selectedRows?.forEach((selectedRow) => {
              if (selectedRow.id === row.id) {
                isSelectedRow = true;
                return;
              }
            });

            return (
              <tr
                className={clsx(
                  isSelectedRow && 'selected-row',
                  'table-row cursor-pointer relative'
                )}
                {...row.getRowProps()}
                onClick={() => {
                  if (isSelectedRow) {
                    unselectRow(row);
                    return;
                  }

                  selectRow(row);
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`${cell.column.id}`}
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
                {group.headers.map((column) => (
                  <td
                    className={`${column.id} font-bold bg-gray-100 border-gray-300`}
                    {...column.getFooterProps()}
                  >
                    {column.render('Footer')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tfoot>
      </table>
    </div>
  );
};

export default Meal;
