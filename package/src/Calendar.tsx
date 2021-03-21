import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Month from "./Month";
import { range } from "./utils";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import { Locale } from "dayjs/locale/*";
dayjs.extend(isoWeek);
dayjs.extend(weekday);

interface Props {
  year: number;
  month: number;
  forceFullWeeks: boolean;
  showDaysOfWeek: boolean;
  showWeekSeparators: boolean;
  firstDayOfWeek: number;
  useIsoWeekday: boolean;
  selectRange: boolean;
  selectedRange?: Dayjs[];
  onPickDate: (date: Dayjs, classes: string[]) => void;
  onPickRange: (dateFrom: Dayjs, dateTo: Dayjs) => void;
  selectedDay: Dayjs;
  customClasses: any | (() => void);
  titles: (m: Dayjs) => string;
  showCurrentMonthOnlyOnMobile?: boolean;
  locale?: Locale;
  onPrevMonth: () => void;
  onNextMonth: () => void;
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
  selectedDay: dayjs(),
  customClasses: null,
  titles: null,
};

function Calendar(props: Props) {
  const [selectingRange, setSelectingRange] = useState<Dayjs[]>();

  if (props.locale) {
    dayjs.locale(props.locale);
  }

  const dayClicked = (date: Dayjs, classes: string[]) => {
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

  const dayHovered = (hoveredDay: Dayjs) => {
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
      const dayjsDay = useIsoWeekday
        ? dayjs().isoWeekday(i)
        : dayjs().weekday(i);
      const day = dayjsDay.format("ddd").charAt(0);

      if (showWeekSeparators) {
        if (i % 7 === firstDayOfWeek && days.length) {
          // push week separator
          days.push(<th className="week-separator" key={`seperator-${i}`} />);
        }
      }
      days.push(
        <th key={`weekday-${i}`} className={i % 7 === 0 ? "bolder" : ""}>
          {day.toUpperCase()}
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

  const getMonthRange = (showCurrentMonthOnly: boolean) => {
    return showCurrentMonthOnly === true
      ? range(props.month, props.month + 1)
      : range(0, 12);
  };

  const onPrevMonth = () => {
    if (props.month > 0) {
      props.onPrevMonth();
    }
  };

  const onNextMonth = () => {
    if (props.month < 11) {
      props.onNextMonth();
    }
  };

  const months = (showCurrentMonthOnlyOnMobile: boolean) => {
    return (
      <>
        {getMonthRange(showCurrentMonthOnlyOnMobile).map((m) => (
          <Month
            {...props}
            month={m}
            key={`month-${m}`}
            dayClicked={(d, classes) => dayClicked(d, classes)}
            dayHovered={(d) => dayHovered(d)}
            selectingRange={selectingRange}
            showCurrentMonthOnly={showCurrentMonthOnlyOnMobile}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
          />
        ))}
      </>
    );
  };

  return (
    <table className="calendar">
      <thead className="day-headers">
        {props.showDaysOfWeek ? renderDaysOfWeek() : null}
      </thead>
      <tbody className="desktop-only-month">{months(false)}</tbody>
      <tbody className="mobile-only-month">
        {months(props.showCurrentMonthOnlyOnMobile === true)}
      </tbody>
    </table>
  );
}

Calendar.defaultProps = defaultProps;

export default Calendar;
