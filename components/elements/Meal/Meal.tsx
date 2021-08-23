import type { Row, Renderer, FooterProps } from 'react-table';

import { useContext, useMemo, useState } from 'react';
import { useTable } from 'react-table';

import RoundIconButton from '@buttons/RoundIconButton';
import roundNumber from '@utils/roundNumber';
import PopUp from '@overlays/PopUp';

import FoodForm from './FoodForm';
import RemoveMeal from './RemoveMeal';
import removeFoodsByIndex from './removeFoodsByIndex';
import { useWindowDimensions } from '@lib/hooks';
import MealForm from '../MealForm';
import { IconButton, useTheme } from '@material-ui/core';
import { TrashIcon } from '@heroicons/react/outline';

interface Props {
  formattedMeal: Meal & { formattedFoods: any };
}

const Meal = ({ formattedMeal }: Props) => {
  const { width } = useWindowDimensions();
  const { breakpoints } = useTheme();

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
    removeFoodsByIndex(
      formattedMeal,
      rows.map((row) => Number(row.id))
    );
  };

  const data = useMemo(() => formattedMeal.formattedFoods, [formattedMeal]);

  const columns = useMemo(() => {
    const Footer = (info, accessor) => {
      const getTotal = () =>
        useMemo(
          () => info.rows.reduce((sum, row) => row.values[accessor] + sum, 0),
          [info.rows]
        );

      return <>{roundNumber(getTotal(), { decimalPlaces: 2 })}</>;
    };

    return [
      {
        Header: 'Qtn.',
        accessor: 'amount',
        Footer: 'Total',
      },
      {
        Header:
          width <= breakpoints.values['sm']
            ? 'Alimento'
            : 'Descrição Do Alimento',
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
        Footer: (info) => Footer(info, 'prot') as Renderer<FooterProps<any>>,
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
  }, [formattedMeal, width]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="meal-table-wrapper">
      <table
        {...getTableProps()}
        className="meal-table"
        cellSpacing="0"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <thead>
          <tr>
            <th
              colSpan={999}
              className={`header title bg-${formattedMeal.color}-50`}
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
              {formattedMeal.label}
              <div className={`buttons ${hover ? '' : 'hidden'}`}>
                <IconButton onClick={() => setExpanded(!expanded)}>
                  {expanded ? (
                    <FaChevronUp className="h-4 w-4" />
                  ) : (
                    <FaChevronDown className="h-4 w-4" />
                  )}
                </IconButton>
                <div className="divider mx-2" />
                <div className="flex gap-2 justify-center items-center">
                  <IconButton onClick={() => setIsMealFormOpen(true)}>
                    <FaRegEdit className="h-4 w-4" />
                  </IconButton>
                  <IconButton onClick={() => setIsRemoveMealOpen(true)}>
                    <FaRegTrashAlt className="h-4 w-4 hover:text-red-700" />
                  </IconButton>
                  <IconButton onClick={() => setIsFoodFormOpen(true)}>
                    <TiPlus className="h-5 w-4" />
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
        <tbody {...getTableBodyProps()} className={expanded ? '' : 'hidden'}>
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
                {...row.getRowProps()}
                onClick={() => {
                  if (isSelectedRow) {
                    unselectRow(row);
                    return;
                  }

                  selectRow(row);
                }}
                className={isSelectedRow ? 'selected-row' : ''}
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
                    {...column.getFooterProps()}
                    className={`${column.id} accent footer`}
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
