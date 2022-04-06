import PropTypes from 'prop-types';
import React from 'react';
interface Props extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
    component?: React.ElementType;
}
declare function ListOptionGroup({ children, className, component }: Props): JSX.Element;
declare namespace ListOptionGroup {
    var propTypes: {
        className: PropTypes.Requireable<string>;
        component: PropTypes.Requireable<string>;
    };
}
export default ListOptionGroup;
//# sourceMappingURL=ListOptionGroup.d.ts.map