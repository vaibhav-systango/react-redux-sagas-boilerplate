const _excluded = ["className", "busy", "visible", "icon", "spinner"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import * as React from 'react';
import { Spinner, caretDown } from './Icon';

const DropdownCaret = _ref => {
  let {
    className,
    busy,
    visible,
    icon = caretDown,
    spinner = Spinner
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement("span", _extends({}, props, {
    "aria-hidden": "true",
    className: cn(className, 'rw-btn rw-picker-caret')
  }), busy ? spinner : visible ? icon : null);
};

export default DropdownCaret;