const _excluded = ["id", "autoFocus", "bordered", "views", "tabIndex", "disabled", "readOnly", "className", "value", "defaultValue", "onChange", "currentDate", "defaultCurrentDate", "onCurrentDateChange", "min", "max", "view", "defaultView", "onViewChange", "onKeyDown", "onNavigate", "renderDay", "messages", "formats"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';
import CalendarHeader from './CalendarHeader';
import Century from './Century';
import Decade from './Decade';
import { useLocalizer } from './Localization';
import Month from './Month';
import SlideTransitionGroup from './SlideTransitionGroup';
import Widget from './Widget';
import Year from './Year';
import dates from './dates';
import useAutoFocus from './useAutoFocus';
import useFocusManager from './useFocusManager';
import { notify, useInstanceId } from './WidgetHelpers';

let last = a => a[a.length - 1];

const CELL_CLASSNAME = 'rw-cell';
const FOCUSED_CELL_SELECTOR = `.${CELL_CLASSNAME}[tabindex]`;
const MIN = new Date(1900, 0, 1);
const MAX = new Date(2099, 11, 31);
const VIEW_OPTIONS = ['month', 'year', 'decade', 'century'];
const VIEW_UNIT = {
  month: 'day',
  year: 'month',
  decade: 'year',
  century: 'decade'
};
const VIEW = {
  month: Month,
  year: Year,
  decade: Decade,
  century: Century
};
const ARROWS_TO_DIRECTION = {
  ArrowDown: 'DOWN',
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowLeft: 'LEFT'
};
const OPPOSITE_DIRECTION = {
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
};
const MULTIPLIER = {
  year: 1,
  decade: 10,
  century: 100
};

function inRangeValue(_value, min, max) {
  let value = dateOrNull(_value);
  if (value === null) return value;
  return dates.max(dates.min(value, max), min);
}

const propTypes = {
  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: PropTypes.bool,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: PropTypes.bool,

  /**
   * @example ['onChangePicker', [ ['new Date()'] ]]
   */
  onChange: PropTypes.func,

  /**
   * The selected Date.
   *
   * ```tsx live
   * import { Calendar } from 'react-widgets';
   *
   * <Calendar value={new Date()} />
   * ```
   * @example false
   */
  value: PropTypes.instanceOf(Date),

  /**
   * The minimum date that the Calendar can navigate from.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: PropTypes.instanceOf(Date),

  /**
   * The maximum date that the Calendar can navigate to.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: PropTypes.instanceOf(Date),

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: PropTypes.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: PropTypes.func,

  /** Specify the navigate into the past header icon */
  navigatePrevIcon: PropTypes.node,

  /** Specify the navigate into the future header icon */
  navigateNextIcon: PropTypes.node,

  /**
   * Controls the currently displayed calendar view. Use `defaultView` to set a unique starting view.
   *
   * @type {("month"|"year"|"decade"|"century")}
   * @controllable onViewChange
   */
  view(props, ...args) {
    // @ts-ignore
    return PropTypes.oneOf(props.views || VIEW_OPTIONS)(props, ...args);
  },

  /**
   * Defines a list of views the Calendar can traverse through, starting with the
   * first in the list to the last.
   *
   * @type array<"month"|"year"|"decade"|"century">
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(VIEW_OPTIONS)),

  /**
   * A callback fired when the `view` changes.
   *
   * @controllable view
   */
  onViewChange: PropTypes.func,

  /**
   * Callback fired when the Calendar navigates between views, or forward and backwards in time.
   *
   * @type function(date: ?Date, direction: string, view: string)
   */
  onNavigate: PropTypes.func,
  culture: PropTypes.string,
  autoFocus: PropTypes.bool,

  /**
   * Show or hide the Calendar footer.
   *
   * @example ['prop', ['footer', true]]
   */
  footer: PropTypes.bool,

  /**
   * Provide a custom component to render the days of the month. The Component is provided the following props
   *
   * - `date`: a `Date` object for the day of the month to render
   * - `label`: a formatted `string` of the date to render. To adjust the format of the `label` string use the `dateFormat` prop, listed below.
   */
  renderDay: PropTypes.func,
  formats: PropTypes.shape({
    /**
     * A formatter for the header button of the month view.
     *
     * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
     */
    header: PropTypes.any,

    /**
     * A formatter for the Calendar footer, formats today's Date as a string.
     *
     * @example ['dateFormat', ['footerFormat', "{ date: 'medium' }", "date => 'Today is: ' + formatter(date)"]]
     */
    footer: PropTypes.any,

    /**
     * A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
     *
     * @example ['prop', { day: "day => \n['🎉', 'M', 'T','W','Th', 'F', '🎉'][day.getDay()]" }]
     */
    day: PropTypes.any,

    /**
     * A formatter for day of the month
     *
     * @example ['prop', { date: "dt => String(dt.getDate())" }]
     */
    date: PropTypes.any,

    /**
     * A formatter for month name.
     *
     * @example ['dateFormat', ['monthFormat', "{ raw: 'MMMM' }", null, { defaultView: '"year"' }]]
     */
    month: PropTypes.any,

    /**
     * A formatter for month name.
     *
     * @example ['dateFormat', ['yearFormat', "{ raw: 'yy' }", null, { defaultView: '"decade"' }]]
     */
    year: PropTypes.any,

    /**
     * A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
     */
    decade: PropTypes.any,

    /**
     * A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
     */
    century: PropTypes.any
  }),
  messages: PropTypes.shape({
    moveBack: PropTypes.string,
    moveForward: PropTypes.string
  }),
  onKeyDown: PropTypes.func,

  /** @ignore */
  tabIndex: PropTypes.any
};

const useViewState = (views, view = views[0], currentDate) => {
  const lastView = useRef(view);
  const lastDate = useRef(currentDate);
  let slideDirection;

  if (view !== lastView.current) {
    slideDirection = views.indexOf(lastView.current) > views.indexOf(view) ? 'top' : 'bottom';
  } else if (lastDate.current !== currentDate) {
    slideDirection = dates.gt(currentDate, lastDate.current) ? 'left' : 'right';
  }

  useEffect(() => {
    lastDate.current = currentDate;
    lastView.current = view;
  });
  return slideDirection;
};

/**
 * @public
 */
function Calendar(_ref) {
  let {
    id,
    autoFocus,
    bordered = true,
    views = VIEW_OPTIONS,
    tabIndex = 0,
    disabled,
    readOnly,
    className,
    value,
    defaultValue,
    onChange,
    currentDate: pCurrentDate,
    defaultCurrentDate,
    onCurrentDateChange,
    min = MIN,
    max = MAX,
    view,
    defaultView = views[0],
    onViewChange,
    onKeyDown,
    onNavigate,
    renderDay,
    messages,
    formats
  } = _ref,
      elementProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  const [currentValue, handleChange] = useUncontrolledProp(value, defaultValue, onChange);
  const [currentDate, handleCurrentDateChange] = useUncontrolledProp(pCurrentDate, defaultCurrentDate || currentValue || new Date(), onCurrentDateChange);
  const [currentView, handleViewChange] = useUncontrolledProp(view, defaultView, onViewChange);
  const localizer = useLocalizer(messages, formats);
  const ref = useRef(null);
  const viewId = useInstanceId(id, '_calendar');
  const labelId = useInstanceId(id, '_calendar_label');
  useAutoFocus(!!autoFocus, ref);
  const slideDirection = useViewState(views, currentView, currentDate);
  const [, focused] = useFocusManager(ref, {
    disabled
  }, {
    willHandle() {
      if (tabIndex == -1) return false;
    }

  });
  const lastValue = useRef(currentValue);
  useEffect(() => {
    const inValue = inRangeValue(currentValue, min, max);
    const last = lastValue.current;
    lastValue.current = currentValue;
    if (!dates.eq(inValue, dateOrNull(last), VIEW_UNIT[currentView])) maybeSetCurrentDate(inValue);
  });
  const isDisabled = disabled || readOnly;
  /**
   * Handlers
   */

  const handleViewChangeImpl = () => {
    navigate('UP');
  };

  const handleMoveBack = () => {
    navigate('LEFT');
  };

  const handleMoveForward = () => {
    navigate('RIGHT');
  };

  const handleDateChange = date => {
    if (views[0] === currentView) {
      maybeSetCurrentDate(date);
      notify(handleChange, [date]);
      focus();
      return;
    }

    navigate('DOWN', date);
  };

  const handleMoveToday = () => {
    let date = new Date();
    let firstView = views[0];
    notify(onChange, [date]);

    if (dates.inRange(date, min, max, firstView)) {
      focus();
      maybeSetCurrentDate(date);
      notify(handleViewChange, [firstView]);
    }
  };

  const handleKeyDown = e => {
    let ctrl = e.ctrlKey || e.metaKey;
    let key = e.key;
    let direction = ARROWS_TO_DIRECTION[key];
    let unit = VIEW_UNIT[currentView];

    if (key === 'Enter') {
      e.preventDefault();
      return handleDateChange(currentDate);
    }

    if (direction) {
      if (ctrl) {
        e.preventDefault();
        navigate(direction);
      } else {
        const isRTL = getComputedStyle(e.currentTarget).getPropertyValue('direction') === 'rtl';
        if (isRTL && direction in OPPOSITE_DIRECTION) direction = OPPOSITE_DIRECTION[direction];
        let nextDate = Calendar.move(currentDate, min, max, currentView, direction);

        if (!dates.eq(currentDate, nextDate, unit)) {
          e.preventDefault();
          if (dates.gt(nextDate, currentDate, currentView)) navigate('RIGHT', nextDate);else if (dates.lt(nextDate, currentDate, currentView)) navigate('LEFT', nextDate);else maybeSetCurrentDate(nextDate);
        }
      }
    }

    notify(onKeyDown, [e]);
  };

  function navigate(direction, date) {
    let nextView = currentView;
    let slideDir = direction === 'LEFT' || direction === 'UP' ? 'right' : 'left';
    if (direction === 'UP') nextView = views[views.indexOf(currentView) + 1] || nextView;
    if (direction === 'DOWN') nextView = views[views.indexOf(currentView) - 1] || nextView;
    if (!date) date = ['LEFT', 'RIGHT'].indexOf(direction) !== -1 ? nextDate(direction) : currentDate;

    if (dates.inRange(date, min, max, nextView)) {
      notify(onNavigate, [date, slideDir, nextView]); //this.focus()

      maybeSetCurrentDate(date);
      notify(handleViewChange, [nextView]);
    }
  }

  const focus = () => {
    var _ref$current;

    const node = (_ref$current = ref.current) == null ? void 0 : _ref$current.querySelector(FOCUSED_CELL_SELECTOR);
    node == null ? void 0 : node.focus();
  };

  const moveFocus = (node, hadFocus) => {
    let current = document.activeElement;

    if (hadFocus && (!current || !node.contains(current))) {
      node.focus();
    }
  };

  function maybeSetCurrentDate(date) {
    let inRangeDate = inRangeValue(date ? new Date(date) : currentDate, min, max);
    if (date === currentDate || dates.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[currentView])) return;
    notify(handleCurrentDateChange, [inRangeDate]);
  }

  function nextDate(direction) {
    let method = direction === 'LEFT' ? 'subtract' : 'add';
    let unit = currentView === 'month' ? currentView : 'year';
    let multi = MULTIPLIER[currentView] || 1;
    return dates[method](currentDate, 1 * multi, unit);
  }

  function getHeaderLabel() {
    switch (currentView) {
      case 'month':
        return localizer.formatDate(currentDate, 'header');

      case 'year':
        return localizer.formatDate(currentDate, 'year');

      case 'decade':
        return localizer.formatDate(dates.startOf(currentDate, 'decade'), 'decade');

      case 'century':
        return localizer.formatDate(dates.startOf(currentDate, 'century'), 'century');
    }
  }

  let View = VIEW[currentView];
  let todayNotInRange = !dates.inRange(new Date(), min, max, currentView);
  let key = currentView + '_' + dates[currentView](currentDate); // let elementProps = Props.pickElementProps(this),
  // let viewProps = pick(uncontrolledProps, View)

  const prevDisabled = isDisabled || !dates.inRange(nextDate('LEFT'), min, max, currentView);
  const nextDisabled = isDisabled || !dates.inRange(nextDate('RIGHT'), min, max, currentView);
  return /*#__PURE__*/React.createElement(Widget, _extends({}, elementProps, {
    role: "group",
    ref: ref,
    focused: focused,
    disabled: disabled,
    readOnly: readOnly,
    tabIndex: tabIndex,
    className: cn(className, 'rw-calendar', bordered && 'rw-calendar-contained')
  }), /*#__PURE__*/React.createElement(CalendarHeader, {
    label: getHeaderLabel(),
    labelId: labelId,
    localizer: localizer,
    upDisabled: isDisabled || currentView === last(views),
    prevDisabled: prevDisabled,
    todayDisabled: isDisabled || todayNotInRange,
    nextDisabled: nextDisabled,
    onViewChange: handleViewChangeImpl,
    onMoveLeft: handleMoveBack,
    onMoveRight: handleMoveForward,
    onMoveToday: handleMoveToday
  }), /*#__PURE__*/React.createElement(Calendar.Transition, {
    direction: slideDirection,
    onTransitionEnd: moveFocus
  }, /*#__PURE__*/React.createElement(View, {
    key: key,
    min: min,
    max: max,
    id: viewId,
    value: currentValue,
    localizer: localizer,
    disabled: isDisabled,
    focusedItem: currentDate,
    onChange: handleDateChange,
    onKeyDown: handleKeyDown,
    "aria-labelledby": labelId,
    renderDay: renderDay
  })));
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

Calendar.displayName = 'Calendar';
Calendar.propTypes = propTypes; // Calendar.defaultProps = {
//   min: new Date(1900, 0, 1),
//   max: new Date(2099, 11, 31),
//   views: VIEW_OPTIONS,
//   tabIndex: '0',
// }

Calendar.Transition = SlideTransitionGroup;

Calendar.move = (date, min, max, view, direction) => {
  let isMonth = view === 'month';
  let isUpOrDown = direction === 'UP' || direction === 'DOWN';
  let rangeUnit = view && VIEW_UNIT[view];
  let addUnit = isMonth && isUpOrDown ? 'week' : VIEW_UNIT[view];
  let amount = isMonth || !isUpOrDown ? 1 : 4;
  let newDate;
  if (direction === 'UP' || direction === 'LEFT') amount *= -1;
  newDate = dates.add(date, amount, addUnit);
  return dates.inRange(newDate, min, max, rangeUnit) ? newDate : date;
};

export default Calendar;