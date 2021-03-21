/// <reference types="react" />
import { Dayjs } from "dayjs";
interface Props {
    year: number;
    month: number;
    forceFullWeeks: boolean;
    showWeekSeparators: boolean;
    selectedDay: Dayjs;
    firstDayOfWeek: number;
    selectingRange?: Dayjs[];
    selectRange: boolean;
    selectedRange?: Dayjs[];
    customClasses?: any | (() => void);
    titles?: (m: Dayjs) => string;
    dayClicked: (day: Dayjs, classes: any) => void;
    dayHovered: (day: Dayjs) => void;
    showCurrentMonthOnly: boolean;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}
declare const Month: {
    (props: Props): JSX.Element;
    defaultProps: {
        selectingRange: undefined;
        selectedRange: undefined;
        customClasses: undefined;
        titles: undefined;
    };
};
export default Month;
