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

const isCurrentMonth = (date) => {
  const today = new Date();
  return date.month === today.getMonth() && date.year === today.getFullYear()
    ? ""
    : "none-current-month";
};

export function Calender() {
  const [date, setDate] = useState(new Date());
  const { calenderWeeks } = useCalender(date.getMonth(), date.getFullYear());

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
                    className={`date ${isToday(date)} ${isCurrentMonth(date)}`}
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
