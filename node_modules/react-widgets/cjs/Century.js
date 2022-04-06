"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CalendarView = _interopRequireDefault(require("./CalendarView"));

var _ = require("./_");

var _dates = _interopRequireDefault(require("./dates"));

const _excluded = ["focusedItem", "disabled", "onChange", "value", "localizer", "min", "max"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CenturyView(_ref) {
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

  const chunks = (0, _react.useMemo)(() => (0, _.chunk)(getCenturyDecades(focusedItem), 4), [focusedItem]);
  return /*#__PURE__*/_react.default.createElement(_CalendarView.default, _extends({}, props, {
    focusedItem: focusedItem
  }), /*#__PURE__*/_react.default.createElement(_CalendarView.default.Body, null, chunks.map((row, rowIdx) => /*#__PURE__*/_react.default.createElement(_CalendarView.default.Row, {
    key: rowIdx
  }, row.map((date, colIdx) => {
    let label = localizer.formatDate(_dates.default.startOf(date, 'decade'), 'decade');
    return /*#__PURE__*/_react.default.createElement(_CalendarView.default.Cell, {
      key: colIdx,
      unit: "decade",
      viewUnit: "century",
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

function getCenturyDecades(_date) {
  let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let date = _dates.default.add(_dates.default.startOf(_date, 'century'), -20, 'year');

  return days.map(() => date = _dates.default.add(date, 10, 'year'));
}

var _default = CenturyView;
exports.default = _default;