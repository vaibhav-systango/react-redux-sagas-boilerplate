const _excluded = ["focusedItem", "disabled", "onChange", "value", "localizer", "min", "max"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import CalendarView from './CalendarView';
import { chunk } from './_';
import dates from './dates';

function DecadeView(_ref) {
  let {
    focusedItem,
    disabled,
    onChange,
    value,
    localizer,
    min,
    max
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const chunks = useMemo(() => chunk(getDecadeYears(focusedItem), 4), [focusedItem]);
  return /*#__PURE__*/React.createElement(CalendarView, _extends({}, props, {
    focusedItem: focusedItem
  }), /*#__PURE__*/React.createElement(CalendarView.Body, null, chunks.map((row, rowIdx) => /*#__PURE__*/React.createElement(CalendarView.Row, {
    key: rowIdx
  }, row.map((date, colIdx) => {
    let label = localizer.formatDate(date, 'year');
    return /*#__PURE__*/React.createElement(CalendarView.Cell, {
      key: colIdx,
      unit: "year",
      viewUnit: "decade",
      label: label,
      date: date,
      min: min,
      max: max,
      onChange: onChange,
      focusedItem: focusedItem,
      selected: value,
      disabled: disabled
    }, label);
  })))));
}

function getDecadeYears(_date) {
  let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let date = dates.add(dates.startOf(_date, 'decade'), -2, 'year');
  return days.map(() => date = dates.add(date, 1, 'year'));
}

export default DecadeView;