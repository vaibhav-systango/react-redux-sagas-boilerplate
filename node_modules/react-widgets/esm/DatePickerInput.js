const _excluded = ["value", "formatter", "editing", "editFormat", "displayFormat", "localizer", "parse", "onChange", "onBlur", "disabled", "readOnly"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useRef, useState } from 'react';
import { isNullOrInvalid } from './dates';
import Input from './Input';
const DatePickerInput = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    value,
    formatter,
    editing,
    editFormat,
    displayFormat,
    localizer,
    parse,
    onChange,
    onBlur,
    disabled,
    readOnly
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const needsFlush = useRef(false);
  const nextTextValue = useMemo(() => value instanceof Date && isValid(value) ? localizer.formatDate(value, formatter, editing ? editFormat : displayFormat) : '', [value, formatter, localizer, displayFormat, editing, editFormat]);
  const [prevValue, setPrevValue] = useState(nextTextValue);
  const [textValue, setTextValue] = useState(nextTextValue);

  if (prevValue !== nextTextValue) {
    setPrevValue(nextTextValue);
    setTextValue(nextTextValue);
  }

  const handleBlur = event => {
    if (onBlur) onBlur(event);

    if (needsFlush.current) {
      let date = parse(event.target.value);
      const dateIsInvalid = event.target.value != '' && isNullOrInvalid(date);

      if (dateIsInvalid) {
        setTextValue('');
      }

      needsFlush.current = false;
      setPrevValue(null);
      onChange(date, event.target.value);
    }
  };

  const handleChange = ({
    target
  }) => {
    needsFlush.current = true;
    setTextValue(target.value);
  };

  return /*#__PURE__*/React.createElement(Input, _extends({}, props, {
    type: "text",
    ref: ref,
    className: "rw-widget-input",
    value: textValue,
    disabled: disabled,
    readOnly: readOnly,
    onChange: handleChange,
    onBlur: handleBlur
  }));
});
DatePickerInput.displayName = 'DatePickerInput';
export default DatePickerInput;

function isValid(d) {
  return !isNaN(d.getTime());
}