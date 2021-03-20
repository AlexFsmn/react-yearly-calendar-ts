/// <reference types="react" />
interface Props {
    year: number;
    onPrevYear: () => void;
    onNextYear: () => void;
    goToToday: () => void;
    showTodayButton: boolean;
}
declare const CalendarControls: {
    (props: Props): JSX.Element;
    defaultProps: {
        onPrevYear: undefined;
        onNextYear: undefined;
        goToToday: undefined;
        showTodayButton: boolean;
    };
};
export default CalendarControls;
