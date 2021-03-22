import React from "react"; // , { useEffect, useState }
import dayjs, { Dayjs } from "dayjs";
import Day from "./Day";
import { range } from "./utils";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

interface Props {
  year: number;
  month: number;
  forceFullWeeks: boolean;
  showWeekSeparators: boolean;
  selectedDay: Dayjs;
  firstDayOfWeek: number;
  selectingRange?: Dayjs[];
  selectRange: boolean;
  selectedRange?: Dayjs[];
  customClasses?: any | (() => void);
  titles?: (m: Dayjs) => string;
  dayClicked: (day: Dayjs, classes: any) => void;
  dayHovered: (day: Dayjs) => void;
  showCurrentMonthOnly: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const defaultProps = {
  selectingRange: undefined,
  selectedRange: undefined,
  customClasses: undefined,
  titles: undefined,
};

const Month = (props: Props) => {
  const renderMonthDays = () => {
    const {
      year,
      month,
      forceFullWeeks,
      showWeekSeparators,
      selectedDay,
      firstDayOfWeek,
      selectingRange,
      selectRange,
      selectedRange,
      customClasses,
      titles,
    } = props;

    const monthStart = dayjs(new Date(year, month, 1)); // current day

    const dayClicked = (day: Dayjs, classes: any) => {
      props.dayClicked(day, classes);
    };

    const dayHovered = (day: Dayjs) => {
      if (props.selectRange) {
        props.dayHovered(day);
      }
    };

    // number of days to insert before the first of the month to correctly align the weekdays
    let prevMonthDaysCount = monthStart.weekday();
    while (prevMonthDaysCount < firstDayOfWeek) {
      prevMonthDaysCount += 7;
    }
    // days in month
    const numberOfDays = monthStart.daysInMonth();
    // insert days at the end to match up 37 (max number of days in a month + 6)
    // or 42 (if user prefers seeing the week closing with Sunday)
    const totalDays = forceFullWeeks ? 42 : 37;

    // day-generating loop
    const days: JSX.Element[] = [];
    range(firstDayOfWeek + 1, totalDays + firstDayOfWeek + 1).forEach((i) => {
      const day = dayjs(new Date(year, month, i - prevMonthDaysCount));

      // pick appropriate classes
      const classes: string[] = [];
      const title = titles instanceof Function ? titles(day) : undefined;
      if (i <= prevMonthDaysCount) {
        classes.push("prev-month");
      } else if (i > numberOfDays + prevMonthDaysCount) {
        classes.push("next-month");
      } else {
        if (selectRange) {
          // selectingRange is used while user is selecting a range
          // (has clicked on start day, and is hovering end day - but not yet clicked)
          let start = (selectingRange! || selectedRange)[0];
          let end = (selectingRange! || selectedRange)[1];

          // validate range
          if (end.isBefore(start)) {
            [end, start] = selectingRange! || selectedRange;
          }

          if (day.isBetween(start, end, "day", "[]")) {
            classes.push("range");
          }

          if (day.isSame(start, "day")) {
            classes.push("range-left");
          }

          if (day.isSame(end, "day")) {
            classes.push("range-right");
          }
        } else if (day.isSame(selectedDay, "day")) {
          classes.push("selected");
        }

        // call here customClasses function to avoid giving improper classes to prev/next month
        if (customClasses instanceof Function) {
          classes.push(customClasses(day));
        }

        if ((i - 1) % 7 === 0) {
          // first day of the week
          classes.push("bolder");
        }

        if (customClasses) {
          Object.keys(customClasses).forEach((k) => {
            const obj = customClasses[k];
            // Order here is important! Everything is instance of Object in js
            if (typeof obj === "string") {
              if (obj.indexOf(day.format("ddd")) > -1) {
                classes.push(k);
              }
            } else if (obj instanceof Array) {
              obj.forEach((d) => {
                if (day.format("YYYY-MM-DD") === d) classes.push(k);
              });
            } else if (obj instanceof Function) {
              if (obj(day)) {
                classes.push(k);
              }
            } else if (obj.start && obj.end) {
              const startDate = dayjs(obj.start, "YYYY-MM-DD").add(-1, "days");
              const endDate = dayjs(obj.end, "YYYY-MM-DD").add(1, "days");
              if (day.isBetween(startDate, endDate)) {
                classes.push(k);
              }
            }
          });
        }
      }

      if (showWeekSeparators) {
        if ((i - 1) % 7 === firstDayOfWeek && days.length) {
          // push week separator
          days.push(<td className="week-separator" key={`seperator-${i}`} />);
        }
      }
      days.push(
        <Day
          key={`day-${i}`}
          day={day.isValid() ? day : undefined}
          classes={classes.join(" ")}
          dayClicked={(d) => dayClicked(d, classes.join(" "))}
          dayHovered={(d) => dayHovered(d)}
          title={title}
        />
      );
    });
    return days;
  };

  const onPrevMonth = () => {
    props.onPrevMonth();
  };

  const onNextMonth = () => {
    props.onNextMonth();
  };

  return (
    <tr>
      {props.showCurrentMonthOnly ? (
        <td className="month-name">
          <div className="calendar-month-controls">
            <div className="month-control" onClick={() => onPrevMonth()}>
              &laquo;
            </div>
            <div className="current-month">
              {dayjs(new Date(props.year, props.month, 1)).format("MMM")}
            </div>
            <div className="month-control" onClick={() => onNextMonth()}>
              &raquo;
            </div>
          </div>
        </td>
      ) : (
        <td className="month-name">
          {dayjs(new Date(props.year, props.month, 1)).format("MMM")}
        </td>
      )}
      {renderMonthDays()}
    </tr>
  );
};

Month.defaultProps = defaultProps;

export default Month;
