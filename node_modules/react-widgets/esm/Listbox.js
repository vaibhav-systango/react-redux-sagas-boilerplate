const _excluded = ["defaultValue", "value", "onChange", "textField", "dataKey", "data", "onKeyDown", "disabled", "readOnly", "onBlur", "onFocus", "multiple"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable @typescript-eslint/no-empty-function */
import PropTypes from 'prop-types';
import cn from 'classnames';
import React, { useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';
import List, { useHandleSelect } from './List';
import { useFocusList, FocusListContext } from './FocusListContext';
import * as CustomPropTypes from './PropTypes';
import { makeArray } from './_';
import { useAccessors } from './Accessors';
import { notify } from './WidgetHelpers';
import useFocusManager from './useFocusManager';
import { useWidgetProps } from './Widget';
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

  /**
   * @example false
   */
  disabled: CustomPropTypes.disabled.acceptsArray,
  messages: PropTypes.shape({
    emptyList: PropTypes.func.isRequired
  })
};
const Listbox = /*#__PURE__*/React.forwardRef(function Listbox(_ref, _outerRef) {
  let {
    defaultValue,
    value: propsValue,
    onChange: propsOnChange,
    textField,
    dataKey,
    data,
    onKeyDown,
    disabled,
    readOnly,
    onBlur,
    onFocus,
    multiple
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const [value, onChange] = useUncontrolledProp(propsValue, defaultValue, propsOnChange);
  const accessors = useAccessors(textField, dataKey);
  const dataItems = useMemo(() => makeArray(value, multiple).map(item => accessors.findOrSelf(data, item)), [value, multiple, accessors, data]);
  const ref = useRef(null);
  const lastItemRef = useRef(dataItems[dataItems.length - 1]);
  const list = useFocusList({
    scope: ref,
    anchorItem: lastItemRef.current
  });
  const isDisabled = disabled === true;

  const handleChange = (dataItem, meta) => {
    if (isDisabled || readOnly) return;
    lastItemRef.current = meta.dataItem;
    onChange(dataItem, meta);
  };

  const handleSelect = useHandleSelect(!!multiple, dataItems, handleChange);
  const [focusEvents, focused] = useFocusManager(ref, {
    disabled: isDisabled,
    onBlur,
    onFocus
  }, {
    didHandle(focused) {
      if (!focused) {
        list.focus(undefined);
      } else {
        focus({
          preventScroll: true
        });
      }
    }

  });

  function focus(opts) {
    if (ref.current) ref.current.focus(opts);
  }

  const handleKeyDown = e => {
    if (isDisabled || readOnly) return;
    let {
      key,
      shiftKey
    } = e;
    notify(onKeyDown, [e]);
    if (e.defaultPrevented) return;

    if (key === 'End' && !shiftKey) {
      e.preventDefault();
      list.focus(list.last());
    } else if (key === 'Home' && !shiftKey) {
      e.preventDefault();
      list.focus(list.first());
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      if (list.getFocused()) handleSelect(list.getFocused(), e);
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      list.focus(list.next());
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      list.focus(list.prev());
    }
  };

  const widgetProps = useWidgetProps({
    focused,
    readOnly,
    disabled: isDisabled,
    className: cn(props.className, 'rw-listbox rw-widget-input rw-widget')
  });
  return /*#__PURE__*/React.createElement(FocusListContext.Provider, {
    value: list.context
  }, /*#__PURE__*/React.createElement(List, _extends({}, props, widgetProps, {
    disabled: disabled,
    tabIndex: isDisabled ? -1 : 0,
    data: data,
    elementRef: ref,
    value: dataItems,
    multiple: multiple,
    accessors: accessors
  }, focusEvents, {
    onChange: handleChange,
    onKeyDown: handleKeyDown
  })));
});
Listbox.displayName = 'Listbox';
Listbox.propTypes = propTypes;
export default Listbox;