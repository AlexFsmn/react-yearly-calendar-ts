import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, CalendarControls } from "react-yearly-calendar-ts";
import weekday from "dayjs/plugin/weekday";
import sv from "dayjs/locale/sv";
dayjs.extend(weekday);

const Demo = () => {
  const today = dayjs();
  const [year, setYear] = useState<number>(today.year());
  const [selectedDay, setSelectedDay] = useState<Dayjs>(today);
  const [selectedRange, setSelectedRange] = useState<Dayjs[]>([
    today,
    dayjs(today).add(15, "day"),
  ]);
  const [showDaysOfWeek, setShowDaysOfWeek] = useState<boolean>(true);
  const [showTodayBtn, setShowTodayBtn] = useState<boolean>(true);
  const [showWeekSeparators, setShowWeekSeparators] = useState<boolean>(true);
  const [selectRange, setSelectRange] = useState<boolean>(false);
  const [forceFullWeeks, setForceFullWeeks] = useState<boolean>(false);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);

  const customCSSclasses = {
    holidays: [
      "2018-04-25",
      "2018-05-01",
      "2018-06-02",
      "2018-08-15",
      "2018-11-01",
    ],
    spring: {
      start: "2018-03-21",
      end: "2018-6-20",
    },
    summer: {
      start: "2018-06-21",
      end: "2018-09-22",
    },
    autumn: {
      start: "2018-09-23",
      end: "2018-12-21",
    },
    weekend: "Sat,Sun",
    winter: (day: Dayjs) =>
      day.isBefore(dayjs(new Date(2018, 2, 21))) ||
      day.isAfter(new Date(2018, 11, 21)),
  };

  const onPrevYear = () => {
    setYear(year - 1);
  };

  const onNextYear = () => {
    setYear(year + 1);
  };

  const goToToday = () => {
    const today = dayjs();

    setSelectedDay(today);
    setSelectedRange([today, dayjs(today).add(15, "day")]);
    setYear(today.year());
  };

  const datePicked = (date: Dayjs) => {
    setSelectedDay(date);
    setSelectedRange([date, dayjs(date).add(15, "day")]);
  };

  const rangePicked = (start: Dayjs, end: Dayjs) => {
    setSelectedRange([start, end]);
    setSelectedDay(start);
  };

  const toggleShowDaysOfWeek = () => {
    setShowDaysOfWeek(!showDaysOfWeek);
  };

  const toggleForceFullWeeks = () => {
    setShowDaysOfWeek(true);
    setForceFullWeeks(!forceFullWeeks);
  };

  const toggleShowTodayBtn = () => {
    setShowTodayBtn(!showTodayBtn);
  };

  const toggleShowWeekSeparators = () => {
    setShowWeekSeparators(!showWeekSeparators);
  };

  const toggleSelectRange = () => {
    setSelectRange(!selectRange);
  };

  const selectFirstDayOfWeek = (event: any) => {
    setFirstDayOfWeek(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <div id="calendar">
        <CalendarControls
          year={year}
          showTodayButton={showTodayBtn}
          onPrevYear={() => onPrevYear()}
          onNextYear={() => onNextYear()}
          goToToday={() => goToToday()}
        />
        <Calendar
          locale={sv}
          year={year}
          selectedDay={selectedDay}
          showDaysOfWeek={showDaysOfWeek}
          forceFullWeeks={forceFullWeeks}
          showWeekSeparators={showWeekSeparators}
          firstDayOfWeek={firstDayOfWeek}
          selectRange={selectRange}
          selectedRange={selectedRange}
          onPickDate={(date: Dayjs) => datePicked(date)}
          onPickRange={(start: Dayjs, end: Dayjs) => rangePicked(start, end)}
          customClasses={customCSSclasses}
        />
      </div>

      <h5>
        Proudly brought to you by <a href="https://belkadigital.com/">Belka</a>
      </h5>

      <div className="options">
        <b>Demo Options</b>
        <br />
        <ul>
          <li>
            <input
              id="showDaysOfWeek"
              type="checkbox"
              checked={showDaysOfWeek}
              onChange={() => toggleShowDaysOfWeek()}
            />
            <label htmlFor="showDaysOfWeek">Show days of week</label>
          </li>
          <li>
            <input
              id="forceFullWeeks"
              type="checkbox"
              checked={forceFullWeeks}
              onChange={() => toggleForceFullWeeks()}
            />
            <label htmlFor="forceFullWeeks">Force full weeks</label>
          </li>
          <li>
            <input
              id="showTodayBtn"
              type="checkbox"
              checked={showTodayBtn}
              onChange={() => toggleShowTodayBtn()}
            />
            <label htmlFor="showTodayBtn">Show &apos;Today&apos; button</label>
          </li>
          <li>
            <input
              id="showWeekSeparators"
              type="checkbox"
              checked={showWeekSeparators}
              onChange={() => toggleShowWeekSeparators()}
            />
            <label htmlFor="showWeekSeparators">Show week separators</label>
          </li>
          <li>
            <label htmlFor="firstDayOfWeek">First day of week</label>
            <select
              id="firstDayOfWeek"
              value={firstDayOfWeek}
              onChange={(e) => selectFirstDayOfWeek(e)}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <option key={i} value={i}>
                  {dayjs().weekday(i).format("ddd")}
                </option>
              ))}
            </select>
          </li>
          <li>
            <input
              id="selectRange"
              type="checkbox"
              checked={selectRange}
              onChange={() => toggleSelectRange()}
            />
            <label htmlFor="selectRange">Select Date range</label>
          </li>
        </ul>
        <br />
        <i>All these options are available as Calendar props.</i>
      </div>
    </div>
  );
};

export default Demo;
