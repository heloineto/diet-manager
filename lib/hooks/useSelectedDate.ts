import { DateTime } from 'luxon';
import { useState } from 'react';

const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());

  return { selectedDate, setSelectedDate };
};

export default useSelectedDate;
