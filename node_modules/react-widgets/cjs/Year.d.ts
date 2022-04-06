/// <reference types="react" />
import { CalendarViewProps } from './CalendarView';
import { Localizer } from './Localization';
interface YearProps extends CalendarViewProps {
    disabled?: boolean;
    onChange: (nextDate: Date) => void;
    value?: Date | null;
    min: Date;
    max: Date;
    localizer: Localizer;
}
declare function YearView({ focusedItem, disabled, onChange, value, min, localizer, max, ...props }: YearProps): JSX.Element;
export default YearView;
//# sourceMappingURL=Year.d.ts.map