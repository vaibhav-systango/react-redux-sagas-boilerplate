import React from 'react';
import { RenderValueProp } from './DropdownListInput';
import { BaseListboxInputProps, Filterable, PopupWidgetProps, Searchable, WidgetHTMLProps, WidgetProps } from './shared';
import { DataItem, WidgetHandle } from './types';
export declare type DropdownHandle = WidgetHandle;
export interface DropdownProps<TDataItem> extends WidgetProps, WidgetHTMLProps, PopupWidgetProps, Searchable, Filterable<TDataItem>, BaseListboxInputProps<TDataItem> {
    name?: string;
    autoFocus?: boolean;
    autoComplete?: 'on' | 'off';
    onCreate?: (searchTerm: string) => void;
    renderValue?: RenderValueProp<TDataItem>;
}
declare interface DropdownList {
    <TDataItem = DataItem>(props: DropdownProps<TDataItem> & React.RefAttributes<DropdownHandle>): React.ReactElement | null;
    displayName?: string;
    propTypes?: any;
}
/**
 * A `<select>` replacement for single value lists.
 * @public
 */
declare const DropdownListImpl: DropdownList;
export default DropdownListImpl;
//# sourceMappingURL=DropdownList.d.ts.map