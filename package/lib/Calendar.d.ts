/// <reference types="react" />
import moment, { Moment } from "moment";
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
declare function Calendar(props: Props): JSX.Element;
declare namespace Calendar {
    var defaultProps: {
        forceFullWeeks: boolean;
        showDaysOfWeek: boolean;
        showWeekSeparators: boolean;
        firstDayOfWeek: number;
        useIsoWeekday: boolean;
        selectRange: boolean;
        onPickDate: null;
        onPickRange: null;
        selectedDay: moment.Moment;
        customClasses: null;
        titles: null;
    };
}
export default Calendar;
