var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import dayjs from "dayjs";
import Month from "./Month";
import { range } from "./utils";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(isoWeek);
dayjs.extend(weekday);
var defaultProps = {
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
function Calendar(props) {
    var _a = useState(), selectingRange = _a[0], setSelectingRange = _a[1];
    if (props.locale) {
        dayjs.locale(props.locale);
    }
    var dayClicked = function (date, classes) {
        if (!date) {
            // clicked on prev or next month
            return;
        }
        var selectRange = props.selectRange, onPickRange = props.onPickRange, onPickDate = props.onPickDate;
        if (!selectRange) {
            if (onPickDate instanceof Function) {
                onPickDate(date, classes);
            }
            return;
        }
        if (!selectingRange) {
            setSelectingRange([date, date]);
        }
        else {
            if (onPickRange instanceof Function) {
                if (selectingRange[0] > date) {
                    onPickRange(date, selectingRange[0]);
                }
                else {
                    onPickRange(selectingRange[0], date);
                }
            }
            setSelectingRange(undefined);
        }
    };
    var dayHovered = function (hoveredDay) {
        if (!hoveredDay) {
            // clicked on prev or next month
            return;
        }
        if (selectingRange) {
            selectingRange[1] = hoveredDay;
            setSelectingRange(selectingRange);
        }
    };
    var renderDaysOfWeek = function () {
        var useIsoWeekday = props.useIsoWeekday, firstDayOfWeek = props.firstDayOfWeek, forceFullWeeks = props.forceFullWeeks, showWeekSeparators = props.showWeekSeparators;
        var totalDays = forceFullWeeks ? 42 : 37;
        var days = [];
        range(firstDayOfWeek, totalDays + firstDayOfWeek).forEach(function (i) {
            var dayjsDay = useIsoWeekday
                ? dayjs().isoWeekday(i)
                : dayjs().weekday(i);
            var day = dayjsDay.format("ddd").charAt(0);
            if (showWeekSeparators) {
                if (i % 7 === firstDayOfWeek && days.length) {
                    // push week separator
                    days.push(React.createElement("th", { className: "week-separator", key: "seperator-" + i }));
                }
            }
            days.push(React.createElement("th", { key: "weekday-" + i, className: i % 7 === 0 ? "bolder" : "" }, day.toUpperCase()));
        });
        return (React.createElement("tr", null,
            React.createElement("th", null, "\u00A0"),
            days));
    };
    var getMonthRange = function (showCurrentMonthOnly) {
        return showCurrentMonthOnly === true
            ? range(props.month, props.month + 1)
            : range(0, 12);
    };
    var onPrevMonth = function () {
        if (props.month > 0) {
            props.onPrevMonth();
        }
    };
    var onNextMonth = function () {
        if (props.month < 11) {
            props.onNextMonth();
        }
    };
    var months = function (showCurrentMonthOnlyOnMobile) {
        return (React.createElement(React.Fragment, null, getMonthRange(showCurrentMonthOnlyOnMobile).map(function (m) { return (React.createElement(Month, __assign({}, props, { month: m, key: "month-" + m, dayClicked: function (d, classes) { return dayClicked(d, classes); }, dayHovered: function (d) { return dayHovered(d); }, selectingRange: selectingRange, showCurrentMonthOnly: showCurrentMonthOnlyOnMobile, onPrevMonth: onPrevMonth, onNextMonth: onNextMonth }))); })));
    };
    return (React.createElement("table", { className: "calendar" },
        React.createElement("thead", { className: "day-headers" }, props.showDaysOfWeek ? renderDaysOfWeek() : null),
        React.createElement("tbody", { className: "desktop-only-month" }, months(false)),
        React.createElement("tbody", { className: "mobile-only-month" }, months(props.showCurrentMonthOnlyOnMobile === true))));
}
Calendar.defaultProps = defaultProps;
export default Calendar;
