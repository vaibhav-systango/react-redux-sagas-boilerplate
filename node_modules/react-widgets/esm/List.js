const _excluded = ["multiple", "data", "value", "onChange", "accessors", "className", "messages", "disabled", "renderItem", "renderGroup", "searchTerm", "groupBy", "elementRef", "optionComponent", "renderList"];

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable @typescript-eslint/no-empty-function */
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useImperativeHandle, useMemo } from 'react';
import ListOption from './ListOption';
import ListOptionGroup from './ListOptionGroup';
import { useMessagesWithDefaults } from './messages'; // import { WidgetHTMLProps } from './shared'

import * as CustomPropTypes from './PropTypes';
import { groupBySortedKeys, makeArray, toItemArray } from './_';
import { useInstanceId } from './WidgetHelpers';
import useMutationObserver from '@restart/hooks/useMutationObserver';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useMergedRefs from '@restart/hooks/useMergedRefs';
const whitelist = ['style', 'className', 'role', 'id', 'autocomplete', 'size', 'tabIndex', 'maxLength', 'name'];
const whitelistRegex = [/^aria-/, /^data-/, /^on[A-Z]\w+/];

function pickElementProps(props) {
  const result = {};
  Object.keys(props).forEach(key => {
    if (whitelist.indexOf(key) !== -1 || whitelistRegex.some(r => !!key.match(r))) result[key] = props[key];
  });
  return result;
}

const propTypes = {
  data: PropTypes.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  onSelect: PropTypes.func,
  onMove: PropTypes.func,
  onHoverOption: PropTypes.func,
  optionComponent: PropTypes.elementType,
  renderItem: PropTypes.func,
  renderGroup: PropTypes.func,
  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string,
  disabled: CustomPropTypes.disabled.acceptsArray,
  messages: PropTypes.shape({
    emptyList: PropTypes.func.isRequired
  })
};
export const useScrollFocusedIntoView = (element, observeChanges = false) => {
  const scrollIntoView = useCallback(() => {
    if (!element) return;
    let selectedItem = element.querySelector('[data-rw-focused]');

    if (selectedItem && selectedItem.scrollIntoView) {
      selectedItem.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [element]);
  useMutationObserver(observeChanges ? element : null, {
    subtree: true,
    attributes: true,
    attributeFilter: ['data-rw-focused']
  }, scrollIntoView);
  return scrollIntoView;
};
export function useHandleSelect(multiple, dataItems, onChange) {
  return (dataItem, event) => {
    if (multiple === false) {
      onChange(dataItem, {
        dataItem,
        lastValue: dataItems[0],
        originalEvent: event
      });
      return;
    }

    const checked = dataItems.includes(dataItem);
    onChange(checked ? dataItems.filter(d => d !== dataItem) : [...dataItems, dataItem], {
      dataItem,
      lastValue: dataItems,
      action: checked ? 'remove' : 'insert',
      originalEvent: event
    });
  };
}
const List = /*#__PURE__*/React.forwardRef(function List(_ref, outerRef) {
  var _elementProps$role;

  let {
    multiple = false,
    data = [],
    value,
    onChange,
    accessors,
    className,
    messages,
    disabled,
    renderItem,
    renderGroup,
    searchTerm,
    groupBy,
    elementRef,
    optionComponent: Option = ListOption,
    renderList
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const id = useInstanceId();
  const dataItems = makeArray(value, multiple);
  const groupedData = useMemo(() => groupBy ? groupBySortedKeys(groupBy, data) : undefined, [data, groupBy]);
  const [element, ref] = useCallbackRef();
  const disabledItems = toItemArray(disabled);
  const {
    emptyList
  } = useMessagesWithDefaults(messages);
  const divRef = useMergedRefs(ref, elementRef);
  const handleSelect = useHandleSelect(multiple, dataItems, onChange);
  const scrollIntoView = useScrollFocusedIntoView(element, true);
  let elementProps = pickElementProps(props);
  useImperativeHandle(outerRef, () => ({
    scrollIntoView
  }), [scrollIntoView]);

  function renderOption(item, idx) {
    const textValue = accessors.text(item);
    const itemIsDisabled = disabledItems.includes(item);
    const itemIsSelected = dataItems.includes(item);
    return /*#__PURE__*/React.createElement(Option, {
      dataItem: item,
      key: `item_${idx}`,
      searchTerm: searchTerm,
      onSelect: handleSelect,
      disabled: itemIsDisabled,
      selected: itemIsSelected
    }, renderItem ? renderItem({
      item,
      searchTerm,
      index: idx,
      text: textValue,
      // TODO: probably remove
      value: accessors.value(item),
      disabled: itemIsDisabled
    }) : textValue);
  }

  const items = groupedData ? groupedData.map(([group, items], idx) => /*#__PURE__*/React.createElement("div", {
    role: "group",
    key: `group_${idx}`
  }, /*#__PURE__*/React.createElement(ListOptionGroup, null, renderGroup ? renderGroup({
    group
  }) : group), items.map(renderOption))) : data.map(renderOption);
  const rootProps = Object.assign({
    id,
    tabIndex: 0,
    ref: divRef
  }, elementProps, {
    'aria-multiselectable': !!multiple,
    className: cn(className, 'rw-list'),
    role: (_elementProps$role = elementProps.role) != null ? _elementProps$role : 'listbox',
    children: React.Children.count(items) ? items : /*#__PURE__*/React.createElement("div", {
      className: "rw-list-empty"
    }, emptyList())
  });
  return renderList ? renderList(rootProps) : /*#__PURE__*/React.createElement("div", rootProps);
});
List.displayName = 'List';
List.propTypes = propTypes;
export default List;