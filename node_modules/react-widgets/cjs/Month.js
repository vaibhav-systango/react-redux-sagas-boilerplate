"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _CalendarView = _interopRequireDefault(require("./CalendarView"));

var _ = require("./_");

var _dates = _interopRequireDefault(require("./dates"));

const _excluded = ["className", "focusedItem", "disabled", "onChange", "value", "min", "max", "localizer", "renderDay"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function visibleDays(date, weekStart) {
  let current = _dates.default.startOf(_dates.default.startOf(date, 'month'), 'week', weekStart);

  let last = _dates.default.endOf(_dates.default.endOf(date, 'month'), 'week', weekStart);

  let days = [];

  while (_dates.default.lte(current, last, 'day')) {
    days.push(current);
    current = _dates.default.add(current, 1, 'day');
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
  let rows = (0, _.chunk)(month, 7);
  return /*#__PURE__*/_react.default.createElement(_CalendarView.default, _extends({}, props, {
    focusedItem: focusedItem,
    className: (0, _classnames.default)(className, 'rw-calendar-month')
  }), /*#__PURE__*/_react.default.createElement("div", {
    role: "rowgroup",
    className: "rw-calendar-head"
  }, /*#__PURE__*/_react.default.createElement(_CalendarView.default.Row, {
    className: "rw-calendar-row"
  }, rows[0].map((date, idx) => /*#__PURE__*/_react.default.createElement("div", {
    role: "columnheader",
    className: "rw-head-cell",
    key: idx
  }, localizer.formatDate(date, 'weekday'))))), /*#__PURE__*/_react.default.createElement(_CalendarView.default.Body, null, rows.map((row, rowIdx) => /*#__PURE__*/_react.default.createElement(_CalendarView.default.Row, {
    key: rowIdx
  }, row.map((date, colIdx) => {
    let formattedDate = localizer.formatDate(date, 'dayOfMonth');
    let label = localizer.formatDate(date, 'date');
    return /*#__PURE__*/_react.default.createElement(_CalendarView.default.Cell, {
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

var _default = MonthView;
exports.default = _default;