"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DropdownListInput = /*#__PURE__*/_react.default.forwardRef(function ({
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
  const [autofilling, setAutofilling] = (0, _react.useState)(false);
  const searchRef = (0, _react.useRef)(null);

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
  const inputValue = !value && placeholder ? /*#__PURE__*/_react.default.createElement("span", {
    className: "rw-placeholder"
  }, placeholder) : renderValue ? renderValue({
    item: value,
    dataKey,
    text
  }) : text;
  (0, _react.useImperativeHandle)(ref, () => ({
    focus() {
      if (searchRef.current) searchRef.current.focus();
    }

  })); // There is some interaction between unmounting the search and value inputs
  // that cancels autofilling in Chrome, it may be due to an input the browser
  // was considering suddenly disappeared. hiding it seems to avoid the issue

  const style = autofilling ? {
    display: 'none'
  } : undefined;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rw-dropdown-list-input"
  }, autoComplete !== 'off' && /*#__PURE__*/_react.default.createElement("input", {
    name: name,
    tabIndex: -1,
    disabled: disabled,
    readOnly: readOnly,
    value: strValue == null ? '' : strValue,
    autoComplete: autoComplete,
    onChange: handleAutofill,
    onAnimationStart: handleAutofillDetect,
    "aria-hidden": !autofilling,
    className: (0, _classnames.default)('rw-detect-autofill', !autofilling && 'rw-sr')
  }), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, allowSearch && /*#__PURE__*/_react.default.createElement("input", {
    ref: searchRef,
    disabled: disabled,
    readOnly: readOnly,
    style: style,
    className: "rw-dropdownlist-search",
    autoComplete: "off",
    value: searchTerm || '',
    size: (searchTerm || '').length + 2,
    onChange: onSearch
  }), !searchTerm && /*#__PURE__*/_react.default.createElement("span", {
    className: "rw-dropdown-list-value",
    style: style
  }, inputValue)));
});

DropdownListInput.displayName = 'DropdownListInput';
var _default = DropdownListInput;
exports.default = _default;