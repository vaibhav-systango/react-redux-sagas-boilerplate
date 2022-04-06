const _excluded = ["className", "containerClassName", "disabled", "readOnly", "value", "min", "max", "incrementIcon", "decrementIcon", "placeholder", "autoFocus", "tabIndex", "parse", "name", "onChange", "messages", "format", "onKeyDown", "onKeyPress", "onKeyUp", "inputProps", "precision", "step"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useUncontrolled } from 'uncontrollable';
import Button from './Button';
import { caretDown, caretUp } from './Icon';
import { useLocalizer } from './Localization';
import NumberInput from './NumberInput';
import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import * as CustomPropTypes from './PropTypes';
import useFocusManager from './useFocusManager';
import { notify } from './WidgetHelpers';
import useEventCallback from '@restart/hooks/useEventCallback'; // my tests in ie11/chrome/FF indicate that keyDown repeats
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
  value: PropTypes.number,

  /**
   * @example ['onChangePicker', [ [1, null] ]]
   */
  onChange: PropTypes.func,

  /**
   * The minimum number that the NumberPicker value.
   * @example ['prop', ['min', 0]]
   */
  min: PropTypes.number,

  /**
   * The maximum number that the NumberPicker value.
   *
   * @example ['prop', ['max', 0]]
   */
  max: PropTypes.number,

  /**
   * Amount to increase or decrease value when using the spinner buttons.
   *
   * @example ['prop', ['step', 5]]
   */
  step: PropTypes.number,

  /**
   * Specify how precise the `value` should be when typing, incrementing, or decrementing the value.
   * When empty, precision is parsed from the current `format` and culture.
   */
  precision: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),

  /**
   * A format string used to display the number value. Localizer dependent, read about [localization](localization) for more info.
   *
   * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
   */
  format: PropTypes.any,
  parse: PropTypes.func,
  incrementIcon: PropTypes.node,
  decrementIcon: PropTypes.node,

  /** @ignore */
  tabIndex: PropTypes.any,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  autoFocus: PropTypes.bool,

  /**
   * @example ['disabled', ['1']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['1.5']]
   */
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,
  inputProps: PropTypes.object,
  messages: PropTypes.shape({
    increment: PropTypes.string,
    decrement: PropTypes.string
  }),

  /** @ignore */
  localizer: PropTypes.object
};
const defaultProps = {
  incrementIcon: caretUp,
  decrementIcon: caretDown,
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
  const _useUncontrolled = useUncontrolled(uncontrolledProps, {
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

  const localizer = useLocalizer(messages, {
    number: format
  });
  const ref = useRef(null);
  const inputRef = useRef(null);
  const repeaterRef = useRef(null);
  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    willHandle(focused) {
      if (focused) focus();
    }

  });
  const handleMouseDown = useEventCallback((direction, event) => {
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
  const handleMouseUp = useEventCallback(() => {
    if (!repeaterRef.current) return;
    repeaterRef.current();
    repeaterRef.current = null;
  });
  const handleKeyDown = useEventCallback(event => {
    if (readOnly) return;
    let key = event.key;
    notify(onKeyDown, [event]);
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
    if (value !== nextValue) notify(onChange, [nextValue, {
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
  return /*#__PURE__*/React.createElement(Widget, _extends({}, elementProps, {
    focused: focused,
    disabled: disabled,
    readOnly: readOnly,
    onKeyDown: handleKeyDown
  }, focusEvents, {
    ref: ref,
    className: cn(className, 'rw-number-picker')
  }), /*#__PURE__*/React.createElement(WidgetPicker, {
    className: containerClassName
  }, /*#__PURE__*/React.createElement(NumberInput, _extends({}, inputProps, {
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
  })), /*#__PURE__*/React.createElement("span", {
    className: "rw-input-addon rw-number-picker-spinners"
  }, /*#__PURE__*/React.createElement(Button, {
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
  }), /*#__PURE__*/React.createElement(Button, {
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
export default NumberPicker;

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