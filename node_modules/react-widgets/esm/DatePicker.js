const _excluded = ["id", "value", "onChange", "onSelect", "onToggle", "onKeyDown", "onKeyPress", "onCurrentDateChange", "inputProps", "calendarProps", "timeInputProps", "popupProps", "autoFocus", "tabIndex", "disabled", "readOnly", "className", "valueFormat", "valueDisplayFormat", "valueEditFormat", "containerClassName", "name", "selectIcon", "placeholder", "includeTime", "min", "max", "open", "dropUp", "parse", "messages", "formats", "currentDate", "popupTransition", "popupComponent", "timePrecision", "aria-labelledby", "aria-describedby"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useImperativeHandle, useRef, useCallback } from 'react';
import { useUncontrolled } from 'uncontrollable';
import Calendar from './Calendar';
import DatePickerInput from './DatePickerInput';
import { calendar } from './Icon';
import { useLocalizer } from './Localization';
import BasePopup from './Popup';
import TimeInput from './TimeInput';
import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import dates from './dates';
import useDropdownToggle from './useDropdownToggle';
import useTabTrap from './useTabTrap';
import useFocusManager from './useFocusManager';
import { notify, useFirstFocusedRender, useInstanceId } from './WidgetHelpers';
import useEventCallback from '@restart/hooks/useEventCallback';
import InputAddon from './InputAddon';
let propTypes = {
  /**
   * @example ['valuePicker', [ ['new Date()', null] ]]
   */
  value: PropTypes.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()', null] ]]
   */
  onChange: PropTypes.func,

  /**
   * @example ['openDate']
   */
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: PropTypes.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: PropTypes.func,
  onSelect: PropTypes.func,

  /**
   * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: PropTypes.instanceOf(Date),

  /**
   * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: PropTypes.instanceOf(Date),

  /**
   * A formatting options used to display the date value. This is a shorthand for
   * setting both `valueDisplayFormat` and `valueEditFormat`.
   */
  valueFormat: PropTypes.any,

  /**
   * A formatting options used to display the date value. For more information about formats
   * visit the [Localization page](./localization)
   *
   * ```tsx live
   * import { DatePicker } from 'react-widgets';
   *
   * <DatePicker
   *   defaultValue={new Date()}
   *   valueDisplayFormat={{ dateStyle: "medium" }}
   * />
   * ```
   */
  valueDisplayFormat: PropTypes.any,

  /**
   * A formatting options used while the date input has focus. Useful for showing a simpler format for inputing.
   * For more information about formats visit the [Localization page](./localization)
   *
   * ```tsx live
   * import { DatePicker } from 'react-widgets';
   *
   * <DatePicker
   *   defaultValue={new Date()}
   *   valueEditFormat={{ dateStyle: "short" }}
   *   valueDisplayFormat={{ dateStyle: "medium" }}
   * />
   * ```
   */
  valueEditFormat: PropTypes.any,

  /**
   * Enable the time list component of the picker.
   */
  includeTime: PropTypes.bool,
  timePrecision: PropTypes.oneOf(['minutes', 'seconds', 'milliseconds']),
  timeInputProps: PropTypes.object,

  /** Specify the element used to render the calendar dropdown icon. */
  selectIcon: PropTypes.node,
  dropUp: PropTypes.bool,
  popupTransition: PropTypes.elementType,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: PropTypes.bool,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: PropTypes.bool,

  /**
   * Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
   * or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
   * the `format` prop is a `string` parse will automatically use that format as its default.
   */
  parse: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),

  /** @ignore */
  tabIndex: PropTypes.any,

  /** @ignore */
  'aria-labelledby': PropTypes.string,

  /** @ignore */
  'aria-describedby': PropTypes.string,

  /** @ignore */
  localizer: PropTypes.any,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,
  calendarProps: PropTypes.object,
  inputProps: PropTypes.object,
  messages: PropTypes.shape({
    dateButton: PropTypes.string
  })
};
const defaultProps = Object.assign({}, Calendar.defaultProps, {
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  selectIcon: calendar,
  formats: {}
});

/**
 * ---
 * subtitle: DatePicker, TimePicker
 * localized: true
 * shortcuts:
 *   - { key: alt + down arrow, label:  open calendar or time }
 *   - { key: alt + up arrow, label: close calendar or time }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * @public
 * @extends Calendar
 */
const DatePicker = /*#__PURE__*/React.forwardRef((uncontrolledProps, outerRef) => {
  const _useUncontrolled = useUncontrolled(uncontrolledProps, {
    open: 'onToggle',
    value: 'onChange',
    currentDate: 'onCurrentDateChange'
  }),
        {
    id,
    value,
    onChange,
    onSelect,
    onToggle,
    onKeyDown,
    onKeyPress,
    onCurrentDateChange,
    inputProps,
    calendarProps,
    timeInputProps,
    popupProps,
    autoFocus,
    tabIndex,
    disabled,
    readOnly,
    className,
    // @ts-ignore
    valueFormat,
    valueDisplayFormat = valueFormat,
    valueEditFormat = valueFormat,
    containerClassName,
    name,
    selectIcon,
    placeholder,
    includeTime = false,
    min,
    max,
    open,
    dropUp,
    parse,
    messages,
    formats,
    currentDate,
    popupTransition,
    popupComponent: Popup = BasePopup,
    timePrecision,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby
  } = _useUncontrolled,
        elementProps = _objectWithoutPropertiesLoose(_useUncontrolled, _excluded);

  const localizer = useLocalizer(messages, formats);
  const ref = useRef(null);
  const calRef = useRef(null);
  const tabTrap = useTabTrap(calRef);
  const inputId = useInstanceId(id, '_input');
  const dateId = useInstanceId(id, '_date');
  const currentFormat = includeTime ? 'datetime' : 'date';
  const toggle = useDropdownToggle(open, onToggle);
  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    didHandle(focused) {
      if (!focused) {
        toggle.close();
        tabTrap.stop();
      } else if (open) {
        tabTrap.focus();
      }
    }

  });
  const dateParser = useCallback(str => {
    var _localizer$parseDate, _ref;

    if (typeof parse == 'function') {
      var _parse;

      return (_parse = parse(str, localizer)) != null ? _parse : null;
    }

    return (_localizer$parseDate = localizer.parseDate(str, (_ref = parse != null ? parse : valueEditFormat) != null ? _ref : valueDisplayFormat)) != null ? _localizer$parseDate : null;
  }, [localizer, parse, valueDisplayFormat, valueEditFormat]);
  /**
   * Handlers
   */

  const handleChange = useEventCallback((date, str, constrain) => {
    if (readOnly || disabled) return;
    if (constrain) date = inRangeValue(date);

    if (onChange) {
      if (date == null || value == null) {
        if (date != value //eslint-disable-line eqeqeq
        ) onChange(date, str);
      } else if (!dates.eq(date, value)) {
        onChange(date, str);
      }
    }
  });
  const handleKeyDown = useEventCallback(e => {
    if (readOnly) return;
    notify(onKeyDown, [e]);
    if (e.defaultPrevented) return;

    if (e.key === 'Escape' && open) {
      toggle.close();
    } else if (e.altKey) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        toggle.open();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        toggle.close();
      }
    }
  });
  const handleKeyPress = useEventCallback(e => {
    notify(onKeyPress, [e]);
    if (e.defaultPrevented) return;
  });
  const handleDateSelect = useEventCallback(date => {
    var _ref$current;

    let dateTime = dates.merge(date, value, currentDate);
    let dateStr = formatDate(date);
    if (!includeTime) toggle.close();
    notify(onSelect, [dateTime, dateStr]);
    handleChange(dateTime, dateStr, true);
    (_ref$current = ref.current) == null ? void 0 : _ref$current.focus();
  });
  const handleTimeChange = useEventCallback(date => {
    handleChange(date, formatDate(date), true);
  });
  const handleCalendarClick = useEventCallback(e => {
    if (readOnly || disabled) return; // prevents double clicks when in a <label>

    e.preventDefault();
    toggle();
  });

  const handleOpening = () => {
    tabTrap.start();
    requestAnimationFrame(() => {
      tabTrap.focus();
    });
  };

  const handleClosing = () => {
    tabTrap.stop();
    if (focused) focus();
  };
  /**
   * Methods
   */


  function focus() {
    var _calRef$current, _ref$current2;

    if (open) (_calRef$current = calRef.current) == null ? void 0 : _calRef$current.focus();else (_ref$current2 = ref.current) == null ? void 0 : _ref$current2.focus();
  }

  function inRangeValue(value) {
    if (value == null) return value;
    return dates.max(dates.min(value, max), min);
  }

  function formatDate(date) {
    return date instanceof Date && !isNaN(date.getTime()) ? localizer.formatDate(date, currentFormat) : '';
  }

  useImperativeHandle(outerRef, () => ({
    focus
  }));
  let shouldRenderList = useFirstFocusedRender(focused, open);
  const inputReadOnly = (inputProps == null ? void 0 : inputProps.readOnly) != null ? inputProps == null ? void 0 : inputProps.readOnly : readOnly;
  return /*#__PURE__*/React.createElement(Widget, _extends({}, elementProps, {
    defaultValue: undefined,
    open: !!open,
    dropUp: dropUp,
    focused: focused,
    disabled: disabled,
    readOnly: readOnly,
    onKeyDown: handleKeyDown,
    onKeyPress: handleKeyPress
  }, focusEvents, {
    className: cn(className, 'rw-date-picker')
  }), /*#__PURE__*/React.createElement(WidgetPicker, {
    className: containerClassName
  }, /*#__PURE__*/React.createElement(DatePickerInput, _extends({}, inputProps, {
    id: inputId,
    ref: ref,
    role: "combobox",
    name: name,
    value: value,
    tabIndex: tabIndex,
    autoFocus: autoFocus,
    placeholder: placeholder,
    disabled: disabled,
    readOnly: inputReadOnly,
    formatter: currentFormat,
    displayFormat: valueDisplayFormat,
    editFormat: valueEditFormat,
    editing: focused,
    localizer: localizer,
    parse: dateParser,
    onChange: handleChange,
    "aria-haspopup": true,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-expanded": !!open,
    "aria-owns": dateId
  })), /*#__PURE__*/React.createElement(InputAddon, {
    icon: selectIcon,
    label: localizer.messages.dateButton(),
    disabled: disabled || readOnly,
    onClick: handleCalendarClick
  })), !!shouldRenderList && /*#__PURE__*/React.createElement(Popup, _extends({}, popupProps, {
    dropUp: dropUp,
    open: open,
    role: "dialog",
    ref: calRef,
    id: dateId,
    className: "rw-calendar-popup",
    transition: popupTransition,
    onEntering: handleOpening,
    onExited: handleClosing
  }), /*#__PURE__*/React.createElement(Calendar, _extends({
    min: min,
    max: max,
    bordered: false
  }, calendarProps, {
    messages: Object.assign({}, messages, calendarProps == null ? void 0 : calendarProps.messages),
    tabIndex: -1,
    value: value,
    autoFocus: false,
    onChange: handleDateSelect,
    currentDate: currentDate,
    onCurrentDateChange: onCurrentDateChange,
    "aria-hidden": !open,
    "aria-live": "polite",
    "aria-labelledby": inputId
  })), includeTime && /*#__PURE__*/React.createElement(TimeInput, _extends({}, timeInputProps, {
    value: value,
    precision: timePrecision,
    onChange: handleTimeChange,
    datePart: currentDate
  }))));
});
DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;
export default DatePicker;