const _excluded = ["children"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as PropTypes from 'prop-types';
import React from 'react';
import ListOption from './ListOption';
export const CREATE_OPTION = {};
const propTypes = {
  searchTerm: PropTypes.string,
  focused: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  activeId: PropTypes.string
};

function AddToListOption(_ref) {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement(ListOption, _extends({}, props, {
    dataItem: CREATE_OPTION,
    className: 'rw-list-option-create',
    selected: false
  }), children);
}

AddToListOption.propTypes = propTypes;
export default AddToListOption;