import classNames from 'clsx';

import { useCalendarState } from './Calendar.state';
import CalendarHeader from './Calendar.Header';
import CalendarTable from './Calendar.Table';

interface Props {
  className?: string;
  expanded?: boolean;
}

const Calendar = ({ expanded, className }: Props) => {
  const calendarState = useCalendarState({ expanded: expanded });

  return (
    <div className={classNames(className, 'border-2 rounded-xl')}>
      <CalendarHeader {...calendarState} />
      <CalendarTable {...calendarState} />
    </div>
  );
};

export default Calendar;
