const _excluded = ["className", "tabIndex", "focused", "open", "dropUp", "disabled", "readOnly", "autofilling"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import React, { useState } from 'react';
import useGlobalListener from '@restart/hooks/useGlobalListener';

function useKeyboardNavigationCheck() {
  const [isNavigatingViaKeyboard, setIsNavigatingViaKeyboard] = useState(false);
  useGlobalListener('keydown', ({
    key
  }) => {
    if (key == ' ' || key === 'Tab' || key == 'Enter' || key && key.indexOf('Arrow') !== -1) {
      setIsNavigatingViaKeyboard(true);
    }
  }); // TODO: use pointerdown

  useGlobalListener('mousedown', () => {
    setIsNavigatingViaKeyboard(false);
  });
  return isNavigatingViaKeyboard;
}

export function useWidgetProps(props) {
  const tabIndex = props.tabIndex != null ? props.tabIndex : -1;
  const isKeyboardNavigating = useKeyboardNavigationCheck();
  return {
    tabIndex: tabIndex,
    'data-intent': isKeyboardNavigating ? 'keyboard' : 'mouse',
    className: cn(props.className, 'rw-widget', props.disabled && 'rw-state-disabled', props.readOnly && 'rw-state-readonly', props.focused && 'rw-state-focus', props.autofilling && 'rw-webkit-autofill', props.open && `rw-open${props.dropUp ? '-up' : ''}`)
  };
}
const Widget = /*#__PURE__*/React.forwardRef((_ref, ref) => {
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
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref
  }, props, widgetProps));
});
Widget.displayName = 'Widget';
export default Widget;