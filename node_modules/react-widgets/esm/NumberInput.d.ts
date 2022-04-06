import PropTypes from 'prop-types';
import React, { FocusEvent, SyntheticEvent } from 'react';
import { Localizer } from './Localization';
export interface NumberPickerInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value: number | null | undefined;
    editing?: boolean;
    placeholder?: string;
    innerRef?: React.Ref<HTMLInputElement>;
    localizer: Localizer;
    parse?: (str: string, localizer: Localizer) => number;
    min?: number;
    max?: number;
    disabled?: boolean;
    readOnly?: boolean;
    onChange: (number: number | null | undefined, event: SyntheticEvent<HTMLInputElement>) => void;
}
interface NumberPickerInputState {
    stringValue?: string;
    lastValueFromProps?: string;
}
interface NumberPickerInputSnapshot {
    reselectText?: boolean;
}
declare class NumberPickerInput extends React.Component<NumberPickerInputProps, NumberPickerInputState, NumberPickerInputSnapshot> {
    static defaultProps: {
        value: null;
        editing: boolean;
    };
    static propTypes: {
        value: PropTypes.Requireable<number>;
        editing: PropTypes.Requireable<boolean>;
        placeholder: PropTypes.Requireable<string>;
        localizer: PropTypes.Validator<object>;
        parse: PropTypes.Requireable<(...args: any[]) => any>;
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        disabled: PropTypes.Validator<boolean> & {
            acceptsArray: PropTypes.Validator<any>;
        };
        readOnly: PropTypes.Validator<boolean> & {
            acceptsArray: PropTypes.Validator<any>;
        };
        onChange: PropTypes.Validator<(...args: any[]) => any>;
    };
    state: NumberPickerInputState;
    getSnapshotBeforeUpdate({ editing, }: NumberPickerInputProps): NumberPickerInputSnapshot;
    static getDerivedStateFromProps(nextProps: NumberPickerInputProps, prevState: NumberPickerInputState): {
        stringValue: string;
        lastValueFromProps: string;
    } | null;
    componentDidUpdate(_: NumberPickerInputProps, __: NumberPickerInputState, { reselectText }: NumberPickerInputSnapshot): void;
    setStringValue(stringValue: string): void;
    handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
    handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
    isIntermediateValue(num: number | undefined | null, str: string): boolean;
    isSelectingAllText(): boolean;
    parseNumber(strVal: string): number | undefined | null;
    render(): JSX.Element;
}
export default NumberPickerInput;
//# sourceMappingURL=NumberInput.d.ts.map