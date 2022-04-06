import React, { MutableRefObject } from 'react';
import { ListOptionProps } from './ListOption';
import { UserProvidedMessages } from './messages';
import { DataItem, RenderProp, Value } from './types';
import { Accessors } from './Accessors';
export declare type GroupBy<TDataItem = unknown> = ((item: TDataItem) => unknown) | string;
export interface ListHandle {
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
export declare type OptionComponentProp = React.ComponentType<ListOptionProps<any>>;
export declare type ChangeHandler<TDataItem> = (dataItem: TDataItem | TDataItem[], metadata: {
    action?: 'insert' | 'remove';
    dataItem?: TDataItem;
    lastValue: Value;
    originalEvent?: React.SyntheticEvent;
}) => void;
export interface ListProps<TDataItem> {
    data: readonly TDataItem[];
    value?: readonly TDataItem[] | TDataItem;
    accessors: Accessors;
    focusedItem?: TDataItem;
    className?: string;
    multiple?: boolean;
    disabled?: boolean | readonly TDataItem[];
    messages?: UserProvidedMessages;
    renderItem?: RenderItemProp<TDataItem>;
    renderGroup?: RenderGroupProp;
    searchTerm?: string;
    groupBy?: GroupBy<TDataItem>;
    optionComponent?: React.ElementType;
    onChange: ChangeHandler<TDataItem>;
    elementRef?: MutableRefObject<HTMLDivElement | null>;
    [key: string]: any;
}
declare interface List {
    <TDataItem = DataItem>(props: ListProps<TDataItem> & React.RefAttributes<ListHandle>): React.ReactElement | null;
    displayName?: string;
    propTypes?: any;
}
export declare const useScrollFocusedIntoView: (element: HTMLElement | null, observeChanges?: boolean) => () => void;
export declare function useHandleSelect<TDataItem>(multiple: boolean, dataItems: TDataItem[], onChange: ChangeHandler<TDataItem>): (dataItem: TDataItem, event: React.SyntheticEvent) => void;
declare const List: List;
export default List;
//# sourceMappingURL=List.d.ts.map