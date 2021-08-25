import { SelectedDateContext } from '@lib/context';
import { DateTime } from 'luxon';
import { useContext, useState } from 'react';

export const useCalendarState = () => {
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  const [navDate, setNavDate] = useState(DateTime.now());
  const [expanded, setExpanded] = useState(true);

  return {
    navDate,
    setNavDate,
    selectedDate,
    setSelectedDate,
    expanded,
    setExpanded,
  };
};
