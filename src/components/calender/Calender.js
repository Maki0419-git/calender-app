import { useState } from "react";
import "./calender.css";
import { useCalender } from "./hooks/useCalender";
import { isCurrentMonth, isSameDate, isToday } from "./utils/date";

const isActive = (date, startDate, endDate) => {
  if (startDate && endDate) {
    return date >= startDate && date <= endDate;
  } else if (startDate && isSameDate(date, startDate)) return true;
  return false;
};

const getClassNames = (date, startDate, endDate, enableCrossMonth) => {
  return `date ${isToday(date) ? "today" : ""} ${
    isActive(date, startDate, endDate) ? "active" : ""
  } ${isCurrentMonth(date) ? "" : "none-current-month"} ${
    !isCurrentMonth(date) && !enableCrossMonth ? "disabled" : ""
  }`.trimEnd();
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
        {calenderWeeks.map((week, index) => {
          return (
            <div key={index} className="week">
              {week.map((date) => {
                return (
                  <button
                    key={date.valueOf()}
                    disabled={
                      !enableCrossMonth && !isCurrentMonth(date) ? true : false
                    }
                    className={getClassNames(
                      date,
                      startDate,
                      endDate,
                      enableCrossMonth
                    )}
                    onClick={() => handleDateClick(date, startDate, endDate)}
                  >
                    {date.getDate()}日
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
