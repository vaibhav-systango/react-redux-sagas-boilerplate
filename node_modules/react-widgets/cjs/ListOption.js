"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _FocusListContext = require("./FocusListContext");

const _excluded = ["className", "children", "dataItem", "selected", "disabled", "onSelect", "searchTerm"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const propTypes = {
  activeId: _propTypes.default.string,
  dataItem: _propTypes.default.any,
  selected: _propTypes.default.bool.isRequired,
  onSelect: _propTypes.default.func.isRequired,
  component: _propTypes.default.any
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

  const [ref, focused, id] = (0, _FocusListContext.useListOption)(dataItem);

  const handleSelect = event => {
    if (onSelect && !disabled) onSelect(dataItem, event);
  };

  let classes = {
    'rw-state-focus': focused,
    'rw-state-selected': selected,
    'rw-state-disabled': disabled
  };
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    id: id,
    ref: ref,
    role: "option",
    "data-rw-option": "",
    "data-rw-focused": focused ? '' : undefined,
    "data-rw-focusable": !disabled ? '' : undefined,
    tabIndex: -1,
    "aria-selected": !!selected,
    className: (0, _classnames.default)('rw-list-option', className, classes),
    onClick: handleSelect
  }, props), children);
} // @ts-ignore


ListOption.propTypes = propTypes;
var _default = ListOption;
exports.default = _default;