"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CalendarButton = _interopRequireDefault(require("./CalendarButton"));

var _Icon = require("./Icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CalendarHeader({
  localizer,
  label,
  labelId,
  onMoveRight,
  onMoveToday,
  onMoveLeft,
  onViewChange,
  prevDisabled,
  todayDisabled,
  upDisabled,
  nextDisabled,
  navigatePrevIcon = _Icon.chevronLeft,
  navigateNextIcon = _Icon.chevronRight
}) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rw-calendar-header"
  }, /*#__PURE__*/_react.default.createElement(_CalendarButton.default, {
    id: labelId,
    onClick: onViewChange,
    className: "rw-calendar-btn-view",
    disabled: upDisabled,
    "aria-live": "polite",
    "aria-atomic": "true"
  }, label, " ", _Icon.caretDown), /*#__PURE__*/_react.default.createElement(_CalendarButton.default, {
    className: "rw-calendar-btn-left",
    onClick: onMoveLeft,
    disabled: prevDisabled,
    label: localizer.messages.moveBack(),
    icon: navigatePrevIcon
  }), /*#__PURE__*/_react.default.createElement(_CalendarButton.default, {
    className: "rw-calendar-btn-today",
    disabled: todayDisabled,
    onClick: onMoveToday
  }, localizer.messages.moveToday()), /*#__PURE__*/_react.default.createElement(_CalendarButton.default, {
    className: "rw-calendar-btn-right",
    onClick: onMoveRight,
    disabled: nextDisabled,
    label: localizer.messages.moveForward(),
    icon: navigateNextIcon
  }));
}

var _default = CalendarHeader;
exports.default = _default;