import cn from 'classnames';
import React from 'react';
import { useListOption } from './FocusListContext';

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
  const [ref, focused, id] = useListOption(dataItem);

  const handleRemove = event => {
    if (!disabled) onRemove(dataItem, event);
  };

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    role: "option",
    id: id,
    "data-rw-option": "",
    "data-rw-focusable": disabled ? undefined : '',
    "data-rw-focused": focused ? '' : undefined,
    className: cn(className, 'rw-multiselect-tag', disabled && 'rw-state-disabled', focused && !disabled && 'rw-state-focus'),
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "rw-multiselect-tag-label"
  }, children), /*#__PURE__*/React.createElement("button", {
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

export default MultiselectTag;