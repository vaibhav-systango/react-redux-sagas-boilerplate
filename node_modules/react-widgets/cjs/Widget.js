"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useWidgetProps = useWidgetProps;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _useGlobalListener = _interopRequireDefault(require("@restart/hooks/useGlobalListener"));

const _excluded = ["className", "tabIndex", "focused", "open", "dropUp", "disabled", "readOnly", "autofilling"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useKeyboardNavigationCheck() {
  const [isNavigatingViaKeyboard, setIsNavigatingViaKeyboard] = (0, _react.useState)(false);
  (0, _useGlobalListener.default)('keydown', ({
    key
  }) => {
    if (key == ' ' || key === 'Tab' || key == 'Enter' || key && key.indexOf('Arrow') !== -1) {
      setIsNavigatingViaKeyboard(true);
    }
  }); // TODO: use pointerdown

  (0, _useGlobalListener.default)('mousedown', () => {
    setIsNavigatingViaKeyboard(false);
  });
  return isNavigatingViaKeyboard;
}

function useWidgetProps(props) {
  const tabIndex = props.tabIndex != null ? props.tabIndex : -1;
  const isKeyboardNavigating = useKeyboardNavigationCheck();
  return {
    tabIndex: tabIndex,
    'data-intent': isKeyboardNavigating ? 'keyboard' : 'mouse',
    className: (0, _classnames.default)(props.className, 'rw-widget', props.disabled && 'rw-state-disabled', props.readOnly && 'rw-state-readonly', props.focused && 'rw-state-focus', props.autofilling && 'rw-webkit-autofill', props.open && `rw-open${props.dropUp ? '-up' : ''}`)
  };
}

const Widget = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    className,
    tabIndex,
    focused,
    open,
    dropUp,
    disabled,
    readOnly,
    autofilling
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const widgetProps = useWidgetProps({
    className,
    tabIndex,
    focused,
    open,
    dropUp,
    disabled,
    readOnly,
    autofilling
  });
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: ref
  }, props, widgetProps));
});

Widget.displayName = 'Widget';
var _default = Widget;
exports.default = _default;