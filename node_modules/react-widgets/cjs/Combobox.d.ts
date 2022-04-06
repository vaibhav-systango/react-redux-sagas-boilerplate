import * as React from 'react';
import { BaseListboxInputProps, ChangeHandler, Filterable, PopupWidgetProps, SelectHandler, WidgetHTMLProps, WidgetProps } from './shared';
import { DataItem, WidgetHandle } from './types';
export declare type ComboboxHandle = WidgetHandle;
export interface ComboboxProps<TDataItem = DataItem> extends WidgetHTMLProps, WidgetProps, PopupWidgetProps, Filterable<TDataItem>, BaseListboxInputProps<TDataItem, string | TDataItem> {
    name?: string;
    /**
     * If a `data` item matches the current typed value select it automatically.
     */
    autoSelectMatches?: boolean;
    onChange?: ChangeHandler<TDataItem | string>;
    onSelect?: SelectHandler<TDataItem | string>;
    hideCaret?: boolean;
    hideEmptyPopup?: boolean;
}
declare interface Combobox {
    <TDataItem = DataItem>(props: ComboboxProps<TDataItem> & React.RefAttributes<ComboboxHandle>): React.ReactElement | null;
    displayName?: string;
    propTypes?: any;
}
/**
 * ---
 * shortcuts:
 *   - { key: alt + down arrow, label: open combobox }
 *   - { key: alt + up arrow, label: close combobox }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * Select an item from the list, or input a custom value. The Combobox can also make suggestions as you type.

 * @public
 */
declare const ComboboxImpl: Combobox;
export default ComboboxImpl;
//# sourceMappingURL=Combobox.d.ts.map