import { useCalendarState } from './Calendar.hooks';
import CalendarHeader from './Calendar.Header';
import CalendarTable from './Calendar.Table';

const Calendar = () => {
  const calendarState = useCalendarState();

  const { navDate, setNavDate, selectedDate, setExpanded } = calendarState;

  return (
    <div
      className="border-2 rounded-xl"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        if (!navDate.hasSame(selectedDate, 'month')) setNavDate(selectedDate);
        setExpanded(false);
      }}
    >
      <CalendarHeader {...calendarState} />
      <CalendarTable {...calendarState} />
    </div>
  );
};

export default Calendar;
