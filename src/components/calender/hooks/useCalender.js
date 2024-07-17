import { useMemo } from "react";

export function useCalender(month, year) {
  const calenderDates = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const dates = [];
    /** push previous month's dates into array  */
    for (let x = firstDayIndex; x > 0; x--) {
      dates.push(new Date(year, month - 1, prevMonthLastDay - x + 1));
    }
    /** push current month's dates into array */
    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(new Date(year, month, i));
    }
    /** push next month's dates into array */
    for (let j = 1; j <= 6 - lastDayIndex; j++) {
      dates.push(new Date(year, month + 1, j));
    }
    return dates;
  }, [month, year]);

  const calenderWeeks = useMemo(() => {
    return calenderDates.reduce((acc, date) => {
      const week = acc[acc.length - 1];
      if (!week || week.length === 7) {
        acc.push([date]);
      } else {
        week.push(date);
      }
      return acc;
    }, []);
  }, [calenderDates]);

  return {
    calenderDates,
    calenderWeeks,
  };
}
