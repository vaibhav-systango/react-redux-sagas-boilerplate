"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = require("uncontrollable");

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = require("./Icon");

var _Localization = require("./Localization");

var _NumberInput = _interopRequireDefault(require("./NumberInput"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

var _WidgetHelpers = require("./WidgetHelpers");

var _useEventCallback = _interopRequireDefault(require("@restart/hooks/useEventCallback"));

const _excluded = ["className", "containerClassName", "disabled", "readOnly", "value", "min", "max", "incrementIcon", "decrementIcon", "placeholder", "autoFocus", "tabIndex", "parse", "name", "onChange", "messages", "format", "onKeyDown", "onKeyPress", "onKeyUp", "inputProps", "precision", "step"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// my tests in ie11/chrome/FF indicate that keyDown repeats
// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
function createInterval(callback) {
  let fn;
  let id;

  const cancel = () => clearTimeout(id);

  id = window.setTimeout(fn = () => {
    id = window.setTimeout(fn, 35);
    callback(); //fire after everything in case the user cancels on the first call
  }, 500);
  return cancel;
}

function clamp(value, min, max) {
  max = max == null ? Infinity : max;
  min = min == null ? -Infinity : min;
  if (value == null || value === '') return null;
  return Math.max(Math.min(typeof value == 'string' ? parseInt(value) : value, max), min);
}

const propTypes = {
  /**
   * @example ['valuePicker', [ [1, null] ]]
   */
  value: _propTypes.default.number,

  /**
   * @example ['onChangePicker', [ [1, null] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * The minimum number that the NumberPicker value.
   * @example ['prop', ['min', 0]]
   */
  min: _propTypes.default.number,

  /**
   * The maximum number that the NumberPicker value.
   *
   * @example ['prop', ['max', 0]]
   */
  max: _propTypes.default.number,

  /**
   * Amount to increase or decrease value when using the spinner buttons.
   *
   * @example ['prop', ['step', 5]]
   */
  step: _propTypes.default.number,

  /**
   * Specify how precise the `value` should be when typing, incrementing, or decrementing the value.
   * When empty, precision is parsed from the current `format` and culture.
   */
  precision: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.oneOf(['auto'])]),

  /**
   * A format string used to display the number value. Localizer dependent, read about [localization](localization) for more info.
   *
   * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
   */
  format: _propTypes.default.any,
  parse: _propTypes.default.func,
  incrementIcon: _propTypes.default.node,
  decrementIcon: _propTypes.default.node,

  /** @ignore */
  tabIndex: _propTypes.default.any,
  name: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,

  /**
   * @example ['disabled', ['1']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['1.5']]
   */
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  messages: _propTypes.default.shape({
    increment: _propTypes.default.string,
    decrement: _propTypes.default.string
  }),

  /** @ignore */
  localizer: _propTypes.default.object
};
const defaultProps = {
  incrementIcon: _Icon.caretUp,
  decrementIcon: _Icon.caretDown,
  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: 'auto'
};

/**
 * ---
 * localized: true
 * shortcuts:
 *   - { key: down arrow, label: decrement value }
 *   - { key: up arrow, label: increment value }
 *   - { key: home, label: set value to minimum value, if finite }
 *   - { key: end, label: set value to maximum value, if finite }
 * ---
 *
 * @public
 */
function NumberPicker(uncontrolledProps) {
  const _useUncontrolled = (0, _uncontrollable.useUncontrolled)(uncontrolledProps, {
    value: 'onChange'
  }),
        {
    className,
    containerClassName,
    disabled,
    readOnly,
    value,
    min,
    max,
    incrementIcon,
    decrementIcon,
    placeholder,
    autoFocus,
    tabIndex,
    parse,
    name,
    onChange,
    messages,
    format,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    inputProps,
    precision,
    step: pStep
  } = _useUncontrolled,
        elementProps = _objectWithoutPropertiesLoose(_useUncontrolled, _excluded);

  const localizer = (0, _Localization.useLocalizer)(messages, {
    number: format
  });
  const ref = (0, _react.useRef)(null);
  const inputRef = (0, _react.useRef)(null);
  const repeaterRef = (0, _react.useRef)(null);
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref, uncontrolledProps, {
    willHandle(focused) {
      if (focused) focus();
    }

  });
  const handleMouseDown = (0, _useEventCallback.default)((direction, event) => {
    if (event) event.persist();
    let method = direction === 'UP' ? increment : decrement;
    let value = method(event),
        atTop = direction === 'UP' && value === max,
        atBottom = direction === 'DOWN' && value === min;
    if (atTop || atBottom) handleMouseUp();else if (!repeaterRef.current) {
      repeaterRef.current = createInterval(() => {
        handleMouseDown(direction, event);
      });
    }
  });
  const handleMouseUp = (0, _useEventCallback.default)(() => {
    if (!repeaterRef.current) return;
    repeaterRef.current();
    repeaterRef.current = null;
  });
  const handleKeyDown = (0, _useEventCallback.default)(event => {
    if (readOnly) return;
    let key = event.key;
    (0, _WidgetHelpers.notify)(onKeyDown, [event]);
    if (event.defaultPrevented) return;
    if (key === 'End' && isFinite(max)) handleChange(max, event);else if (key === 'Home' && isFinite(min)) handleChange(min, event);else if (key === 'ArrowDown') {
      event.preventDefault();
      decrement(event);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      increment(event);
    }
  });

  const handleChange = (rawValue, originalEvent = null) => {
    let nextValue = clamp(rawValue, min, max);
    if (value !== nextValue) (0, _WidgetHelpers.notify)(onChange, [nextValue, {
      rawValue,
      originalEvent,
      lastValue: value
    }]);
  };

  function focus() {
    var _inputRef$current;

    (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.focus();
  }

  function increment(event) {
    return step(pStep, event);
  }

  function decrement(event) {
    return step(-pStep, event);
  }

  function step(amount, event) {
    const nextValue = (value || 0) + amount;
    let p = precision === 'auto' ? Math.max(getPrecision(value || 0), getPrecision(amount)) : precision;
    handleChange(p != null ? parseFloat(nextValue.toFixed(p)) : nextValue, event);
    return nextValue;
  }

  const clampedValue = clamp(value, min, max);
  return /*#__PURE__*/_react.default.createElement(_Widget.default, _extends({}, elementProps, {
    focused: focused,
    disabled: disabled,
    readOnly: readOnly,
    onKeyDown: handleKeyDown
  }, focusEvents, {
    ref: ref,
    className: (0, _classnames.default)(className, 'rw-number-picker')
  }), /*#__PURE__*/_react.default.createElement(_WidgetPicker.default, {
    className: containerClassName
  }, /*#__PURE__*/_react.default.createElement(_NumberInput.default, _extends({}, inputProps, {
    role: "spinbutton",
    tabIndex: tabIndex,
    value: clampedValue,
    placeholder: placeholder,
    autoFocus: autoFocus,
    editing: focused,
    localizer: localizer,
    parse: parse,
    name: name,
    min: min,
    max: max,
    disabled: disabled,
    readOnly: readOnly,
    onChange: handleChange,
    onKeyPress: onKeyPress,
    onKeyUp: onKeyUp,
    innerRef: inputRef
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "rw-input-addon rw-number-picker-spinners"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    icon: incrementIcon,
    className: "rw-picker-btn",
    disabled: clampedValue === max || disabled || readOnly,
    label: localizer.messages.increment({
      value: clampedValue,
      min,
      max
    }),
    onMouseUp: () => handleMouseUp(),
    onMouseDown: e => handleMouseDown('UP', e),
    onMouseLeave: () => handleMouseUp()
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    icon: decrementIcon,
    className: "rw-picker-btn",
    disabled: clampedValue === min || disabled || readOnly,
    label: localizer.messages.decrement({
      value: clampedValue,
      min,
      max
    }),
    onMouseUp: () => handleMouseUp(),
    onMouseDown: e => handleMouseDown('DOWN', e),
    onMouseLeave: () => handleMouseUp()
  }))));
}

;
NumberPicker.propTypes = propTypes;
NumberPicker.defaultProps = defaultProps;
var _default = NumberPicker;
exports.default = _default;

function getPrecision(a) {
  if (!isFinite(a)) return 0;
  let e = 1;
  let p = 0;

  while (Math.round(a * e) / e !== a) {
    e *= 10;
    p++;
  }

  return p;
}