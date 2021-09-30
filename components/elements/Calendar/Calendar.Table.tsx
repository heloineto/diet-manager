import type { Dispatch, SetStateAction } from 'react';

import { useMemo } from 'react';
import { useTable } from 'react-table';
import { DateTime, Interval } from 'luxon';
import clsx from 'clsx';

import { getColumns, getMonthData } from './Calendar.utils';

interface Props {
  navDate: DateTime;
  setNavDate: Dispatch<SetStateAction<DateTime>>;
  selectedDate: DateTime;
  setSelectedDate: Dispatch<SetStateAction<DateTime>> | null;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const CalendarTable = ({
  navDate,
  setNavDate,
  selectedDate,
  setSelectedDate,
  expanded,
}: Props) => {
  const data = useMemo(() => getMonthData(navDate), [navDate]);
  const columns = useMemo(() => getColumns(), [navDate]);

  //! Changed this from selectedDate to navDate. Make sure nothing is broken
  const currWeek = useMemo(
    () =>
      Interval.fromDateTimes(
        navDate.plus({ days: 1 }).startOf('week'),
        navDate.plus({ days: 1 }).endOf('week')
      ).mapEndpoints((endpoint) => endpoint.minus({ days: 1 })),
    [navDate]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="p-2">
      <table className="w-full table-fixed" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="table-row" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="table-cell" {...column.getHeaderProps()}>
                  <div className="text-gray-600 font-bold text-sm">
                    {column.render('Header')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const cellDate = cell.value;

                  const shouldHide = !expanded && !currWeek.contains(cellDate);
                  const isToday = cellDate.hasSame(DateTime.now(), 'day');
                  const isSelected = cellDate.hasSame(selectedDate, 'day');
                  const isAnotherMonth = !cellDate.hasSame(navDate, 'month');
                  if (shouldHide) return null;

                  return (
                    <td className="table-cell" {...cell.getCellProps()}>
                      <div
                        className={clsx(
                          isToday && 'border-primary-200',
                          isSelected && '!border-primary-500 text-primary-600',
                          isAnotherMonth && 'text-gray-300 border-gray-100',
                          `
                          relative w-full text-gray-600 font-semibold border-2 rounded-md
                          overflow-hidden cursor-pointer transition-shadow duration-1000

                          hover:transition-shadow hover:duration-[0s] hover:shadow-calendar-primary-500

                          after:block after:pb-[75%]  
                          `
                        )}
                        onClick={() => {
                          if (!cell.value.hasSame(navDate, 'month')) {
                            setNavDate(cell.value);
                          }

                          setSelectedDate && setSelectedDate(cell.value);
                        }}
                      >
                        <div
                          className={clsx(
                            isToday && 'bg-primary-200 border-2 border-white rounded-md',
                            'text-[0.950rem] absolute w-full h-full flex flex-col items-center justify-center'
                          )}
                        >
                          {cell.render('Cell')}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
