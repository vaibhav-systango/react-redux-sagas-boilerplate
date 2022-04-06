import React from 'react';
import { Localizer } from './Localization';
import { WidgetProps } from './Widget';
import { WidgetHTMLProps } from './shared';
export interface NumberPickerProps extends WidgetHTMLProps, Omit<WidgetProps, 'onChange'> {
    /**
     * @example ['valuePicker', [ [1, null] ]]
     */
    value?: number | undefined;
    /**
     * @example ['onChangePicker', [ [1, null] ]]
     */
    onChange?: (nextValue: number | null, ctx: {
        rawValue: number;
        originalEvent: React.SyntheticEvent<HTMLDivElement | HTMLButtonElement> | null;
        lastValue: number | undefined;
    }) => void;
    /**
     * The minimum number that the NumberPicker value.
     * @example ['prop', ['min', 0]]
     */
    min?: number;
    /**
     * The maximum number that the NumberPicker value.
     *
     * @example ['prop', ['max', 0]]
     */
    max?: number;
    /**
     * Amount to increase or decrease value when using the spinner buttons.
     *
     * @example ['prop', ['step', 5]]
     */
    step?: number;
    /**
     * Specify the decimal precision of the value when incrementing or decrementing by the
     * `step` value. This may be necessary to work around rounding issues due to
     * floating point math. By default the precision value used will be inferred
     * from the `step` and `value`, rounding the result to that.
     */
    precision?: number | 'auto';
    /**
     * A format string used to display the number value. Localizer dependent, read [localization](./localization) for more info.
     *
     * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
     */
    format?: string;
    /**
     * Determines how the NumberPicker parses a number from the localized string representation.
     *
     * ```jsx live
     * import NumberPicker from 'react-widgets/NumberPicker';
     *
     * <NumberPicker
     *   parse={(strValue, localizer) => {
     *     return localizer.parseNumber(strValue.replace('_', ''))
     *   }}
     * />
     * ```
     *
     * @example false
     */
    parse?: (str: string, localizer: Localizer) => number;
    incrementIcon?: React.ReactNode;
    decrementIcon?: React.ReactNode;
    /** @ignore */
    tabIndex?: number;
    name?: string;
    placeholder?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    autoFocus?: boolean;
    /**
     * @example ['disabled', ['1']]
     */
    disabled?: boolean;
    /**
     * @example ['readOnly', ['1.5']]
     */
    readOnly?: boolean;
    /** Adds a css class to the input container element. */
    containerClassName?: string;
    inputProps?: React.HtmlHTMLAttributes<HTMLInputElement>;
    messages?: {
        increment?: string;
        decrement?: string;
    };
    /** @ignore */
    localizer?: Localizer;
}
/**
 * ---
 * localized: true
 * shortcuts:
 *   - { key: down arrow, label: decrement value }
 *   - { key: up arrow, label: increment value }
 *   - { key: home, label: set value to minimum value, if finite }
 *   - { key: end, label: set value to maximum value, if finite }
 * ---
 *
 * @public
 */
declare function NumberPicker(uncontrolledProps: NumberPickerProps): JSX.Element;
export default NumberPicker;
//# sourceMappingURL=NumberPicker.d.ts.map