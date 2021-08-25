import type { Row, Renderer, FooterProps } from 'react-table';

import { useContext, useMemo, useState } from 'react';
import { useTable } from 'react-table';

import { round } from 'lodash';

import clsx from 'clsx';

import removeFoodsByIndex from './removeFoodsByIndex';
import { useWindowDimensions } from '@lib/hooks';

import { IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilAltIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';

interface Props {
  meal: Meal;
  formattedFoods:
}

const Meal = ({ meal }: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('sm'));

  const [expanded, setExpanded] = useState(true);
  const [hover, setHover] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Row[]>([]); // !make this an object

  const [isFoodFormOpen, setIsFoodFormOpen] = useState(false);
  const [SidePopUp, setSidePopUp] = useState(null);
  const [isRemoveMealOpen, setIsRemoveMealOpen] = useState(false);
  const [isMealFormOpen, setIsMealFormOpen] = useState(false);

  const selectRow = (row: Row) => {
    setSelectedRows((value) => [...value, row]);
  };

  const unselectRow = (row: Row) => {
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

  const data = useMemo(() => meal.formattedFoods, [meal]);

  const columns = useMemo(() => {
    const Footer = (info, accessor) => {
      const getTotal = () =>
        useMemo(
          () => info.rows.reduce((sum, row) => row.values[accessor] + sum, 0),
          [info.rows]
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
  }, [meal, compact]);

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
              className={`table-cell border-b w-1/12 h-10 text-base font-extrabold relative bg-${meal.color}-50`}
              colSpan={999}
            >
              <div className="buttons right">
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
              {meal.label}
              <div className={`buttons ${hover ? '' : 'hidden'}`}>
                <IconButton onClick={() => setExpanded(!expanded)}>
                  {expanded ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </IconButton>
                <div className="divider mx-2" />
                <div className="flex gap-2 justify-center items-center">
                  <IconButton onClick={() => setIsMealFormOpen(true)}>
                    <PencilAltIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton onClick={() => setIsRemoveMealOpen(true)}>
                    <TrashIcon className="h-4 w-4 hover:text-red-700" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => setIsFoodFormOpen(true)}
                  >
                    <PlusIcon className="h-5 w-4" />
                  </IconButton>
                </div>
              </div>
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps()}
                    className={`${column.id} header`}
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
                    className={`${column.id} footer`}
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
      {/* <PopUp
        isOpen={isFoodFormOpen}
        setIsOpen={setIsFoodFormOpen}
        onFinish={() => setSidePopUp(null)}
        SidePopUp={SidePopUp}
      >
        <FoodForm
          mealRef={meal.ref}
          onFinish={() => {
            // setIsFoodFormOpen(false);
          }}
          setSidePopUp={setSidePopUp}
        />
      </PopUp>
      <PopUp isOpen={isRemoveMealOpen} setIsOpen={setIsRemoveMealOpen}>
        <RemoveMeal
          label={meal.label}
          mealRef={meal.ref}
          onFinish={() => {
            setIsRemoveMealOpen(false);
          }}
        />
      </PopUp>

      <PopUp isOpen={isMealFormOpen} setIsOpen={setIsMealFormOpen}>
        <MealForm onFinish={() => setIsMealFormOpen(false)} meal={meal} />
      </PopUp> */}
    </div>
  );
};

export default Meal;
