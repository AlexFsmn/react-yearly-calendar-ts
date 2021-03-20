import React from "react";
import { Dayjs } from "dayjs";

interface Props {
  classes: string;
  dayClicked: (m: Dayjs) => void;
  dayHovered: (m: Dayjs) => void;
  day: Dayjs;
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
