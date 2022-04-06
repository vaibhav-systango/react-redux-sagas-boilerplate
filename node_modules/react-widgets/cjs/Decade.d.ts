/// <reference types="react" />
import { CalendarViewProps } from './CalendarView';
import { Localizer } from './Localization';
interface DecadeProps extends CalendarViewProps {
    disabled?: boolean;
    onChange: (nextDate: Date) => void;
    value?: Date | null;
    min: Date;
    max: Date;
    localizer: Localizer;
}
declare function DecadeView({ focusedItem, disabled, onChange, value, localizer, min, max, ...props }: DecadeProps): JSX.Element;
export default DecadeView;
//# sourceMappingURL=Decade.d.ts.map