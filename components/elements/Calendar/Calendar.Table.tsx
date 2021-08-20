import type { Dispatch, SetStateAction } from 'react';

import { useMemo } from 'react';
import { useTable } from 'react-table';
import { DateTime, Interval, Info } from 'luxon';

const WEEK_STARTS_ON_SUNDAY = true;

const WEEKDAYS = Info.weekdays('short', { locale: 'br' }).map((weekday) =>
  weekday.replace('.', '')
);

if (WEEK_STARTS_ON_SUNDAY) {
  const aux = WEEKDAYS.pop();
  WEEKDAYS.unshift(aux);
}

/**
 * According to international standard ISO 8601, weeks always start on Mondays.
 * Keep that in mind.
 */

const getMonthData = (date = DateTime.now()) => {
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');

  const startDay = startOfMonth.startOf('week'); /* .minus({ day: 1 }); */
  const endDay = endOfMonth.endOf('week'); /* .minus({ day: 1 }); */

  let calendarInterval = Interval.fromDateTimes(startDay, endDay);

  while (calendarInterval.count('weeks') < 6) {
    calendarInterval = calendarInterval.set({
      end: calendarInterval.end.plus({ weeks: 1 }),
    });
  }

  if (WEEK_STARTS_ON_SUNDAY) {
    calendarInterval = calendarInterval.mapEndpoints((endpoint) =>
      endpoint.minus({ days: 1 })
    );
  }

  const monthData = [];

  calendarInterval.splitBy({ week: 1 }).forEach((week) => {
    const weekData = {};

    week
      .splitBy({ day: 1 })
      .forEach(({ start }, idx) => (weekData[WEEKDAYS[idx]] = start));

    monthData.push(weekData);
  });

  return monthData;
};

const getColumns = () => {
  const columns = [];

  WEEKDAYS.forEach((weekday) => {
    columns.push({
      Header: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      accessor: weekday,
      Cell: ({ value }) => <div>{value.day}</div>,
    });
  });

  return columns;
};

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
  const getCellClassName = (cellDate) => {
    const classNames = [];

    const currWeek = Interval.fromDateTimes(
      //! MAKE SURE THIS IS HOW WEEKS WORK WITH LUXON
      selectedDate.plus({ day: 1 }).startOf('week'),
      selectedDate.plus({ day: 1 }).endOf('week')
    ).mapEndpoints((endpoint) => endpoint.minus({ days: 1 }));

    if (!expanded && !currWeek.contains(cellDate)) {
      return 'hidden';
    }
    if (cellDate.hasSame(DateTime.now(), 'day')) classNames.push('today');
    if (cellDate.hasSame(selectedDate, 'day')) classNames.push('selected');
    if (!cellDate.hasSame(navDate, 'month')) classNames.push('another-month');

    return classNames.join(' ');
  };

  const data = useMemo(() => getMonthData(navDate), [navDate]);
  const columns = useMemo(() => getColumns(), [navDate]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="p-2">
      <table {...getTableProps()} className="calendar-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-row">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div className="text-gray-600 font-extrabold text-sm sm:text-base">
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
                  return (
                    <td {...cell.getCellProps()}>
                      <div
                        className={getCellClassName(cell.value)}
                        onClick={() => {
                          if (!cell.value.hasSame(navDate, 'month')) {
                            setNavDate(cell.value);
                          }

                          setSelectedDate && setSelectedDate(cell.value);
                        }}
                      >
                        <div>{cell.render('Cell')}</div>
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
