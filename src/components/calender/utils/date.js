import moment from "moment";

export function isSameDate(date1, date2) {
  return moment(date1).isSame(date2, "day");
}

export function isSameMonth(date1, date2) {
  return moment(date1).isSame(date2, "month");
}
