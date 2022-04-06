const _excluded = ["className", "children", "dataItem", "selected", "disabled", "onSelect", "searchTerm"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useListOption } from './FocusListContext';
const propTypes = {
  activeId: PropTypes.string,
  dataItem: PropTypes.any,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  component: PropTypes.any
};

function ListOption(_ref) {
  let {
    className,
    children,
    dataItem,
    selected,
    disabled,
    onSelect
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const [ref, focused, id] = useListOption(dataItem);

  const handleSelect = event => {
    if (onSelect && !disabled) onSelect(dataItem, event);
  };

  let classes = {
    'rw-state-focus': focused,
    'rw-state-selected': selected,
    'rw-state-disabled': disabled
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    id: id,
    ref: ref,
    role: "option",
    "data-rw-option": "",
    "data-rw-focused": focused ? '' : undefined,
    "data-rw-focusable": !disabled ? '' : undefined,
    tabIndex: -1,
    "aria-selected": !!selected,
    className: cn('rw-list-option', className, classes),
    onClick: handleSelect
  }, props), children);
} // @ts-ignore


ListOption.propTypes = propTypes;
export default ListOption;