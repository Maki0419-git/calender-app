import { useState } from "react";
import "./calender.css";
import { useCalender } from "./hooks/useCalender";

const isToday = (date) => {
  const today = new Date();
  return date.day === today.getDate() &&
    date.month === today.getMonth() &&
    date.year === today.getFullYear()
    ? "today"
    : "";
};

const isActive = (date, startDate, endDate) => {
  if (startDate && endDate) {
    return new Date(date.year, date.month, date.day) >=
      new Date(startDate.year, startDate.month, startDate.day) &&
      new Date(date.year, date.month, date.day) <=
        new Date(endDate.year, endDate.month, endDate.day)
      ? "active"
      : "";
  } else if (
    startDate &&
    date.day === startDate.day &&
    date.month === startDate.month &&
    date.year === startDate.year
  )
    return "active";
  return "";
};

const isCurrentMonth = (date, enableCrossMonth) => {
  const today = new Date();
  return date.month === today.getMonth() && date.year === today.getFullYear()
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
    } else if (
      !endDate &&
      new Date(date.year, date.month, date.day) >=
        new Date(startDate.year, startDate.month, startDate.day)
    ) {
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
        {calenderWeeks.map((week, index) => {
          return (
            <div key={index} className="week">
              {week.map((date, i) => {
                return (
                  <div
                    key={i}
                    className={`date ${isToday(date)} ${isCurrentMonth(
                      date,
                      enableCrossMonth
                    )} ${isActive(date, startDate, endDate)}`}
                    onClick={() => handleDateClick(date, startDate, endDate)}
                  >
                    {date.day}日
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
