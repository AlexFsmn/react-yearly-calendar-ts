/// <reference types="react" />
import { Moment } from "moment";
interface Props {
    year: number;
    month: number;
    forceFullWeeks: boolean;
    showWeekSeparators: boolean;
    selectedDay: Moment;
    firstDayOfWeek: number;
    selectingRange?: Moment[];
    selectRange: boolean;
    selectedRange?: Moment[];
    customClasses?: any | (() => void);
    titles?: (m: Moment) => string;
    dayClicked: (day: Moment, classes: any) => void;
    dayHovered: (day: Moment) => void;
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
