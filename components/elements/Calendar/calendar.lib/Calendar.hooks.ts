import { SelectedDateContext } from '@lib/context';
import { DateTime } from 'luxon';
import { useContext, useState } from 'react';

export const useCalendarState = () => {
  const { selectedDateTime, setSelectedDateTime } =
    useContext(SelectedDateContext);

  const [date, setDate] = useState(DateTime.now());
  const [expanded, setExpanded] = useState(false);

  return;
};
