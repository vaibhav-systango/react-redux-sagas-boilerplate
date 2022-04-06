const _excluded = ["value", "valueText", "pad", "placeholder", "min", "max", "emptyChar"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';

const padStart = (value, len, padding) => {
  let str = String(value != null ? value : '');

  while (str.length < len) str = padding + str;

  return str;
};

const DateTimePartInput = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    value,
    valueText = String(value != null ? value : ''),
    pad,
    placeholder,
    min,
    max,
    emptyChar
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement("input", _extends({}, props, {
    ref: ref,
    "data-focusable": true,
    autoComplete: "off",
    role: "spinbutton",
    "aria-valuenow": value != null ? value : void 0,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuetext": valueText // seems readonly is not valid
    ,
    "aria-disabled": props.disabled || props.readOnly,
    "arai-placeholder": placeholder,
    placeholder: placeholder,
    className: "rw-time-part-input",
    value: placeholder && !value ? '' : padStart(value, pad || 0, value == null ? emptyChar : '0')
  }));
});
export default DateTimePartInput;