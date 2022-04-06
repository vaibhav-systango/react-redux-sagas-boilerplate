"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _dates = _interopRequireDefault(require("./dates"));

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function clamp(date, min, max) {
  return _dates.default.max(_dates.default.min(date, max), min);
}

function CalendarView({
  className,
  focusedItem,
  onKeyDown,
  children,
  'aria-labelledby': labelledby
}) {
  const ref = (0, _react.useRef)(null);
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref);
  (0, _react.useEffect)(() => {
    var _node$querySelector;

    const node = ref.current;
    if (!node || !focused) return;
    (_node$querySelector = node.querySelector('.rw-cell[tabindex]')) == null ? void 0 : _node$querySelector.focus();
  }, [focusedItem, focused, ref]);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    role: "grid",
    ref: ref,
    tabIndex: -1
  }, focusEvents, {
    onKeyDown: onKeyDown,
    "aria-labelledby": labelledby,
    className: (0, _classnames.default)(className, 'rw-nav-view', 'rw-calendar-grid')
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
  const isEqual = nextDate => _dates.default.eq(date, nextDate, unit);

  const isEmpty = !_dates.default.inRange(date, min, max, unit);
  const isDisabled = disabled || isEmpty; // const isNow = now && isEqual(now)

  const isFocused = !disabled && !isEmpty && isEqual(focusedItem);
  const isSelected = selected && isEqual(selected);

  const isOffView = date && focusedItem && viewUnit && _dates.default[viewUnit](date) !== _dates.default[viewUnit](focusedItem);

  const handleChange = () => {
    onChange(clamp(date, min, max));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    role: "gridcell",
    title: label,
    "aria-label": label,
    "aria-readonly": disabled,
    "aria-selected": Boolean(isSelected),
    tabIndex: isFocused ? 0 : void 0,
    onClick: !isDisabled ? handleChange : undefined,
    className: (0, _classnames.default)('rw-cell', // isNow && 'rw-now',
    isDisabled && 'rw-state-disabled', isEmpty && 'rw-cell-not-allowed', isOffView && 'rw-cell-off-range', isSelected && 'rw-state-selected')
  }, /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": true
  }, children));
}

CalendarView.Body = props => /*#__PURE__*/_react.default.createElement("div", _extends({
  role: "rowgroup",
  className: "rw-calendar-body"
}, props));

CalendarView.Row = props => /*#__PURE__*/_react.default.createElement("div", _extends({
  role: "row",
  className: "rw-calendar-row"
}, props));

CalendarView.Cell = CalendarViewCell;
var _default = CalendarView;
exports.default = _default;