import React, { ReactNode } from 'react';
export declare type DateUnit = 'second' | 'minutes' | 'hours' | 'day' | 'week' | 'month' | 'year' | 'decade' | 'century';
export interface CalendarViewProps {
    id: string;
    className?: string;
    children?: ReactNode;
    focusedItem: Date;
    onKeyDown: React.KeyboardEventHandler<HTMLTableElement>;
    'aria-labelledby': string;
}
declare function CalendarView({ className, focusedItem, onKeyDown, children, 'aria-labelledby': labelledby, }: CalendarViewProps): JSX.Element;
declare namespace CalendarView {
    var Body: (props: React.AllHTMLAttributes<HTMLTableSectionElement>) => JSX.Element;
    var Row: (props: React.AllHTMLAttributes<HTMLTableRowElement>) => JSX.Element;
    var Cell: typeof CalendarViewCell;
}
interface CellProps {
    onChange(date: Date): void;
    now?: Date;
    min: Date;
    max: Date;
    date: Date;
    unit: DateUnit;
    disabled?: boolean;
    selected?: Date | null;
    focusedItem?: Date;
    viewUnit: 'month' | 'year' | 'decade' | 'century';
    children?: ReactNode;
    label: string;
}
declare function CalendarViewCell({ onChange, min, max, date, unit, disabled, selected, focusedItem, viewUnit, children, label, }: CellProps): JSX.Element;
export default CalendarView;
//# sourceMappingURL=CalendarView.d.ts.map