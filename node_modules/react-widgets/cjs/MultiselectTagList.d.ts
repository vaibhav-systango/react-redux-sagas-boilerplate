import React, { ReactNode } from 'react';
import { MultiselectTagProps } from './MultiselectTag';
import { RenderProp } from './types';
import { TextAccessorFn } from './Accessors';
export declare type RenderTagProp<TDataItem> = RenderProp<{
    item: TDataItem;
}>;
export declare type TagComponentProp = React.ComponentType<MultiselectTagProps>;
export interface MultiselectTagListProps<TDataItem> {
    id: string;
    label?: string;
    value: readonly TDataItem[];
    focusedItem?: TDataItem;
    clearTagIcon: React.ReactNode;
    textAccessor: TextAccessorFn;
    onDelete: (dataItem: TDataItem, event: React.MouseEvent<HTMLButtonElement>) => void;
    renderTagValue?: RenderTagProp<TDataItem>;
    tagOptionComponent?: TagComponentProp;
    disabled?: readonly TDataItem[] | boolean;
    readOnly?: boolean;
    children?: ReactNode;
}
declare function MultiselectTagList<TDataItem>({ id, value, textAccessor, label, disabled, readOnly, onDelete, children, clearTagIcon, renderTagValue, tagOptionComponent: TagOption, }: MultiselectTagListProps<TDataItem>): JSX.Element;
export default MultiselectTagList;
//# sourceMappingURL=MultiselectTagList.d.ts.map