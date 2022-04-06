import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
const propTypes = {
  className: PropTypes.string,
  component: PropTypes.string
};

function ListOptionGroup({
  children,
  className,
  component = 'div'
}) {
  let Tag = component;
  return /*#__PURE__*/React.createElement(Tag, {
    tabIndex: "-1",
    role: "separator",
    className: cn(className, 'rw-list-optgroup')
  }, children);
}

ListOptionGroup.propTypes = propTypes;
export default ListOptionGroup;