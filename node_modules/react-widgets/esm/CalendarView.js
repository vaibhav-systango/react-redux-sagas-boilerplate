function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import cn from 'classnames';
import React, { useEffect, useRef } from 'react';
import dates from './dates';
import useFocusManager from './useFocusManager';

function clamp(date, min, max) {
  return dates.max(dates.min(date, max), min);
}

function CalendarView({
  className,
  focusedItem,
  onKeyDown,
  children,
  'aria-labelledby': labelledby
}) {
  const ref = useRef(null);
  const [focusEvents, focused] = useFocusManager(ref);
  useEffect(() => {
    var _node$querySelector;

    const node = ref.current;
    if (!node || !focused) return;
    (_node$querySelector = node.querySelector('.rw-cell[tabindex]')) == null ? void 0 : _node$querySelector.focus();
  }, [focusedItem, focused, ref]);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "grid",
    ref: ref,
    tabIndex: -1
  }, focusEvents, {
    onKeyDown: onKeyDown,
    "aria-labelledby": labelledby,
    className: cn(className, 'rw-nav-view', 'rw-calendar-grid')
  }), children);
}

function CalendarViewCell({
  onChange,
  min,
  max,
  date,
  unit,
  disabled,
  selected,
  focusedItem,
  viewUnit,
  children,
  label
}) {
  const isEqual = nextDate => dates.eq(date, nextDate, unit);

  const isEmpty = !dates.inRange(date, min, max, unit);
  const isDisabled = disabled || isEmpty; // const isNow = now && isEqual(now)

  const isFocused = !disabled && !isEmpty && isEqual(focusedItem);
  const isSelected = selected && isEqual(selected);
  const isOffView = date && focusedItem && viewUnit && dates[viewUnit](date) !== dates[viewUnit](focusedItem);

  const handleChange = () => {
    onChange(clamp(date, min, max));
  };

  return /*#__PURE__*/React.createElement("div", {
    role: "gridcell",
    title: label,
    "aria-label": label,
    "aria-readonly": disabled,
    "aria-selected": Boolean(isSelected),
    tabIndex: isFocused ? 0 : void 0,
    onClick: !isDisabled ? handleChange : undefined,
    className: cn('rw-cell', // isNow && 'rw-now',
    isDisabled && 'rw-state-disabled', isEmpty && 'rw-cell-not-allowed', isOffView && 'rw-cell-off-range', isSelected && 'rw-state-selected')
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true
  }, children));
}

CalendarView.Body = props => /*#__PURE__*/React.createElement("div", _extends({
  role: "rowgroup",
  className: "rw-calendar-body"
}, props));

CalendarView.Row = props => /*#__PURE__*/React.createElement("div", _extends({
  role: "row",
  className: "rw-calendar-row"
}, props));

CalendarView.Cell = CalendarViewCell;
export default CalendarView;