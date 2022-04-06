import React from 'react';
import { RenderProp, Value, WidgetHandle } from './types';
import { TextAccessorFn, DataKeyAccessorFn } from './Accessors';
export declare type RenderValueProp<TDataItem> = RenderProp<{
    item: TDataItem;
    dataKey: Value;
    text: string;
}>;
export declare type DropdownInputHandle = WidgetHandle;
interface Props<TDataItem> {
    name?: string;
    autoComplete?: 'on' | 'off';
    value: TDataItem;
    disabled?: boolean;
    readOnly?: boolean;
    allowSearch?: boolean;
    placeholder?: string;
    textAccessor: TextAccessorFn;
    dataKeyAccessor: DataKeyAccessorFn;
    searchTerm?: string;
    onSearch?: React.ChangeEventHandler<HTMLInputElement>;
    onAutofill(autofilling: boolean): void;
    onAutofillChange(e: React.ChangeEvent<HTMLInputElement>): void;
    renderValue?: RenderValueProp<TDataItem>;
}
declare const DropdownListInput: React.ForwardRefExoticComponent<Props<unknown> & React.RefAttributes<WidgetHandle>>;
export default DropdownListInput;
//# sourceMappingURL=DropdownListInput.d.ts.map