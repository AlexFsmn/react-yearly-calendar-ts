import React, { useState } from "react";
import moment, { Moment } from "moment";
import { Calendar, CalendarControls } from "react-yearly-calendar-ts";

const Demo = () => {
  const today = moment();
  const [year, setYear] = useState<number>(today.year());
  const [selectedDay, setSelectedDay] = useState<Moment>(today);
  const [selectedRange, setSelectedRange] = useState<Moment[]>([
    today,
    moment(today).add(15, "day"),
  ]);
  const [showDaysOfWeek, setShowDaysOfWeek] = useState<boolean>(true);
  const [showTodayBtn, setShowTodayBtn] = useState<boolean>(true);
  const [showWeekSeparators, setShowWeekSeparators] = useState<boolean>(true);
  const [selectRange, setSelectRange] = useState<boolean>(false);
  const [forceFullWeeks, setForceFullWeeks] = useState<boolean>(false);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);

  const onPrevYear = () => {
    setYear(year - 1);
  };

  const onNextYear = () => {
    setYear(year + 1);
  };

  const goToToday = () => {
    const today = moment();

    setSelectedDay(today);
    setSelectedRange([today, moment(today).add(15, "day")]);
    setYear(today.year());
  };

  const datePicked = (date: Moment) => {
    setSelectedDay(date);
    setSelectedRange([date, moment(date).add(15, "day")]);
  };

  const rangePicked = (start: Moment, end: Moment) => {
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
          year={year}
          selectedDay={selectedDay}
          showDaysOfWeek={showDaysOfWeek}
          forceFullWeeks={forceFullWeeks}
          showWeekSeparators={showWeekSeparators}
          firstDayOfWeek={firstDayOfWeek}
          selectRange={selectRange}
          selectedRange={selectedRange}
          onPickDate={(date: Moment) => datePicked(date)}
          onPickRange={(start: Moment, end: Moment) => rangePicked(start, end)}
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
                  {moment().weekday(i).format("ddd")}
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
