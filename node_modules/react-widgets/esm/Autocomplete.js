function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Combobox from './Combobox';
import { useUncontrolledProp } from 'uncontrollable';

function Autocomplete(props) {
  const [open, onToggle] = useUncontrolledProp(props.open, props.defaultOpen, props.onToggle);
  const [value, onChange] = useUncontrolledProp(props.value, props.defaultValue, props.onChange);

  const handleChange = (value, meta) => {
    onChange(value, meta);

    if (!value && open) {
      onToggle(false);
    }
  };

  return /*#__PURE__*/React.createElement(Combobox, _extends({}, props, {
    hideCaret: true,
    hideEmptyPopup: true,
    value: value,
    onChange: handleChange,
    open: open,
    onToggle: onToggle
  }));
}

export default Autocomplete;