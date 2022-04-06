"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _MultiselectTag = _interopRequireDefault(require("./MultiselectTag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MultiselectTagList({
  id,
  value,
  textAccessor,
  label,
  disabled,
  readOnly,
  onDelete,
  children,
  clearTagIcon,
  renderTagValue,
  tagOptionComponent: TagOption = _MultiselectTag.default
}) {
  return /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    role: "listbox",
    "aria-label": label,
    "aria-multiselectable": "true",
    "aria-orientation": "horizontal",
    className: "rw-multiselect-taglist"
  }, value.map((item, i) => {
    const itemDisabled = Array.isArray(disabled) ? disabled.includes(item) : !!disabled;
    return /*#__PURE__*/_react.default.createElement(TagOption, {
      key: i,
      dataItem: item,
      onRemove: onDelete,
      clearTagIcon: clearTagIcon,
      disabled: itemDisabled,
      readOnly: readOnly
    }, renderTagValue ? renderTagValue({
      item
    }) : textAccessor(item));
  }), children);
}

var _default = MultiselectTagList;
exports.default = _default;