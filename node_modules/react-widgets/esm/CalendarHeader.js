import React from 'react';
import CalendarButton from './CalendarButton';
import { caretDown, chevronLeft, chevronRight } from './Icon';

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
  navigatePrevIcon = chevronLeft,
  navigateNextIcon = chevronRight
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rw-calendar-header"
  }, /*#__PURE__*/React.createElement(CalendarButton, {
    id: labelId,
    onClick: onViewChange,
    className: "rw-calendar-btn-view",
    disabled: upDisabled,
    "aria-live": "polite",
    "aria-atomic": "true"
  }, label, " ", caretDown), /*#__PURE__*/React.createElement(CalendarButton, {
    className: "rw-calendar-btn-left",
    onClick: onMoveLeft,
    disabled: prevDisabled,
    label: localizer.messages.moveBack(),
    icon: navigatePrevIcon
  }), /*#__PURE__*/React.createElement(CalendarButton, {
    className: "rw-calendar-btn-today",
    disabled: todayDisabled,
    onClick: onMoveToday
  }, localizer.messages.moveToday()), /*#__PURE__*/React.createElement(CalendarButton, {
    className: "rw-calendar-btn-right",
    onClick: onMoveRight,
    disabled: nextDisabled,
    label: localizer.messages.moveForward(),
    icon: navigateNextIcon
  }));
}

export default CalendarHeader;