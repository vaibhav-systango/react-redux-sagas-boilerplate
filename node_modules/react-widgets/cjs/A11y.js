"use strict";

exports.__esModule = true;
exports.useActiveDescendant = exports.setActiveDescendant = void 0;

var _react = require("react");

/**
 * Do a "hard" set on the aria, so that it's always announced
 * even if the id hasn't changed, this saves us from having to have a different id
 * per item.
 */
const setActiveDescendant = (ref, activeId) => {
  if (!ref) return;
  ref.removeAttribute('aria-activedescendant');
  if (activeId) ref.setAttribute('aria-activedescendant', activeId);
};

exports.setActiveDescendant = setActiveDescendant;

const useActiveDescendant = (ref, id, visible, deps) => {
  (0, _react.useEffect)(() => {
    setActiveDescendant(ref.current, visible ? id : ''); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, id, visible, ...deps]);
};

exports.useActiveDescendant = useActiveDescendant;