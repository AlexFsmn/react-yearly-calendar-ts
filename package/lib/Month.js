import React from "react"; // , { useEffect, useState }
import dayjs from "dayjs";
import Day from "./Day";
import { range } from "./utils";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
var defaultProps = {
    selectingRange: undefined,
    selectedRange: undefined,
    customClasses: undefined,
    titles: undefined,
};
var Month = function (props) {
    var renderMonthDays = function () {
        var year = props.year, month = props.month, forceFullWeeks = props.forceFullWeeks, showWeekSeparators = props.showWeekSeparators, selectedDay = props.selectedDay, firstDayOfWeek = props.firstDayOfWeek, selectingRange = props.selectingRange, selectRange = props.selectRange, selectedRange = props.selectedRange, customClasses = props.customClasses, titles = props.titles;
        var monthStart = dayjs(new Date(year, month, 1)); // current day
        var dayClicked = function (day, classes) {
            props.dayClicked(day, classes);
        };
        var dayHovered = function (day) {
            if (props.selectRange) {
                props.dayHovered(day);
            }
        };
        // number of days to insert before the first of the month to correctly align the weekdays
        var prevMonthDaysCount = monthStart.weekday();
        while (prevMonthDaysCount < firstDayOfWeek) {
            prevMonthDaysCount += 7;
        }
        // days in month
        var numberOfDays = monthStart.daysInMonth();
        // insert days at the end to match up 37 (max number of days in a month + 6)
        // or 42 (if user prefers seeing the week closing with Sunday)
        var totalDays = forceFullWeeks ? 42 : 37;
        // day-generating loop
        var days = [];
        range(firstDayOfWeek + 1, totalDays + firstDayOfWeek + 1).forEach(function (i) {
            var _a;
            var day = dayjs(new Date(year, month, i - prevMonthDaysCount));
            // pick appropriate classes
            var classes = [];
            var title = titles instanceof Function ? titles(day) : undefined;
            if (i <= prevMonthDaysCount) {
                classes.push("prev-month");
            }
            else if (i > numberOfDays + prevMonthDaysCount) {
                classes.push("next-month");
            }
            else {
                if (selectRange) {
                    // selectingRange is used while user is selecting a range
                    // (has clicked on start day, and is hovering end day - but not yet clicked)
                    var start = (selectingRange || selectedRange)[0];
                    var end = (selectingRange || selectedRange)[1];
                    // validate range
                    if (end.isBefore(start)) {
                        _a = selectingRange || selectedRange, end = _a[0], start = _a[1];
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
                }
                else if (day.isSame(selectedDay, "day")) {
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
                    Object.keys(customClasses).forEach(function (k) {
                        var obj = customClasses[k];
                        // Order here is important! Everything is instance of Object in js
                        if (typeof obj === "string") {
                            if (obj.indexOf(day.format("ddd")) > -1) {
                                classes.push(k);
                            }
                        }
                        else if (obj instanceof Array) {
                            obj.forEach(function (d) {
                                if (day.format("YYYY-MM-DD") === d)
                                    classes.push(k);
                            });
                        }
                        else if (obj instanceof Function) {
                            if (obj(day)) {
                                classes.push(k);
                            }
                        }
                        else if (obj.start && obj.end) {
                            var startDate = dayjs(obj.start, "YYYY-MM-DD").add(-1, "days");
                            var endDate = dayjs(obj.end, "YYYY-MM-DD").add(1, "days");
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
                    days.push(React.createElement("td", { className: "week-separator", key: "seperator-" + i }));
                }
            }
            days.push(React.createElement(Day, { key: "day-" + i, day: day.isValid() ? day : undefined, classes: classes.join(" "), dayClicked: function (d) { return dayClicked(d, classes.join(" ")); }, dayHovered: function (d) { return dayHovered(d); }, title: title }));
        });
        return days;
    };
    var onPrevMonth = function () {
        props.onPrevMonth();
    };
    var onNextMonth = function () {
        props.onNextMonth();
    };
    return (React.createElement("tr", null,
        props.showCurrentMonthOnly ? (React.createElement("td", { className: "month-name" },
            React.createElement("div", { className: "calendar-month-controls" },
                React.createElement("div", { className: "month-control", onClick: function () { return onPrevMonth(); } }, "\u00AB"),
                React.createElement("div", { className: "current-month" }, dayjs(new Date(props.year, props.month, 1)).format("MMM")),
                React.createElement("div", { className: "month-control", onClick: function () { return onNextMonth(); } }, "\u00BB")))) : (React.createElement("td", { className: "month-name" }, dayjs(new Date(props.year, props.month, 1)).format("MMM"))),
        renderMonthDays()));
};
Month.defaultProps = defaultProps;
export default Month;
