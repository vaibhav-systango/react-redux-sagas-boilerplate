const _excluded = ["disabled", "readOnly"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import PropTypes from 'prop-types';
import React from 'react';
import * as CustomPropTypes from './PropTypes';
const propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
};
const MultiselectInput = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    disabled,
    readOnly
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  let size = Math.max(String(props.value || props.placeholder || '').length, 1) + 1;
  return /*#__PURE__*/React.createElement("input", _extends({
    spellCheck: "false",
    autoCapitalize: "off"
  }, props, {
    size: size,
    ref: ref,
    autoComplete: "off",
    className: "rw-multiselect-input",
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    disabled: disabled,
    readOnly: readOnly
  }));
});
MultiselectInput.displayName = 'MultiselectInput';
MultiselectInput.propTypes = propTypes;
export default MultiselectInput;