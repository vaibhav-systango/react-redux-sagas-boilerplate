import React from 'react';
import { MultiselectTagListProps, RenderTagProp, TagComponentProp } from './MultiselectTagList';
import { BaseListboxInputProps, Filterable, PopupWidgetProps, Searchable, WidgetHTMLProps, WidgetProps } from './shared';
import { DataItem, Value, WidgetHandle } from './types';
export declare type MultiselectHandle = WidgetHandle;
export declare type ChangeHandler<TDataItem> = (dataItem: TDataItem[], metadata: {
    action: 'insert' | 'remove';
    dataItem: TDataItem;
    searchTerm?: string;
    lastValue: Value;
    originalEvent?: React.SyntheticEvent;
}) => void;
export interface MultiselectProps<TDataItem = DataItem> extends WidgetHTMLProps, WidgetProps, PopupWidgetProps, Filterable<TDataItem>, Searchable, Omit<BaseListboxInputProps<TDataItem, unknown[]>, 'onChange'> {
    onChange?: ChangeHandler<TDataItem>;
    onCreate?: (searchTerm: string) => void;
    showPlaceholderWithValues?: boolean;
    renderTagValue?: RenderTagProp<TDataItem>;
    clearTagIcon?: React.ReactNode;
    tagOptionComponent?: TagComponentProp;
    tagListComponent?: React.ComponentType<MultiselectTagListProps<DataItem>>;
    showSelectedItemsInList?: boolean;
}
declare interface Multiselect {
    <TDataItem = DataItem>(props: MultiselectProps<TDataItem> & React.RefAttributes<MultiselectHandle>): React.ReactElement | null;
    displayName?: string;
    propTypes?: any;
}
/**
 * ---
 * shortcuts:
 *   - { key: left arrow, label: move focus to previous tag }
 *   - { key: right arrow, label: move focus to next tag }
 *   - { key: delete, deselect focused tag }
 *   - { key: backspace, deselect next tag }
 *   - { key: alt + up arrow, label: close Multiselect }
 *   - { key: down arrow, label: open Multiselect, and move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new tag from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A select listbox alternative.
 *
 * @public
 */
declare const Multiselect: Multiselect;
export default Multiselect;
//# sourceMappingURL=Multiselect.d.ts.map