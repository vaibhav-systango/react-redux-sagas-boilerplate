/// <reference types="react" />
import { CalendarViewProps } from './CalendarView';
import { Localizer } from './Localization';
interface CenturyProps extends CalendarViewProps {
    disabled?: boolean;
    onChange: (nextDate: Date) => void;
    value?: Date | null;
    min: Date;
    max: Date;
    localizer: Localizer;
}
declare function CenturyView({ focusedItem, disabled, onChange, value, localizer, min, max, ...props }: CenturyProps): JSX.Element;
export default CenturyView;
//# sourceMappingURL=Century.d.ts.map