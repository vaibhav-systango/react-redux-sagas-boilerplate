import PropTypes from 'prop-types';
import React from 'react';
import { WidgetProps } from './Widget';
export interface TimeInputProps extends Omit<WidgetProps, 'value' | 'onChange'> {
    value?: Date | null;
    onChange?: (date: Date | null, ctx?: any) => void;
    datePart?: Date;
    use12HourClock?: boolean;
    padValues?: boolean;
    emptyCharacter?: string;
    noClearButton?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    precision: 'minutes' | 'seconds' | 'milliseconds';
    hoursAddon?: React.ReactNode;
    minutesAddon?: React.ReactNode;
    secondsAddon?: React.ReactNode;
    millisecondsAddon?: React.ReactNode;
}
declare function TimeInput(uncontrolledProps: TimeInputProps): JSX.Element;
declare namespace TimeInput {
    var propTypes: {
        /**
         * @example ['valuePicker', [ ['new Date()'] ]]
         */
        value: PropTypes.Requireable<Date>;
        /**
         * @example ['onChangePicker', [ ['new Date()'] ]]
         */
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * The default date used to construct a new time when the `value` is empty
         *
         * @default new Date()
         **/
        datePart: PropTypes.Requireable<Date>;
        /**
         * Use a 12 hour clock (with AM/PM) instead of 24 hour one.
         * The configured localizer may provide a default value .
         **/
        use12HourClock: PropTypes.Requireable<boolean>;
        /** Time part values will be padded by `0` */
        padValues: PropTypes.Requireable<boolean>;
        /** The string character used to pad empty, or cleared values */
        emptyCharacter: PropTypes.Requireable<string>;
        /** Hide the input clear button */
        noClearButton: PropTypes.Requireable<boolean>;
        /**
         * @example ['disabled', ['new Date()']]
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * @example ['readOnly', ['new Date()']]
         */
        readOnly: PropTypes.Requireable<boolean>;
        /** Controls how precise of a time can be input **/
        precision: PropTypes.Validator<string>;
        /**
         * The seperator between hours and minutes
         * @default ':'
         */
        hoursAddon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * The seperator between hours and minutes
         * @default ':'
         */
        minutesAddon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * The seperator between hours and minutes
         * @default ':'
         */
        secondsAddon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * The seperator between hours and minutes
         * @default '.'
         */
        millisecondsAddon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    var defaultProps: {
        hoursAddon: string;
        padValues: boolean;
        precision: string;
        emptyCharacter: string;
    };
}
export default TimeInput;
//# sourceMappingURL=TimeInput.d.ts.map