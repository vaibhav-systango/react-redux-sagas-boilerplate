"use strict";

exports.__esModule = true;
exports.default = exports.StaticContainer = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _SlideDownTransition = _interopRequireDefault(require("./SlideDownTransition"));

const _excluded = ["id", "role", "dropUp", "className", "children", "open", "transition"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const StaticContainer = /*#__PURE__*/_react.default.memo(({
  children
}) => children, (_, {
  shouldUpdate
}) => !shouldUpdate);

exports.StaticContainer = StaticContainer;

const Popup = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    id,
    role,
    dropUp,
    className,
    children,
    open = false,
    transition = _SlideDownTransition.default
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const Transition = transition;
  return /*#__PURE__*/_react.default.createElement(Transition, _extends({}, props, {
    in: open,
    dropUp: dropUp,
    timeout: undefined
    /**hack*/
    ,
    className: (0, _classnames.default)('rw-popup-container', className)
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: "rw-popup",
    ref: ref,
    role: role
  }, /*#__PURE__*/_react.default.createElement(StaticContainer, {
    shouldUpdate: open
  }, children)));
});

Popup.displayName = 'Popup';
var _default = Popup;
exports.default = _default;