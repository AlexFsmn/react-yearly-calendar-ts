import React from "react";
var defaultProps = {
    classes: "",
    day: null,
    title: undefined,
};
var Day = function (props) {
    var onClick = function () {
        props.dayClicked(props.day);
    };
    var onHover = function () {
        props.dayHovered(props.day);
    };
    return (React.createElement("td", { onClick: onClick, onMouseEnter: onHover, className: props.classes, title: props.title },
        React.createElement("span", { className: "day-number" }, props.day === null ? "" : props.day.date())));
};
Day.defaultProps = defaultProps;
export default Day;
