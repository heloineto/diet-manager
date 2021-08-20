import { useContext, useState } from 'react';
import CalendarHeader from './Calendar.Header';
import CalendarTable from './CalendarTable';

import { DateTime } from 'luxon';
import { SelectedDateContext } from '@lib/context';

const Calendar = () => {
  const calendarProps = {
    date,
    setDate,
    selectedDateTime,
    setSelectedDateTime,
    isExpanded: expanded,
    setIsExpanded: setExpanded,
  };

  return (
    <div
      className="border-2 rounded-xl"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        if (!date.hasSame(selectedDateTime, 'month')) setDate(selectedDateTime);
        setExpanded(false);
      }}
    >
      <CalendarHeader {...calendarProps} />
      <CalendarTable {...calendarProps} />
    </div>
  );
};

export default Calendar;
