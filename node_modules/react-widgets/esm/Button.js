const _excluded = ["className", "disabled", "label", "icon", "busy", "children", "spinner"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import * as React from 'react';
import { Spinner } from './Icon';

function Button(_ref) {
  let {
    className,
    disabled,
    label,
    icon,
    busy,
    children,
    spinner = Spinner
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement("button", _extends({
    tabIndex: -1
  }, props, {
    title: label,
    type: "button",
    disabled: disabled,
    "aria-label": label,
    "aria-disabled": disabled,
    className: cn(className, 'rw-btn')
  }), busy ? spinner : icon, children);
}

export default Button;