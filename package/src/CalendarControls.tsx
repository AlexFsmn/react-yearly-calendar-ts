import React from "react";

interface Props {
  year: number;
  onPrevYear: () => void;
  onNextYear: () => void;
  goToToday: () => void;
  showTodayButton: boolean;
}

const defaultProps = {
  onPrevYear: undefined,
  onNextYear: undefined,
  goToToday: undefined,
  showTodayButton: false,
};

const CalendarControls = (props: Props) => {
  const { year, showTodayButton, goToToday, onPrevYear, onNextYear } = props;
  let todayButton;
  if (showTodayButton) {
    todayButton = (
      <div className="control today" onClick={() => goToToday()}>
        Today
      </div>
    );
  }

  return (
    <div className="calendar-controls">
      <div className="control" onClick={() => onPrevYear()}>
        &laquo;
      </div>
      <div className="current-year">{year}</div>
      <div className="control" onClick={() => onNextYear()}>
        &raquo;
      </div>
      {todayButton}
    </div>
  );
};

CalendarControls.defaultProps = defaultProps;

export default CalendarControls;
