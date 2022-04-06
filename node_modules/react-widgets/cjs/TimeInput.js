"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _querySelectorAll = _interopRequireDefault(require("dom-helpers/querySelectorAll"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = require("uncontrollable");

var _Button = _interopRequireDefault(require("./Button"));

var _DateTimePartInput = _interopRequireDefault(require("./DateTimePartInput"));

var _Icon = require("./Icon");

var _Widget = _interopRequireDefault(require("./Widget"));

var _dates = _interopRequireDefault(require("./dates"));

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

const _excluded = ["value", "use12HourClock", "padValues", "emptyCharacter", "precision", "noClearButton", "hoursAddon", "minutesAddon", "secondsAddon", "millisecondsAddon", "className", "disabled", "readOnly", "datePart", "onChange", "onBlur", "onFocus"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const selectTextRange = el => {
  if (el instanceof HTMLInputElement) return el.select();
  const range = document.createRange();
  range.selectNodeContents(el);
  const selection = window.getSelection();

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}; // prettier-ignore


const isEmptyValue = (p, precision) => p.hours == null && p.minutes == null && (precision != 'seconds' && precision !== 'milliseconds' || p.seconds == null) && (precision !== 'milliseconds' || p.milliseconds == null); // prettier-ignore


const isPartialValue = (p, precision) => p.hours == null || p.minutes == null || (precision === 'seconds' || precision === 'milliseconds') && p.seconds == null || precision === 'milliseconds' && p.milliseconds == null;

const getValueParts = (value, use12HourClock) => {
  let hours, minutes, seconds, milliseconds;
  let meridiem = 'AM';

  if (value) {
    hours = value.getHours();

    if (use12HourClock) {
      meridiem = hours < 12 ? 'AM' : 'PM';
      hours = hours % 12 || 12;
    }

    minutes = value.getMinutes();
    seconds = value.getSeconds();
    milliseconds = value.getMilliseconds();
  }

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
    meridiem
  };
};

const TEST_VALID = {
  hours: /^([1]?[0-9]|2[0-3])$/,
  hours12: /^(1[0-2]|0?[1-9])$/,
  minutes: /^([0-5]?\d)$/,
  seconds: /^([0-5]?\d)$/,
  milliseconds: /^(\d{1,3})$/
};
const TEST_COMPLETE = {
  hours: /^([3-9]|\d{2})$/,
  hours12: /^(\d{2}|[2-9])$/,
  minutes: /^(d{2}|[6-9])$/,
  seconds: /^(d{2}|[6-9])$/,
  milliseconds: /^(\d{3})$/
};

function testPart(value, part, use12HourClock, tests) {
  const key = part === 'hours' && use12HourClock ? 'hours12' : part;
  return tests[key].test(value);
}

const isValid = (value, part, use12HourClock) => testPart(value, part, use12HourClock, TEST_VALID);

const isComplete = (value, part, use12HourClock) => testPart(value, part, use12HourClock, TEST_COMPLETE);

const propTypes = {
  /**
   * @example ['valuePicker', [ ['new Date()'] ]]
   */
  value: _propTypes.default.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()'] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * The default date used to construct a new time when the `value` is empty
   *
   * @default new Date()
   **/
  datePart: _propTypes.default.instanceOf(Date),

  /**
   * Use a 12 hour clock (with AM/PM) instead of 24 hour one.
   * The configured localizer may provide a default value .
   **/
  use12HourClock: _propTypes.default.bool,

  /** Time part values will be padded by `0` */
  padValues: _propTypes.default.bool,

  /** The string character used to pad empty, or cleared values */
  emptyCharacter: _propTypes.default.string,

  /** Hide the input clear button */
  noClearButton: _propTypes.default.bool,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: _propTypes.default.bool,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: _propTypes.default.bool,

  /** Controls how precise of a time can be input **/
  precision: _propTypes.default.oneOf(['minutes', 'seconds', 'milliseconds']).isRequired,

  /**
   * The seperator between hours and minutes
   * @default ':'
   */
  hoursAddon: _propTypes.default.node,

  /**
   * The seperator between hours and minutes
   * @default ':'
   */
  minutesAddon: _propTypes.default.node,

  /**
   * The seperator between hours and minutes
   * @default ':'
   */
  secondsAddon: _propTypes.default.node,

  /**
   * The seperator between hours and minutes
   * @default '.'
   */
  millisecondsAddon: _propTypes.default.node
};
const defaultProps = {
  hoursAddon: ':',
  padValues: true,
  precision: 'minutes',
  emptyCharacter: '-'
};

// let count = 0
function useTimePartState(value, use12HourClock) {
  const [state, setState] = (0, _react.useState)(() => ({
    value,
    use12HourClock,
    timeParts: getValueParts(value, use12HourClock)
  }));
  const setTimeParts = (0, _react.useCallback)(timeParts => setState(s => Object.assign({}, s, {
    timeParts
  })), [setState]);

  if (state.value !== value || state.use12HourClock !== use12HourClock) {
    // count++
    // if (count < 100)
    setState({
      value,
      use12HourClock,
      timeParts: getValueParts(value, use12HourClock)
    });
  }

  return [state.timeParts, setTimeParts];
}

function TimeInput(uncontrolledProps) {
  const _useUncontrolled = (0, _uncontrollable.useUncontrolled)(uncontrolledProps, {
    value: 'onChange'
  }),
        {
    value,
    use12HourClock,
    padValues: pad,
    emptyCharacter,
    precision,
    noClearButton,
    hoursAddon,
    minutesAddon,
    secondsAddon,
    millisecondsAddon,
    className,
    disabled,
    readOnly,
    datePart,
    onChange,
    onBlur,
    onFocus
  } = _useUncontrolled,
        props = _objectWithoutPropertiesLoose(_useUncontrolled, _excluded);

  let minsAddon = minutesAddon !== undefined ? minutesAddon : precision === 'seconds' || precision === 'milliseconds' ? ':' : '';
  let secsAddon = secondsAddon !== undefined ? secondsAddon : precision === 'milliseconds' ? ':' : '';
  const ref = (0, _react.useRef)(null);
  const hourRef = (0, _react.useRef)(null);
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref, {
    disabled,
    onBlur,
    onFocus
  }, {
    didHandle: (focused, e) => {
      var _hourRef$current;

      if (!focused) return;
      if (!e.target.dataset.focusable) (_hourRef$current = hourRef.current) == null ? void 0 : _hourRef$current.focus();else select(e.target);
    }
  });
  const [timeParts, setTimeParts] = useTimePartState(value != null ? value : null, use12HourClock != null ? use12HourClock : false);

  function getDatePart() {
    return _dates.default.startOf(datePart || new Date(), 'day');
  }

  const getMin = part => part === 'hours' ? 1 : 0;

  const getMax = part => {
    if (part === 'hours') return use12HourClock ? 12 : 23;
    if (part === 'milliseconds') return 999;
    return 59;
  };

  function select(target = document.activeElement) {
    window.Promise.resolve().then(() => {
      if (focused) selectTextRange(target);
    });
  }
  /**
   * Handlers
   */


  const handleClear = () => {
    var _hourRef$current2;

    (_hourRef$current2 = hourRef.current) == null ? void 0 : _hourRef$current2.focus();
    if (value) onChange(null);else setTimeParts(getValueParts(null));
  };

  const handleChange = (part, event) => {
    const currentValue = timeParts[part];
    const {
      target
    } = event;
    const rawValue = target.value;
    let strValue = `${currentValue || ''}${rawValue}`;
    let numValue = +strValue;

    if (isNaN(numValue) || strValue && !isValid(strValue, part, use12HourClock != null ? use12HourClock : false)) {
      // the combined value is now past the max or invalid so try the single
      // digit and "start over" filling the value
      if (isValid(rawValue, part, use12HourClock != null ? use12HourClock : false) && !isNaN(+rawValue)) {
        // change the effective current value
        strValue = rawValue;
        numValue = +rawValue;
      } else {
        return event.preventDefault();
      }
    }

    const nextValue = target.value ? numValue : null;
    notifyChange({
      [part]: nextValue
    });

    if (nextValue != null && isComplete(strValue, part, use12HourClock != null ? use12HourClock : false)) {
      focusNext(event.currentTarget, +1);
    } else {
      select(target);
    }
  };

  const handleSelect = ({
    target
  }) => {
    select(target);
  };

  const handleKeyDown = (part, event) => {
    const {
      key
    } = event;
    const input = event.currentTarget;
    const {
      selectionStart: start,
      selectionEnd: end
    } = input;
    const isRTL = getComputedStyle(input).getPropertyValue('direction') === 'rtl';
    const isMeridiem = part === 'meridiem';
    const isNext = key === (isRTL ? 'ArrowLeft' : 'ArrowRight');
    const isPrev = key === (isRTL ? 'ArrowRight' : 'ArrowLeft');

    if (key === 'ArrowUp') {
      event.preventDefault();
      increment(part, 1);
    }

    if (key === 'ArrowDown') {
      event.preventDefault();
      increment(part, -1);
    }

    if (isPrev && (isMeridiem || start - 1 < 0)) {
      event.preventDefault();
      focusNext(input, -1);
    }

    if (isNext && (isMeridiem || input.value.length <= end + 1)) {
      event.preventDefault();
      focusNext(input, +1);
    }

    if (readOnly && key !== 'Tab') {
      event.preventDefault();
    }

    if (isMeridiem) {
      if (key === 'a' || key === 'A') notifyChange({
        meridiem: 'AM'
      });
      if (key === 'p' || key === 'P') notifyChange({
        meridiem: 'PM'
      });
    }
  };

  const increment = (part, inc) => {
    let nextPart = timeParts[part];

    if (part === 'meridiem') {
      nextPart = nextPart === 'AM' ? 'PM' : 'AM';
    } else {
      nextPart = (nextPart || 0) + inc;
      if (!isValid(String(nextPart), part, use12HourClock != null ? use12HourClock : false)) return;
    }

    notifyChange({
      [part]: nextPart
    });
    select();
  };

  function notifyChange(updates) {
    const nextTimeParts = Object.assign({}, timeParts, updates);

    if (value && isEmptyValue(nextTimeParts, precision)) {
      return onChange(null);
    }

    if (isPartialValue(nextTimeParts, precision)) return setTimeParts(nextTimeParts);
    let {
      hours,
      minutes,
      seconds,
      milliseconds,
      meridiem
    } = nextTimeParts;
    let nextDate = new Date(value || getDatePart());

    if (use12HourClock) {
      if (hours === 12) hours = 0;
      hours += meridiem === 'PM' ? 12 : 0;
    }

    nextDate.setHours(hours);
    nextDate.setMinutes(minutes);
    if (seconds != null) nextDate.setSeconds(seconds);
    if (milliseconds != null) nextDate.setMilliseconds(milliseconds);
    onChange(nextDate, {
      lastValue: value,
      timeParts
    });
  }

  function focusNext(input, delta) {
    let nodes = (0, _querySelectorAll.default)(ref.current, '* [data-focusable]');
    let next = nodes[nodes.indexOf(input) + delta];
    next == null ? void 0 : next.focus();
    select(next);
  }

  const {
    hours,
    minutes,
    seconds,
    milliseconds,
    meridiem
  } = timeParts;
  const showClear = !isEmptyValue(timeParts, precision);
  return /*#__PURE__*/_react.default.createElement(_Widget.default, _extends({}, props, {
    role: "group",
    ref: ref
  }, focusEvents, {
    focused: focused,
    disabled: disabled,
    readOnly: readOnly,
    className: (0, _classnames.default)(className, 'rw-time-input rw-widget-input')
  }), /*#__PURE__*/_react.default.createElement(_DateTimePartInput.default, {
    size: 2,
    pad: pad ? 2 : undefined,
    value: hours,
    disabled: disabled,
    readOnly: readOnly,
    "aria-label": "hours",
    min: getMin('hours'),
    max: getMax('hours'),
    ref: hourRef,
    emptyChar: emptyCharacter,
    onSelect: handleSelect,
    onChange: e => handleChange('hours', e),
    onKeyDown: e => handleKeyDown('hours', e)
  }), hoursAddon && /*#__PURE__*/_react.default.createElement("span", null, hoursAddon), /*#__PURE__*/_react.default.createElement(_DateTimePartInput.default, {
    size: 2,
    pad: pad ? 2 : undefined,
    value: minutes,
    disabled: disabled,
    readOnly: readOnly,
    "aria-label": "minutes",
    min: getMin('minutes'),
    max: getMax('minutes'),
    emptyChar: emptyCharacter,
    onSelect: handleSelect,
    onChange: e => handleChange('minutes', e),
    onKeyDown: e => handleKeyDown('minutes', e)
  }), minsAddon && /*#__PURE__*/_react.default.createElement("span", null, minsAddon), (precision === 'seconds' || precision === 'milliseconds') && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DateTimePartInput.default, {
    size: 2,
    pad: pad ? 2 : undefined,
    value: seconds,
    disabled: disabled,
    readOnly: readOnly,
    "aria-label": "seconds",
    min: getMin('seconds'),
    max: getMax('seconds'),
    emptyChar: emptyCharacter,
    onSelect: handleSelect,
    onChange: e => handleChange('seconds', e),
    onKeyDown: e => handleKeyDown('seconds', e)
  }), secsAddon && /*#__PURE__*/_react.default.createElement("span", null, secsAddon)), precision === 'milliseconds' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DateTimePartInput.default, {
    size: 3,
    pad: pad ? 3 : undefined,
    value: milliseconds,
    disabled: disabled,
    readOnly: readOnly,
    "aria-label": "milliseconds",
    min: getMin('milliseconds'),
    max: getMax('milliseconds'),
    emptyChar: emptyCharacter,
    onSelect: handleSelect,
    onChange: e => handleChange('milliseconds', e),
    onKeyDown: e => handleKeyDown('milliseconds', e)
  }), millisecondsAddon && /*#__PURE__*/_react.default.createElement("span", null, millisecondsAddon)), use12HourClock && /*#__PURE__*/_react.default.createElement("div", {
    role: "listbox",
    "aria-label": "AM/PM",
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    className: "rw-time-part-meridiem"
  }, /*#__PURE__*/_react.default.createElement("div", {
    "data-focusable": true,
    role: "option",
    "aria-atomic": true,
    "aria-selected": true,
    "aria-setsize": 2,
    "aria-live": "assertive",
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    "aria-posinset": meridiem === 'AM' ? 1 : 2,
    tabIndex: !disabled ? 0 : void 0,
    onFocus: handleSelect,
    onSelect: handleSelect,
    onKeyDown: e => handleKeyDown('meridiem', e)
  }, /*#__PURE__*/_react.default.createElement("abbr", null, meridiem))), !noClearButton && /*#__PURE__*/_react.default.createElement(_Button.default, {
    label: 'clear input',
    onClick: handleClear,
    disabled: disabled || readOnly,
    className: (0, _classnames.default)('rw-time-input-clear', showClear && 'rw-show')
  }, _Icon.times));
}

TimeInput.propTypes = propTypes;
TimeInput.defaultProps = defaultProps;
var _default = TimeInput;
exports.default = _default;