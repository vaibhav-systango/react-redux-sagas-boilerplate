"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CalendarView = _interopRequireDefault(require("./CalendarView"));

var _ = require("./_");

var _dates = _interopRequireDefault(require("./dates"));

const _excluded = ["focusedItem", "disabled", "onChange", "value", "min", "localizer", "max"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function monthsInYear(year) {
  let date = new Date(year, 0, 1);
  return months.map(i => _dates.default.month(date, i));
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

  let months = monthsInYear(_dates.default.year(focusedItem));
  return /*#__PURE__*/_react.default.createElement(_CalendarView.default, _extends({}, props, {
    focusedItem: focusedItem
  }), /*#__PURE__*/_react.default.createElement(_CalendarView.default.Body, null, (0, _.chunk)(months, 4).map((row, rowIdx) => /*#__PURE__*/_react.default.createElement(_CalendarView.default.Row, {
    key: rowIdx
  }, row.map((date, colIdx) => {
    let label = localizer.formatDate(date, 'header');
    return /*#__PURE__*/_react.default.createElement(_CalendarView.default.Cell, {
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

var _default = YearView;
exports.default = _default;