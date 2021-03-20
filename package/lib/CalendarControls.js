import React from "react";
var defaultProps = {
    onPrevYear: undefined,
    onNextYear: undefined,
    goToToday: undefined,
    showTodayButton: false,
};
var CalendarControls = function (props) {
    var year = props.year, showTodayButton = props.showTodayButton, goToToday = props.goToToday, onPrevYear = props.onPrevYear, onNextYear = props.onNextYear;
    var todayButton;
    if (showTodayButton) {
        todayButton = (React.createElement("div", { className: "control today", onClick: function () { return goToToday(); } }, "Today"));
    }
    return (React.createElement("div", { className: "calendar-controls" },
        React.createElement("div", { className: "control", onClick: function () { return onPrevYear(); } }, "\u00AB"),
        React.createElement("div", { className: "current-year" }, year),
        React.createElement("div", { className: "control", onClick: function () { return onNextYear(); } }, "\u00BB"),
        todayButton));
};
CalendarControls.defaultProps = defaultProps;
export default CalendarControls;
