import * as PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
export declare const CREATE_OPTION: {};
export interface AddToListOptionProps {
    children: ReactNode;
    onSelect: (event: React.MouseEvent) => void;
}
declare function AddToListOption({ children, ...props }: AddToListOptionProps): JSX.Element;
declare namespace AddToListOption {
    var propTypes: {
        searchTerm: PropTypes.Requireable<string>;
        focused: PropTypes.Requireable<boolean>;
        onSelect: PropTypes.Validator<(...args: any[]) => any>;
        activeId: PropTypes.Requireable<string>;
    };
}
export default AddToListOption;
//# sourceMappingURL=AddToListOption.d.ts.map