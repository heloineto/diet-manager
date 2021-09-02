import { SelectedDateContext } from '@lib/context';
import { DateTime } from 'luxon';
import { useContext, useState } from 'react';

interface InitialStates {
  expanded?: boolean;
}

export const useCalendarState = (initialStates: InitialStates) => {
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  const [navDate, setNavDate] = useState(DateTime.now());
  const [expanded, setExpanded] = useState(initialStates.expanded ?? true);

  return {
    navDate,
    setNavDate,
    selectedDate,
    setSelectedDate,
    expanded,
    setExpanded,
  };
};
