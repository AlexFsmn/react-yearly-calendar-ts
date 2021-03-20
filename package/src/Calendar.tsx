import React, { useState } from "react";
import moment, { Moment } from "moment";
import Month from "./Month";
import { range } from "./utils";

interface Props {
  year: number;
  forceFullWeeks: boolean;
  showDaysOfWeek: boolean;
  showWeekSeparators: boolean;
  firstDayOfWeek: number;
  useIsoWeekday: boolean;
  selectRange: boolean;
  selectedRange?: Moment[];
  onPickDate: (date: Moment, classes: string[]) => void;
  onPickRange: (dateFrom: Moment, dateTo: Moment) => void;
  selectedDay: Moment;
  customClasses: any | (() => void);
  titles: (m: Moment) => string;
}

const defaultProps = {
  forceFullWeeks: false,
  showDaysOfWeek: true,
  showWeekSeparators: true,
  firstDayOfWeek: 0,
  useIsoWeekday: false,
  selectRange: false,
  onPickDate: null,
  onPickRange: null,
  selectedDay: moment(),
  customClasses: null,
  titles: null,
};

function Calendar(props: Props) {
  const [selectingRange, setSelectingRange] = useState<Moment[]>();
  // let selectingRange: Moment[] = [];
  // const setSelectingRange = (t: any) => {}
  const dayClicked = (date: Moment, classes: string[]) => {
    if (!date) {
      // clicked on prev or next month
      return;
    }

    const { selectRange, onPickRange, onPickDate } = props;

    if (!selectRange) {
      if (onPickDate instanceof Function) {
        onPickDate(date, classes);
      }
      return;
    }

    if (!selectingRange) {
      setSelectingRange([date, date]);
    } else {
      if (onPickRange instanceof Function) {
        if (selectingRange[0] > date) {
          onPickRange(date, selectingRange[0]);
        } else {
          onPickRange(selectingRange[0], date);
        }
      }
      setSelectingRange(undefined);
    }
  };

  const dayHovered = (hoveredDay: Moment) => {
    if (!hoveredDay) {
      // clicked on prev or next month
      return;
    }

    if (selectingRange) {
      selectingRange[1] = hoveredDay;

      setSelectingRange(selectingRange);
    }
  };

  const renderDaysOfWeek = () => {
    const {
      useIsoWeekday,
      firstDayOfWeek,
      forceFullWeeks,
      showWeekSeparators,
    } = props;
    const totalDays = forceFullWeeks ? 42 : 37;

    const days: JSX.Element[] = [];
    range(firstDayOfWeek, totalDays + firstDayOfWeek).forEach((i) => {
      const momentDay = useIsoWeekday
        ? moment().isoWeekday(i)
        : moment().weekday(i);
      const day = momentDay.format("ddd").charAt(0);

      if (showWeekSeparators) {
        if (i % 7 === firstDayOfWeek && days.length) {
          // push week separator
          days.push(<th className="week-separator" key={`seperator-${i}`} />);
        }
      }
      days.push(
        <th key={`weekday-${i}`} className={i % 7 === 0 ? "bolder" : ""}>
          {day}
        </th>
      );
    });

    return (
      <tr>
        <th>&nbsp;</th>
        {days}
      </tr>
    );
  };

  const months = () => {
    return range(0, 12, 1).map((month) => (
      <Month
        month={month}
        key={`month-${month}`}
        dayClicked={(d, classes) => dayClicked(d, classes)}
        dayHovered={(d) => dayHovered(d)}
        {...props}
        selectingRange={selectingRange}
      />
    ));
  };

  return (
    <table className="calendar">
      <thead className="day-headers">
        {props.showDaysOfWeek ? renderDaysOfWeek() : null}
      </thead>
      <tbody>{months()}</tbody>
    </table>
  );
}

Calendar.defaultProps = defaultProps;

export default Calendar;
