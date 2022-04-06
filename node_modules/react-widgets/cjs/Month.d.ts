/// <reference types="react" />
import { CalendarViewProps } from './CalendarView';
import { Localizer } from './Localization';
import { RenderProp } from './types';
export declare type RenderDayProp = RenderProp<{
    date: Date;
    label: string;
}>;
interface MonthProps extends CalendarViewProps {
    disabled?: boolean;
    onChange: (nextDate: Date) => void;
    value?: Date | null;
    min: Date;
    max: Date;
    localizer: Localizer;
    renderDay?: RenderDayProp;
}
declare function MonthView({ className, focusedItem, disabled, onChange, value, min, max, localizer, renderDay, ...props }: MonthProps): JSX.Element;
export default MonthView;
//# sourceMappingURL=Month.d.ts.map