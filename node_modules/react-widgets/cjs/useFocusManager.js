"use strict";

exports.__esModule = true;
exports.default = useFocusManager;

var _react = require("react");

var _useFocusManager = _interopRequireDefault(require("@restart/hooks/useFocusManager"));

var _useEventCallback = _interopRequireDefault(require("@restart/hooks/useEventCallback"));

var _useMounted = _interopRequireDefault(require("@restart/hooks/useMounted"));

var _matches = _interopRequireDefault(require("dom-helpers/matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isInDisabledFieldset = node => {
  return !!node && (0, _matches.default)(node, 'fieldset[disabled] *');
};

function useFocusManager(ref, props = {}, opts = {}) {
  const isMounted = (0, _useMounted.default)();
  const [focused, setFocus] = (0, _react.useState)(false);
  const isDisabled = (0, _useEventCallback.default)(() => props.disabled === true || isInDisabledFieldset(ref.current));
  const events = (0, _useFocusManager.default)(Object.assign({}, opts, {
    isDisabled,
    onChange: focused => {
      if (isMounted()) setFocus(focused);
    },

    didHandle(focused, event) {
      let handler = props[focused ? 'onFocus' : 'onBlur'];
      if (handler) handler(event); // @ts-ignore used by work

      if (opts.didHandle && !event.isWidgetDefaultPrevented) opts.didHandle(focused, event);
    }

  }));
  return [events, focused, setFocus];
}