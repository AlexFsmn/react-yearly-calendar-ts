import React from "react";
import { Moment } from "moment";

interface Props {
  classes: string;
  dayClicked: (m: Moment) => void;
  dayHovered: (m: Moment) => void;
  day: Moment;
  title: string;
}

const defaultProps = {
  classes: "",
  day: null,
  title: undefined,
};

const Day = (props: Props) => {
  const onClick = () => {
    props.dayClicked(props.day);
  };

  const onHover = () => {
    props.dayHovered(props.day);
  };

  return (
    <td
      onClick={onClick}
      onMouseEnter={onHover}
      className={props.classes}
      title={props.title}
    >
      <span className="day-number">
        {props.day === null ? "" : props.day.date()}
      </span>
    </td>
  );
};

Day.defaultProps = defaultProps;

export default Day;
