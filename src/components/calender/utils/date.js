import moment from "moment";

export function isSameDate(date1, date2) {
  return moment(date1).isSame(date2, "day");
}

export function isSameMonth(date1, date2) {
  return moment(date1).isSame(date2, "month");
}

export function isToday(date) {
  const today = new Date();
  return isSameDate(date, today);
}

export function isCurrentMonth(date) {
  const today = new Date();
  return isSameMonth(date, today);
}
