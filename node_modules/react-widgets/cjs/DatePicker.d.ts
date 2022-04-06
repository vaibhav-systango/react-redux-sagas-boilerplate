import React from 'react';
import { CalendarProps } from './Calendar';
import { DatePickerInputProps } from './DatePickerInput';
import { DateFormats } from './Localization';
import { PopupProps } from './Popup';
import { TimeInputProps } from './TimeInput';
import { WidgetProps } from './Widget';
import { TransitionProps } from 'react-transition-group/Transition';
import { WidgetHTMLProps, InferFormat } from './shared';
export interface DatePickerProps<TLocalizer = unknown> extends Omit<WidgetHTMLProps, 'onChange' | 'defaultValue'>, Omit<WidgetProps, 'onChange' | 'onSelect' | 'defaultValue'> {
    /**
     * @example ['valuePicker', [ ['new Date()', null] ]]
     */
    value?: Date | null;
    defaultValue?: Date | null;
    /**
     * @example ['onChangePicker', [ ['new Date()', null] ]]
     */
    onChange?: (date: Date | null | undefined, rawValue: string) => void;
    /**
     * @example ['openDateTime']
     */
    open?: boolean;
    onToggle?: (isOpen: boolean) => void;
    /**
     * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
     */
    currentDate?: Date;
    /**
     * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
     */
    onCurrentDateChange?: () => void;
    onSelect?: (date: Date | null, rawValue: string) => void;
    /**
     * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
     * can be typed or pasted into the widget. If you need this behavior you can constrain values via
     * the `onChange` handler.
     *
     * @example ['prop', ['min', 'new Date()']]
     */
    min?: Date;
    /**
     * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
     * can be typed or pasted into the widget. If you need this behavior you can constrain values via
     * the `onChange` handler.
     *
     * @example ['prop', ['max', 'new Date()']]
     */
    max?: Date;
    /**
     * The amount of minutes between each entry in the time list.
     *
     * @example ['prop', { step: 90 }]
     */
    step?: number;
    /**
     * Enable the time list component of the picker.
     */
    includeTime?: boolean;
    timePrecision?: 'minutes' | 'seconds' | 'milliseconds';
    timeInputProps?: Partial<TimeInputProps>;
    /** Specify the element used to render the calendar dropdown icon. */
    selectIcon?: React.ReactNode;
    /**
     * @example ['prop', { dropUp: true }]
     */
    dropUp?: boolean;
    popupProps?: object;
    popupTransition?: React.ComponentType<TransitionProps>;
    popupComponent?: React.ComponentType<PopupProps>;
    placeholder?: string;
    name?: string;
    autoFocus?: boolean;
    /**
     * @example ['disabled', ['new Date()']]
     */
    disabled?: boolean;
    /**
     * @example ['readOnly', ['new Date()']]
     */
    readOnly?: boolean;
    /**
     * Determines how the widget parses the typed date string into a Date object. You can provide a date format
     * or a function that returns a date to handle parsing yourself. When `parse` is unspecified and
     * the default `localizer.parse` is used and passed the string as well as `valueDisplayFormat` or `valueEditFormat`.
     */
    parse?: string | ((str: string, localizer?: TLocalizer) => Date | undefined);
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    /** Adds a css class to the input container element. */
    containerClassName?: string;
    calendarProps?: Partial<CalendarProps>;
    inputProps?: Partial<DatePickerInputProps>;
    valueFormat?: InferFormat<TLocalizer>;
    valueDisplayFormat?: InferFormat<TLocalizer>;
    valueEditFormat?: InferFormat<TLocalizer>;
    formats?: DateFormats<InferFormat<TLocalizer>>;
    messages?: CalendarProps['messages'] & {
        dateButton?: string;
    };
}
export interface DatePickerHandle {
    focus(): void;
}
/**
 * ---
 * subtitle: DatePicker, TimePicker
 * localized: true
 * shortcuts:
 *   - { key: alt + down arrow, label:  open calendar or time }
 *   - { key: alt + up arrow, label: close calendar or time }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * @public
 * @extends Calendar
 */
declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps<unknown> & React.RefAttributes<DatePickerHandle>>;
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map