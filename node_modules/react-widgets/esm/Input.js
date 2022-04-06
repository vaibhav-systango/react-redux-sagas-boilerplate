const _excluded = ["className", "disabled", "readOnly", "value", "tabIndex", "type", "component"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
const Input = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    className,
    disabled,
    readOnly,
    value,
    tabIndex,
    type = 'text',
    component: Component = 'input'
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
    ref: ref,
    type: type,
    tabIndex: tabIndex || 0,
    autoComplete: "off",
    disabled: disabled,
    readOnly: readOnly,
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    value: value == null ? '' : value,
    className: cn(className, 'rw-input')
  }));
});
Input.displayName = 'Input';
Input.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  tabIndex: PropTypes.number,
  component: PropTypes.any
};
export default Input;