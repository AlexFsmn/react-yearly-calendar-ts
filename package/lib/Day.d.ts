/// <reference types="react" />
import { Dayjs } from "dayjs";
interface Props {
    classes: string;
    dayClicked: (m: Dayjs) => void;
    dayHovered: (m: Dayjs) => void;
    day: Dayjs;
    title: string;
}
declare const Day: {
    (props: Props): JSX.Element;
    defaultProps: {
        classes: string;
        day: null;
        title: undefined;
    };
};
export default Day;
