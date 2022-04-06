const _excluded = ["id", "role", "dropUp", "className", "children", "open", "transition"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import React from 'react';
import SlideDownTransition from './SlideDownTransition';
export const StaticContainer = /*#__PURE__*/React.memo(({
  children
}) => children, (_, {
  shouldUpdate
}) => !shouldUpdate);
const Popup = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    id,
    role,
    dropUp,
    className,
    children,
    open = false,
    transition = SlideDownTransition
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const Transition = transition;
  return /*#__PURE__*/React.createElement(Transition, _extends({}, props, {
    in: open,
    dropUp: dropUp,
    timeout: undefined
    /**hack*/
    ,
    className: cn('rw-popup-container', className)
  }), /*#__PURE__*/React.createElement("div", {
    id: id,
    className: "rw-popup",
    ref: ref,
    role: role
  }, /*#__PURE__*/React.createElement(StaticContainer, {
    shouldUpdate: open
  }, children)));
});
Popup.displayName = 'Popup';
export default Popup;