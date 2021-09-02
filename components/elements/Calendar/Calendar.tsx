import { useCalendarState } from './Calendar.state';
import CalendarHeader from './Calendar.Header';
import CalendarTable from './Calendar.Table';

interface Props {
  expanded?: boolean;
}

const Calendar = (props: Props) => {
  const calendarState = useCalendarState({ expanded: props?.expanded });

  return (
    <div
      className="border-2 rounded-xl"
      // onMouseEnter={() => setExpanded(true)}
      // onMouseLeave={() => {
      //   if (!navDate.hasSame(selectedDate, 'month')) setNavDate(selectedDate);
      //   setExpanded(false);
      // }}
    >
      <CalendarHeader {...calendarState} />
      <CalendarTable {...calendarState} />
    </div>
  );
};

export default Calendar;
