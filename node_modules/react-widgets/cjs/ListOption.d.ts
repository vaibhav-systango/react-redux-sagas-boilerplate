import PropTypes from 'prop-types';
import React from 'react';
export interface ListOptionProps<TDataItem> extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
    dataItem: TDataItem;
    focused?: boolean;
    selected: boolean;
    searchTerm?: string;
    disabled?: boolean;
    onSelect: (dataItem: TDataItem, event: React.MouseEvent) => void;
    component?: React.ElementType | null;
    children?: React.ReactNode;
}
declare function ListOption<TDataItem>({ className, children, dataItem, selected, disabled, onSelect, searchTerm: _, ...props }: ListOptionProps<TDataItem>): JSX.Element;
declare namespace ListOption {
    var propTypes: {
        activeId: PropTypes.Requireable<string>;
        dataItem: PropTypes.Requireable<any>;
        selected: PropTypes.Validator<boolean>;
        onSelect: PropTypes.Validator<(...args: any[]) => any>;
        component: PropTypes.Requireable<any>;
    };
}
export default ListOption;
//# sourceMappingURL=ListOption.d.ts.map