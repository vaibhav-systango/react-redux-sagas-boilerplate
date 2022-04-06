"use strict";

exports.__esModule = true;
exports.useFocusList = exports.FocusListContext = void 0;
exports.useListOption = useListOption;

var _querySelectorAll = _interopRequireDefault(require("dom-helpers/querySelectorAll"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react-hooks/exhaustive-deps */
const FocusListContext = /*#__PURE__*/_react.default.createContext(null);

exports.FocusListContext = FocusListContext;
const defaultOpts = {
  behavior: 'stop'
};

function useListOption(dataItem) {
  const ctx = (0, _react.useContext)(FocusListContext);
  const prevElement = (0, _react.useRef)(null); // this is a bit convoluted because we want to use a ref object, a callback ref
  // causes an extra render which is fine except that it means the list hook for
  // anchor items fires before elements are processed

  const ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(() => () => {
    ctx == null ? void 0 : ctx.map.delete(ref.current);
  }, []);
  (0, _react.useLayoutEffect)(() => {
    if (prevElement.current !== ref.current) {
      ctx == null ? void 0 : ctx.map.delete(prevElement.current);
    }

    prevElement.current = ref.current;

    if (ref.current && (ctx == null ? void 0 : ctx.map.get(ref.current)) !== dataItem) {
      ctx == null ? void 0 : ctx.map.set(ref.current, dataItem);
    }
  });
  const focused = dataItem === (ctx == null ? void 0 : ctx.focusedItem);
  return [ref, focused, focused ? ctx == null ? void 0 : ctx.activeId : undefined];
}

const useFocusList = ({
  scope: listRef,
  anchorItem,
  focusFirstItem: _focusFirstItem = false,
  scopeSelector: _scopeSelector = '',
  activeId
}) => {
  const map = (0, _react.useMemo)(() => new WeakMap(), []);
  const [focusedItem, setFocusedItem] = (0, _react.useState)();
  const itemSelector = `${_scopeSelector} [data-rw-focusable]`.trim();

  const get = () => {
    const items = (0, _querySelectorAll.default)(listRef.current, itemSelector);
    return [items, items.find(e => e.dataset.rwFocused === '')];
  };

  const list = (0, _react.useMemo)(() => {
    return {
      size() {
        const [items] = get();
        return items.length;
      },

      get,
      toDataItem: el => map.get(el),

      first() {
        const [[first]] = get();
        return first;
      },

      focus(el) {
        if (!el || map.has(el)) setFocusedItem(el ? map.get(el) : undefined);
      },

      last() {
        const [items] = get();
        return items[items.length - 1];
      },

      next({
        behavior
      } = defaultOpts) {
        const [items, focusedItem] = get();
        let nextIdx = items.indexOf(focusedItem) + 1;

        if (nextIdx >= items.length) {
          if (behavior === 'loop') return items[0];
          if (behavior === 'clear') return undefined;
          return focusedItem;
        }

        return items[nextIdx];
      },

      prev({
        behavior
      } = defaultOpts) {
        const [items, focusedItem] = get();
        let nextIdx = Math.max(0, items.indexOf(focusedItem)) - 1;

        if (nextIdx < 0) {
          if (behavior === 'loop') return items[items.length - 1];
          if (behavior === 'clear') return undefined;
          return focusedItem;
        }

        return items[nextIdx];
      }

    };
  }, []);
  (0, _react.useLayoutEffect)(() => {
    if (!anchorItem) {
      list.focus(null);
      return;
    }

    const element = get()[0].find(el => list.toDataItem(el) === anchorItem);
    list.focus(element);
  }, [anchorItem]);
  (0, _react.useLayoutEffect)(() => {
    if (!listRef.current) return;
    const [, focusedElement] = get();
    const hasItem = focusedElement != null;

    if (!hasItem && _focusFirstItem || hasItem && !listRef.current.contains(focusedElement)) {
      if (_focusFirstItem) list.focus(list.first());else list.focus(null);
    }
  });
  const context = (0, _react.useMemo)(() => ({
    map,
    focusedItem,
    activeId
  }), [focusedItem, activeId]);
  list.context = context;
  list.getFocused = (0, _react.useCallback)(() => focusedItem, [focusedItem]);

  list.hasFocused = () => focusedItem !== undefined;

  return list;
};

exports.useFocusList = useFocusList;