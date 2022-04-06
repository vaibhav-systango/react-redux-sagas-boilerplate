const _excluded = ["className", "focusedItem", "disabled", "onChange", "value", "min", "max", "localizer", "renderDay"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import React from 'react';
import CalendarView from './CalendarView';
import { chunk } from './_';
import dates from './dates';

function visibleDays(date, weekStart) {
  let current = dates.startOf(dates.startOf(date, 'month'), 'week', weekStart);
  let last = dates.endOf(dates.endOf(date, 'month'), 'week', weekStart);
  let days = [];

  while (dates.lte(current, last, 'day')) {
    days.push(current);
    current = dates.add(current, 1, 'day');
  }

  return days;
}

function MonthView(_ref) {
  let {
    className,
    focusedItem,
    disabled,
    onChange,
    value,
    min,
    max,
    localizer,
    renderDay
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  let month = visibleDays(focusedItem, localizer.firstOfWeek());
  let rows = chunk(month, 7);
  return /*#__PURE__*/React.createElement(CalendarView, _extends({}, props, {
    focusedItem: focusedItem,
    className: cn(className, 'rw-calendar-month')
  }), /*#__PURE__*/React.createElement("div", {
    role: "rowgroup",
    className: "rw-calendar-head"
  }, /*#__PURE__*/React.createElement(CalendarView.Row, {
    className: "rw-calendar-row"
  }, rows[0].map((date, idx) => /*#__PURE__*/React.createElement("div", {
    role: "columnheader",
    className: "rw-head-cell",
    key: idx
  }, localizer.formatDate(date, 'weekday'))))), /*#__PURE__*/React.createElement(CalendarView.Body, null, rows.map((row, rowIdx) => /*#__PURE__*/React.createElement(CalendarView.Row, {
    key: rowIdx
  }, row.map((date, colIdx) => {
    let formattedDate = localizer.formatDate(date, 'dayOfMonth');
    let label = localizer.formatDate(date, 'date');
    return /*#__PURE__*/React.createElement(CalendarView.Cell, {
      key: colIdx,
      label: label,
      date: date,
      min: min,
      max: max,
      unit: "day",
      viewUnit: "month",
      onChange: onChange,
      focusedItem: focusedItem,
      selected: value,
      disabled: disabled
    }, renderDay ? renderDay({
      date,
      label: formattedDate
    }) : formattedDate);
  })))));
}

export default MonthView;