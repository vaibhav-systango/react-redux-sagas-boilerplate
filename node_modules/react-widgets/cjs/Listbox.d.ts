import React from 'react';
import { GroupBy } from './List';
import { DataItem, RenderProp, Value } from './types';
import { TextAccessor, DataKeyAccessor } from './Accessors';
import { WidgetHTMLProps } from './shared';
import { UserProvidedMessages } from './messages';
export interface ListboxHandle {
    scrollIntoView(): void;
}
export declare type RenderItemProp<TDataItem> = RenderProp<{
    item: TDataItem;
    searchTerm?: string;
    index: number;
    text: string;
    value: unknown;
    disabled: boolean;
}>;
export declare type RenderGroupProp = RenderProp<{
    group: any;
}>;
export declare type SingleChangeHandler<TDataItem> = (dataItem: TDataItem, metadata: {
    lastValue: Value;
    originalEvent?: React.SyntheticEvent;
}) => void;
export declare type MultipleChangeHandler<TDataItem> = (dataItem: readonly TDataItem[], metadata: {
    action: 'insert' | 'remove';
    dataItem: TDataItem;
    lastValue: Value;
    originalEvent?: React.SyntheticEvent;
}) => void;
export interface BaseListboxProps<TDataItem> extends WidgetHTMLProps {
    data: TDataItem[];
    defaultValue?: Value;
    focusedItem?: TDataItem;
    className?: string;
    multiple?: boolean;
    readOnly?: boolean;
    /**
     * @example false
     */
    disabled?: boolean | TDataItem[];
    messages?: UserProvidedMessages;
    renderItem?: RenderItemProp<TDataItem>;
    renderGroup?: RenderGroupProp;
    searchTerm?: string;
    groupBy?: GroupBy<TDataItem>;
    optionComponent?: React.ElementType;
    textField?: TextAccessor;
    dataKey?: DataKeyAccessor;
}
export interface SingleListboxProps<TDataItem> extends BaseListboxProps<TDataItem> {
    value?: Value;
    defaultValue?: Value;
    multiple?: false;
    onChange?: SingleChangeHandler<TDataItem>;
}
export interface MultipleListboxProps<TDataItem> extends BaseListboxProps<TDataItem> {
    value?: Value[];
    defaultValue?: Value[];
    multiple: true;
    onChange?: MultipleChangeHandler<TDataItem>;
}
export declare type ListboxProps<TDataItem> = SingleListboxProps<TDataItem> | MultipleListboxProps<TDataItem>;
declare interface Listbox {
    <TDataItem = DataItem>(props: ListboxProps<TDataItem> & React.RefAttributes<ListboxHandle>): React.ReactElement | null;
    displayName?: string;
    propTypes?: any;
}
declare const Listbox: Listbox;
export default Listbox;
//# sourceMappingURL=Listbox.d.ts.map