/* eslint-disable react-hooks/exhaustive-deps */
import querySelectorAll from 'dom-helpers/querySelectorAll';
import React, { useCallback, useContext, useLayoutEffect, useMemo, useState, useRef } from 'react';
export const FocusListContext = /*#__PURE__*/React.createContext(null);
const defaultOpts = {
  behavior: 'stop'
};
export function useListOption(dataItem) {
  const ctx = useContext(FocusListContext);
  const prevElement = useRef(null); // this is a bit convoluted because we want to use a ref object, a callback ref
  // causes an extra render which is fine except that it means the list hook for
  // anchor items fires before elements are processed

  const ref = useRef(null);
  useLayoutEffect(() => () => {
    ctx == null ? void 0 : ctx.map.delete(ref.current);
  }, []);
  useLayoutEffect(() => {
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
export const useFocusList = ({
  scope: listRef,
  anchorItem,
  focusFirstItem: _focusFirstItem = false,
  scopeSelector: _scopeSelector = '',
  activeId
}) => {
  const map = useMemo(() => new WeakMap(), []);
  const [focusedItem, setFocusedItem] = useState();
  const itemSelector = `${_scopeSelector} [data-rw-focusable]`.trim();

  const get = () => {
    const items = querySelectorAll(listRef.current, itemSelector);
    return [items, items.find(e => e.dataset.rwFocused === '')];
  };

  const list = useMemo(() => {
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
  useLayoutEffect(() => {
    if (!anchorItem) {
      list.focus(null);
      return;
    }

    const element = get()[0].find(el => list.toDataItem(el) === anchorItem);
    list.focus(element);
  }, [anchorItem]);
  useLayoutEffect(() => {
    if (!listRef.current) return;
    const [, focusedElement] = get();
    const hasItem = focusedElement != null;

    if (!hasItem && _focusFirstItem || hasItem && !listRef.current.contains(focusedElement)) {
      if (_focusFirstItem) list.focus(list.first());else list.focus(null);
    }
  });
  const context = useMemo(() => ({
    map,
    focusedItem,
    activeId
  }), [focusedItem, activeId]);
  list.context = context;
  list.getFocused = useCallback(() => focusedItem, [focusedItem]);

  list.hasFocused = () => focusedItem !== undefined;

  return list;
};