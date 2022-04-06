import React from 'react';
import { DataItem } from './types';
export interface MultiselectTagProps {
    id?: string;
    className?: string;
    dataItem: DataItem;
    disabled?: boolean;
    readOnly?: boolean;
    label?: string;
    style?: React.CSSProperties;
    onRemove: (dataItem: DataItem, event: React.MouseEvent<HTMLButtonElement>) => void;
    clearTagIcon: React.ReactNode;
    children: React.ReactNode;
}
declare function MultiselectTag({ className, children, style, label, disabled, readOnly, onRemove, clearTagIcon, dataItem, }: MultiselectTagProps): JSX.Element;
export default MultiselectTag;
//# sourceMappingURL=MultiselectTag.d.ts.map