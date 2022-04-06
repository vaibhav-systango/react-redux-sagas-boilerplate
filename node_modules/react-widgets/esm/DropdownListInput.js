import cn from 'classnames';
import React, { useImperativeHandle, useRef, useState } from 'react';
const DropdownListInput = /*#__PURE__*/React.forwardRef(function ({
  name,
  autoComplete,
  value,
  allowSearch,
  placeholder,
  textAccessor,
  dataKeyAccessor,
  searchTerm,
  onSearch,
  onAutofill,
  onAutofillChange,
  renderValue,
  disabled,
  readOnly
}, ref) {
  const [autofilling, setAutofilling] = useState(false);
  const searchRef = useRef(null);

  const handleAutofillDetect = ({
    animationName
  }) => {
    let autofilling;
    if (animationName === 'react-widgets-autofill-start') autofilling = true;else if (animationName === 'react-widgets-autofill-cancel') autofilling = false;else return;
    setAutofilling(autofilling);
    onAutofill(autofilling);
  };

  const handleAutofill = e => {
    setAutofilling(false);
    onAutofillChange(e);
  };

  let dataKey = dataKeyAccessor(value);
  let text = value == null ? '' : textAccessor(value);
  let strValue = String(dataKey != null ? dataKey : '');
  if (strValue === String({})) strValue = '';
  const inputValue = !value && placeholder ? /*#__PURE__*/React.createElement("span", {
    className: "rw-placeholder"
  }, placeholder) : renderValue ? renderValue({
    item: value,
    dataKey,
    text
  }) : text;
  useImperativeHandle(ref, () => ({
    focus() {
      if (searchRef.current) searchRef.current.focus();
    }

  })); // There is some interaction between unmounting the search and value inputs
  // that cancels autofilling in Chrome, it may be due to an input the browser
  // was considering suddenly disappeared. hiding it seems to avoid the issue

  const style = autofilling ? {
    display: 'none'
  } : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: "rw-dropdown-list-input"
  }, autoComplete !== 'off' && /*#__PURE__*/React.createElement("input", {
    name: name,
    tabIndex: -1,
    disabled: disabled,
    readOnly: readOnly,
    value: strValue == null ? '' : strValue,
    autoComplete: autoComplete,
    onChange: handleAutofill,
    onAnimationStart: handleAutofillDetect,
    "aria-hidden": !autofilling,
    className: cn('rw-detect-autofill', !autofilling && 'rw-sr')
  }), /*#__PURE__*/React.createElement(React.Fragment, null, allowSearch && /*#__PURE__*/React.createElement("input", {
    ref: searchRef,
    disabled: disabled,
    readOnly: readOnly,
    style: style,
    className: "rw-dropdownlist-search",
    autoComplete: "off",
    value: searchTerm || '',
    size: (searchTerm || '').length + 2,
    onChange: onSearch
  }), !searchTerm && /*#__PURE__*/React.createElement("span", {
    className: "rw-dropdown-list-value",
    style: style
  }, inputValue)));
});
DropdownListInput.displayName = 'DropdownListInput';
export default DropdownListInput;