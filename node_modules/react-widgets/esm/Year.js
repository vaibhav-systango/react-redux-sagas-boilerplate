const _excluded = ["focusedItem", "disabled", "onChange", "value", "min", "localizer", "max"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import CalendarView from './CalendarView';
import { chunk } from './_';
import dates from './dates';
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function monthsInYear(year) {
  let date = new Date(year, 0, 1);
  return months.map(i => dates.month(date, i));
}

function YearView(_ref) {
  let {
    focusedItem,
    disabled,
    onChange,
    value,
    min,
    localizer,
    max
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  let months = monthsInYear(dates.year(focusedItem));
  return /*#__PURE__*/React.createElement(CalendarView, _extends({}, props, {
    focusedItem: focusedItem
  }), /*#__PURE__*/React.createElement(CalendarView.Body, null, chunk(months, 4).map((row, rowIdx) => /*#__PURE__*/React.createElement(CalendarView.Row, {
    key: rowIdx
  }, row.map((date, colIdx) => {
    let label = localizer.formatDate(date, 'header');
    return /*#__PURE__*/React.createElement(CalendarView.Cell, {
      key: colIdx,
      label: label,
      date: date,
      min: min,
      max: max,
      unit: "month",
      viewUnit: "year",
      onChange: onChange,
      focusedItem: focusedItem,
      selected: value,
      disabled: disabled
    }, localizer.formatDate(date, 'month'));
  })))));
}

export default YearView;