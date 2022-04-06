import React from 'react';
import MultiselectTag from './MultiselectTag';

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
  tagOptionComponent: TagOption = MultiselectTag
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    role: "listbox",
    "aria-label": label,
    "aria-multiselectable": "true",
    "aria-orientation": "horizontal",
    className: "rw-multiselect-taglist"
  }, value.map((item, i) => {
    const itemDisabled = Array.isArray(disabled) ? disabled.includes(item) : !!disabled;
    return /*#__PURE__*/React.createElement(TagOption, {
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

export default MultiselectTagList;