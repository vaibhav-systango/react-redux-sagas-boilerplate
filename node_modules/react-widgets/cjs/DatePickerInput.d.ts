import React from 'react';
import { InputProps } from './Input';
import { Localizer, RequiredDateMethods } from './Localization';
export interface DatePickerInputProps<TDateFormat = unknown> extends Omit<InputProps, 'value' | 'onChange'> {
    formatter: RequiredDateMethods;
    editing: boolean;
    editFormat?: TDateFormat;
    displayFormat?: TDateFormat;
    parse: (str: string) => Date | null;
    value?: Date | null;
    onChange: (date: Date | null, rawValue: string) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    localizer: Localizer<TDateFormat>;
    disabled?: boolean;
    readOnly?: boolean;
}
declare const DatePickerInput: React.ForwardRefExoticComponent<DatePickerInputProps<unknown> & React.RefAttributes<HTMLInputElement>>;
export default DatePickerInput;
//# sourceMappingURL=DatePickerInput.d.ts.map