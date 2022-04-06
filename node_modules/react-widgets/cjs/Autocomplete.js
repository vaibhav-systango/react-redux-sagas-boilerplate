"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Combobox = _interopRequireDefault(require("./Combobox"));

var _uncontrollable = require("uncontrollable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Autocomplete(props) {
  const [open, onToggle] = (0, _uncontrollable.useUncontrolledProp)(props.open, props.defaultOpen, props.onToggle);
  const [value, onChange] = (0, _uncontrollable.useUncontrolledProp)(props.value, props.defaultValue, props.onChange);

  const handleChange = (value, meta) => {
    onChange(value, meta);

    if (!value && open) {
      onToggle(false);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Combobox.default, _extends({}, props, {
    hideCaret: true,
    hideEmptyPopup: true,
    value: value,
    onChange: handleChange,
    open: open,
    onToggle: onToggle
  }));
}

var _default = Autocomplete;
exports.default = _default;