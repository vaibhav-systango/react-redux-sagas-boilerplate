"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _dates = require("./dates");

var _Input = _interopRequireDefault(require("./Input"));

const _excluded = ["value", "formatter", "editing", "editFormat", "displayFormat", "localizer", "parse", "onChange", "onBlur", "disabled", "readOnly"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const DatePickerInput = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    value,
    formatter,
    editing,
    editFormat,
    displayFormat,
    localizer,
    parse,
    onChange,
    onBlur,
    disabled,
    readOnly
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const needsFlush = (0, _react.useRef)(false);
  const nextTextValue = (0, _react.useMemo)(() => value instanceof Date && isValid(value) ? localizer.formatDate(value, formatter, editing ? editFormat : displayFormat) : '', [value, formatter, localizer, displayFormat, editing, editFormat]);
  const [prevValue, setPrevValue] = (0, _react.useState)(nextTextValue);
  const [textValue, setTextValue] = (0, _react.useState)(nextTextValue);

  if (prevValue !== nextTextValue) {
    setPrevValue(nextTextValue);
    setTextValue(nextTextValue);
  }

  const handleBlur = event => {
    if (onBlur) onBlur(event);

    if (needsFlush.current) {
      let date = parse(event.target.value);
      const dateIsInvalid = event.target.value != '' && (0, _dates.isNullOrInvalid)(date);

      if (dateIsInvalid) {
        setTextValue('');
      }

      needsFlush.current = false;
      setPrevValue(null);
      onChange(date, event.target.value);
    }
  };

  const handleChange = ({
    target
  }) => {
    needsFlush.current = true;
    setTextValue(target.value);
  };

  return /*#__PURE__*/_react.default.createElement(_Input.default, _extends({}, props, {
    type: "text",
    ref: ref,
    className: "rw-widget-input",
    value: textValue,
    disabled: disabled,
    readOnly: readOnly,
    onChange: handleChange,
    onBlur: handleBlur
  }));
});

DatePickerInput.displayName = 'DatePickerInput';
var _default = DatePickerInput;
exports.default = _default;

function isValid(d) {
  return !isNaN(d.getTime());
}