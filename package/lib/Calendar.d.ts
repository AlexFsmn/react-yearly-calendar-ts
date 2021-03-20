/// <reference types="react" />
import dayjs, { Dayjs } from "dayjs";
import { Locale } from "dayjs/locale/*";
interface Props {
    year: number;
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
    locale?: Locale;
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
        selectedDay: dayjs.Dayjs;
        customClasses: null;
        titles: null;
    };
}
export default Calendar;
