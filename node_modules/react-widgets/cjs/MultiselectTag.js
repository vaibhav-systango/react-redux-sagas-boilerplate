"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _FocusListContext = require("./FocusListContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MultiselectTag({
  className,
  children,
  style,
  label,
  disabled,
  readOnly,
  onRemove,
  clearTagIcon,
  dataItem
}) {
  const [ref, focused, id] = (0, _FocusListContext.useListOption)(dataItem);

  const handleRemove = event => {
    if (!disabled) onRemove(dataItem, event);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    role: "option",
    id: id,
    "data-rw-option": "",
    "data-rw-focusable": disabled ? undefined : '',
    "data-rw-focused": focused ? '' : undefined,
    className: (0, _classnames.default)(className, 'rw-multiselect-tag', disabled && 'rw-state-disabled', focused && !disabled && 'rw-state-focus'),
    style: style
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "rw-multiselect-tag-label"
  }, children), /*#__PURE__*/_react.default.createElement("button", {
    type: "button" // these should not be tabbable
    ,
    tabIndex: -1,
    onClick: handleRemove,
    onTouchEnd: handleRemove,
    disabled: disabled || readOnly,
    className: "rw-multiselect-tag-btn",
    "aria-label": label || 'Remove item'
  }, clearTagIcon));
}

var _default = MultiselectTag;
exports.default = _default;