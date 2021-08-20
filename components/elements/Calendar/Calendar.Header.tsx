import { useState } from 'react';
import { Form } from 'react-final-form';
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowLeft,
  FaSearch,
} from 'react-icons/fa';
import { DateTime } from 'luxon';
import _ from 'lodash';

import StrippedIconButton from '@buttons/StrippedIconButton';
import DateInputField from '@form/DateInputField';
import SelectInput from '@form/SelectInput';

const CalendarHeader = ({ date, setDate, setSelectedDateTime, isExpanded }) => {
  const [isSearch, setIsSearch] = useState(false);

  const iconProps = {
    twSize: 6,
    className: 'hover:text-blue-600',
  };

  return (
    <div
      className={`header border-b-2 flex items-center p-2 def-gap-x text-gray-500 ${
        isSearch ? 'h-2/5' : 'h-14'
      }`}
    >
      {isSearch ? (
        <>
          <StrippedIconButton
            {...iconProps}
            Icon={(props) => <FaArrowLeft {...props} />}
            onClick={() => setIsSearch(!isSearch)}
          />

          <Form
            onSubmit={({ searchDate: { day, month, year } }) => {
              searchedDate = DateTime.fromObject({
                day: day.value,
                month: month.value,
                year: year.value,
              });

              setDate(searchedDate);
              setSelectedDateTime(searchedDate);
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
      ) : (
        <>
          <div className="nav-arrows flex">
            <StrippedIconButton
              {...iconProps}
              Icon={(props) => <FaAngleLeft {...props} />}
              onClick={() =>
                setDate(date.minus(isExpanded ? { months: 1 } : { weeks: 1 }))
              }
            />
            <StrippedIconButton
              {...iconProps}
              Icon={(props) => <FaAngleRight {...props} />}
              onClick={() =>
                setDate(date.plus(isExpanded ? { months: 1 } : { weeks: 1 }))
              }
            />
          </div>
          <div className="month-year text-xl font-bold text-gray-700">{`${_.startCase(
            date.monthLong
          )} ${date.year}`}</div>
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
              setDate(DateTime.now());
              setSelectedDateTime(DateTime.now());
            }}
          >
            Hoje
          </button>
          <StrippedIconButton
            {...iconProps}
            Icon={(props) => <FaSearch {...props} />}
            onClick={() => setIsSearch(!isSearch)}
          />
        </>
      )}
    </div>
  );
};

export default CalendarHeader;
