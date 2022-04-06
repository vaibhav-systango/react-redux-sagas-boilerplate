"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

const _excluded = ["className", "disabled", "readOnly", "value", "tabIndex", "type", "component"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Input = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    className,
    disabled,
    readOnly,
    value,
    tabIndex,
    type = 'text',
    component: Component = 'input'
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
    ref: ref,
    type: type,
    tabIndex: tabIndex || 0,
    autoComplete: "off",
    disabled: disabled,
    readOnly: readOnly,
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    value: value == null ? '' : value,
    className: (0, _classnames.default)(className, 'rw-input')
  }));
});

Input.displayName = 'Input';
Input.propTypes = {
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  value: _propTypes.default.string,
  type: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  component: _propTypes.default.any
};
var _default = Input;
exports.default = _default;