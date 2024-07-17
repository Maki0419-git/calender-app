import { useState } from "react";
import "./calender.css";
import { useCalender } from "./hooks/useCalender";
import { isSameDate, isSameMonth } from "./utils/date";

const isToday = (date) => {
  const today = new Date();
  return isSameDate(date, today) ? "today" : "";
};

const isActive = (date, startDate, endDate) => {
  if (startDate && endDate) {
    return date >= startDate && date <= endDate ? "active" : "";
  } else if (startDate && isSameDate(date, startDate)) return "active";
  return "";
};

const isCurrentMonth = (date, enableCrossMonth) => {
  const today = new Date();
  return isSameMonth(date, today)
    ? ""
    : `none-current-month ${enableCrossMonth ? "" : "disabled"}`;
};

export function Calender({ options = { enableCrossMonth: false } }) {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { calenderWeeks } = useCalender(date.getMonth(), date.getFullYear());
  const { enableCrossMonth } = options;
  console.log({
    startDate,
    endDate,
  });
  const prevMonth = () => {
    setDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    });
  };

  const nextMonth = () => {
    setDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    });
  };

  const handleDateClick = (date) => {
    if (!startDate) {
      setStartDate(date);
    } else if (!endDate && date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  console.log(calenderWeeks);
  return (
    <div className="container">
      <div className="header">
        <button className="arrow-left" onClick={prevMonth}>
          &lt;
        </button>
        <div className="month">
          {date.getFullYear()}年 {date.getMonth() + 1}月
        </div>
        <button className="arrow-right" onClick={nextMonth}>
          &gt;
        </button>
      </div>
      <div className="dates">
        {calenderWeeks.map((week) => {
          return (
            <div key={week} className="week">
              {week.map((date) => {
                return (
                  <div
                    key={date.valueOf()}
                    className={`date ${isToday(date)} ${isCurrentMonth(
                      date,
                      enableCrossMonth
                    )} ${isActive(date, startDate, endDate)}`}
                    onClick={() => handleDateClick(date, startDate, endDate)}
                  >
                    {date.getDate()}日
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
