import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { startCase } from 'lodash';
import clsx from 'clsx';
import { IconButton, Button } from '@material-ui/core';
import {
  ArrowLeftIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';
import { KeyboardDatePicker } from '@material-ui/pickers';

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
  selectedDate,
  setSelectedDate,
  expanded,
}: Props) => {
  const [searchMode, setSearchMode] = useState(false);

  const navigateForward = () =>
    setNavDate(navDate.minus(expanded ? { months: 1 } : { weeks: 1 }));

  const navigateBackward = () =>
    setNavDate(navDate.plus(expanded ? { months: 1 } : { weeks: 1 }));

  const goto = (date: DateTime) => {
    setNavDate(date);
    setSelectedDate && setSelectedDate(date);
  };

  const renderSearchMode = () => (
    <>
      <IconButton onClick={() => setSearchMode(false)}>
        <ArrowLeftIcon className="h-6 w-6" />
      </IconButton>

      <KeyboardDatePicker
        className="w-full"
        value={selectedDate}
        onChange={(date) => {
          if (date instanceof Date) {
            const dateTime = DateTime.fromJSDate(date);
            if (dateTime.isValid) goto(dateTime);
          }
        }}
        label="Escolha uma data"
        name="date"
        format="dd/MM/yyyy"
        placeholder="dd/mm/yyyy"
      />
    </>
  );

  const renderNormalMode = () => (
    <>
      <IconButton
        className="p-1 h-8 w-8 hover:text-blue-600"
        onClick={navigateForward}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </IconButton>

      <IconButton
        className="p-1 h-8 w-8 hover:text-blue-600"
        onClick={navigateBackward}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </IconButton>
      <div className="ml-1 text-lg font-bold text-gray-700">{`${startCase(
        navDate.monthLong
      )} ${navDate.year}`}</div>

      <Button
        className="ml-auto mr-2 border-2 text-base"
        color="secondary"
        variant="outlined"
        onClick={() => goto(DateTime.now())}
      >
        Hoje
      </Button>
      <IconButton onClick={() => setSearchMode((value) => !value)}>
        <SearchIcon className="h-6 w-6" />
      </IconButton>
    </>
  );

  return (
    <div
      className={clsx(
        searchMode ? 'h-2/5' : 'h-14',
        'border-b-2 flex items-center p-2 text-gray-500'
      )}
    >
      {searchMode ? renderSearchMode() : renderNormalMode()}
    </div>
  );
};

export default CalendarHeader;
