"use strict";

exports.__esModule = true;
exports.notify = notify;
exports.useFirstFocusedRender = useFirstFocusedRender;
exports.useInstanceId = void 0;

var _react = require("react");

let idCount = 0;

function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount);
}

function notify(handler, args) {
  // eslint-disable-next-line prefer-spread
  if (handler) handler.apply(null, args);
}

const useInstanceId = (otherId, suffix = '') => {
  const id = (0, _react.useRef)();
  if (!id.current) id.current = uniqueId('rw_');
  return (otherId || id.current) + suffix;
};
/**
 * Allows for defering popup rendering untill the widget is focused,
 * or has been opened (in order to not remove it suddenly on close)
 */


exports.useInstanceId = useInstanceId;

function useFirstFocusedRender(focused, open) {
  const ref = (0, _react.useRef)(false);
  return ref.current || (focused || !!open) && (ref.current = true);
}