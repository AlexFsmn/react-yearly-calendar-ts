/// <reference types="react" />
import { Moment } from "moment";
interface Props {
    classes: string;
    dayClicked: (m: Moment) => void;
    dayHovered: (m: Moment) => void;
    day: Moment;
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
