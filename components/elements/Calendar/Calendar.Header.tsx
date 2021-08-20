import type { Dispatch, SetStateAction } from 'react';

import { useState } from 'react';
import { Form } from 'react-final-form';
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowLeft,
  FaSearch,
} from 'react-icons/fa';
import { DateTime } from 'luxon';
import { startCase } from 'lodash';

import clsx from 'clsx';

import StrippedIconButton from '@buttons/StrippedIconButton';
import DateInputField from '@form/DateInputField';
import SelectInput from '@form/SelectInput';

import type { CalendarState } from './Calendar.hooks';
import { IconButton } from '@material-ui/core';
import { ArrowLeftIcon } from '@heroicons/react/outline';

interface Props {
  navDate: DateTime;
  setNavDate: Dispatch<SetStateAction<DateTime>>;
  selectedDate: DateTime;
  setSelectedDate: Dispatch<SetStateAction<DateTime>> | null;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const CalendarHeader = ({
  navDate,
  setNavDate,
  setSelectedDate,
  expanded,
}: Props) => {
  const [searchMode, setSearchMode] = useState(false);

  const iconProps = {
    twSize: 6,
    className: 'hover:text-blue-600',
  };


  const renderSearchMode = () => <>
  <IconButton
    onClick={() => setSearchMode(false)}
  >
    < ArrowLeftIcon className="h-6 w-6" />
  </IconButton>

  <Form
    onSubmit={({ searchDate: { day, month, year } }) => {
      searchedDate = DateTime.fromObject({
        day: day.value,
        month: month.value,
        year: year.value,
      });

      setNavDate(searchedDate);
      setSelectedDate(searchedDate);
    }}
  >
    {({ handleSubmit, form, values, ...rest }) => (
      <form onSubmit={handleSubmit} className="w-full">
        <DateInputField name="searchDate" label="Select a Date" />
        {/* {form.submit()} */}
      </form>
    )}
  </Form>
</>

  return (
    <div
      className={clsx(
        mode ? 'h-2/5' : 'h-14',
        'header border-b-2 flex items-center p-2 def-gap-x text-gray-500'
      )}
    >
      {mode ? (
        
      ) : (
        <>
          <div className="nav-arrows flex">
            <StrippedIconButton
              {...iconProps}
              Icon={(props) => <FaAngleLeft {...props} />}
              onClick={() =>
                setNavDate(
                  navDate.minus(isExpanded ? { months: 1 } : { weeks: 1 })
                )
              }
            />
            <StrippedIconButton
              {...iconProps}
              Icon={(props) => <FaAngleRight {...props} />}
              onClick={() =>
                setNavDate(
                  navDate.plus(isExpanded ? { months: 1 } : { weeks: 1 })
                )
              }
            />
          </div>
          <div className="month-year text-xl font-bold text-gray-700">{`${startCase(
            navDate.monthLong
          )} ${navDate.year}`}</div>
          {/* <div className="range-selector-wrapper ml-auto w-1/3">
              <SelectInput
                options={[
                  { label: 'Dia', value: 'day' },
                  { label: 'Semana', value: 'week' },
                  { label: 'Mês', value: 'month' },
                  { label: 'Ano', value: 'year' },
                ]}
                defaultValue={rangeOptions[0]}
              />
            </div>
           */}
          <button
            className="ml-auto w-1/5 border-2 rounded-lg h-full grid place-content-center font-semibold hover:border-blue-500 hover:text-blue-600"
            onClick={() => {
              setNavDate(DateTime.now());
              setSelectedDate(DateTime.now());
            }}
          >
            Hoje
          </button>
          <StrippedIconButton
            {...iconProps}
            Icon={(props) => <FaSearch {...props} />}
            onClick={() => setSearchMode(!mode)}
          />
        </>
      )}
    </div>
  );
};

export default CalendarHeader;
