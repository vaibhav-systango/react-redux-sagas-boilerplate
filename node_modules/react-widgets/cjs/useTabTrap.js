"use strict";

exports.__esModule = true;
exports.default = useTabTrap;

var _react = require("react");

var _useEventListener = _interopRequireDefault(require("@restart/hooks/useEventListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultSelector = ['input', 'textarea', 'select', 'button:not([tabindex="-1"])', '[tabindex="0"]'].join(',');

const getDocument = () => document;

function useTabTrap(ref, selector = defaultSelector) {
  const startedRef = (0, _react.useRef)(false);
  (0, _useEventListener.default)(getDocument, 'keydown', event => {
    if (!startedRef.current || !ref.current || event.key !== 'Tab') {
      return;
    }

    const tabbables = ref.current.querySelectorAll(selector);

    if (event.shiftKey && event.target === tabbables[0]) {
      tabbables[tabbables.length - 1].focus();
      event.preventDefault();
    } else if (!event.shiftKey && event.target === tabbables[tabbables.length - 1] || !ref.current.contains(event.target)) {
      tabbables[0].focus();
      event.preventDefault();
    }
  });
  return (0, _react.useMemo)(() => ({
    focus() {
      const tabbables = ref.current.querySelectorAll(selector);
      const first = tabbables[0];
      if (first) first.focus();
    },

    start() {
      startedRef.current = true;
    },

    stop() {
      startedRef.current = false;
    }

  }), [ref, selector]);
}