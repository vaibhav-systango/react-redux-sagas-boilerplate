const _excluded = ["dataKey", "textField", "autoFocus", "id", "value", "defaultValue", "onChange", "open", "defaultOpen", "onToggle", "focusFirstItem", "searchTerm", "defaultSearchTerm", "onSearch", "filter", "allowCreate", "className", "containerClassName", "placeholder", "busy", "disabled", "readOnly", "selectIcon", "clearTagIcon", "busySpinner", "dropUp", "tabIndex", "popupTransition", "showPlaceholderWithValues", "showSelectedItemsInList", "onSelect", "onCreate", "onKeyDown", "onBlur", "onFocus", "inputProps", "listProps", "popupProps", "renderListItem", "renderListGroup", "renderTagValue", "optionComponent", "tagOptionComponent", "groupBy", "listComponent", "popupComponent", "tagListComponent", "data", "messages"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import closest from 'dom-helpers/closest';
import PropTypes from 'prop-types';
import React, { useImperativeHandle, useMemo, useRef, useEffect } from 'react';
import { useUncontrolledProp } from 'uncontrollable';
import AddToListOption, { CREATE_OPTION } from './AddToListOption';
import { times } from './Icon';
import List from './List';
import { FocusListContext, useFocusList } from './FocusListContext';
import MultiselectInput from './MultiselectInput';
import MultiselectTagList from './MultiselectTagList';
import BasePopup from './Popup';
import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import { useMessagesWithDefaults } from './messages';
import { setActiveDescendant } from './A11y';
import { useFilteredData } from './Filter';
import * as CustomPropTypes from './PropTypes';
import canShowCreate from './canShowCreate';
import { useAccessors } from './Accessors';
import useDropdownToggle from './useDropdownToggle';
import useFocusManager from './useFocusManager';
import { notify, useFirstFocusedRender, useInstanceId } from './WidgetHelpers';
import DropdownCaret from './PickerCaret';
const ENTER = 13;
const INSERT = 'insert';
const REMOVE = 'remove';
let propTypes = {
  data: PropTypes.array,
  //-- controlled props --
  value: PropTypes.array,

  /**
   * @type {function (
   *  dataItems: ?any[],
   *  metadata: {
   *    dataItem: any,
   *    action: 'insert' | 'remove',
   *    originalEvent: SyntheticEvent,
   *    lastValue: ?any[],
   *    searchTerm: ?string
   *  }
   * ): void}
   */
  onChange: PropTypes.func,
  searchTerm: PropTypes.string,

  /**
   * @type {function (
   *  searchTerm: ?string,
   *  metadata: {
   *    action: 'clear' | 'input',
   *    lastSearchTerm: ?string,
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onSearch: PropTypes.func,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  //-------------------------------------------
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  renderTagValue: PropTypes.func,
  renderListItem: PropTypes.func,
  renderListGroup: PropTypes.func,
  groupBy: CustomPropTypes.accessor,
  allowCreate: PropTypes.oneOf([true, false, 'onFilter']),

  /**
   *
   * @type { (dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void }
   */
  onSelect: PropTypes.func,

  /**
   * @type { (searchTerm: string) => void }
   */
  onCreate: PropTypes.func,
  busy: PropTypes.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: PropTypes.node,

  /** Specify the element used to render tag clear icons. */
  clearTagIcon: PropTypes.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: PropTypes.node,
  dropUp: PropTypes.bool,
  popupTransition: PropTypes.elementType,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,
  inputProps: PropTypes.object,
  listProps: PropTypes.object,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,

  /** Continue to show the input placeholder even if tags are selected */
  showPlaceholderWithValues: PropTypes.bool,

  /** Continue to show the selected items in the dropdown list */
  showSelectedItemsInList: PropTypes.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  messages: PropTypes.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createOption: CustomPropTypes.message,
    tagsLabel: CustomPropTypes.message,
    selectedItems: CustomPropTypes.message,
    noneSelected: CustomPropTypes.message,
    removeLabel: CustomPropTypes.message
  })
};
const EMPTY_ARRAY = [];

function useMultiselectData(value = EMPTY_ARRAY, data, accessors, filter, searchTerm, showSelectedItemsInList) {
  data = useMemo(() => showSelectedItemsInList ? data : data.filter(i => !value.some(v => accessors.matches(i, v))), [data, showSelectedItemsInList, value, accessors]);
  return [useFilteredData(data, filter || false, searchTerm, accessors.text), data.length];
}

/**
 * ---
 * shortcuts:
 *   - { key: left arrow, label: move focus to previous tag }
 *   - { key: right arrow, label: move focus to next tag }
 *   - { key: delete, deselect focused tag }
 *   - { key: backspace, deselect next tag }
 *   - { key: alt + up arrow, label: close Multiselect }
 *   - { key: down arrow, label: open Multiselect, and move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new tag from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A select listbox alternative.
 *
 * @public
 */
const Multiselect = /*#__PURE__*/React.forwardRef(function Multiselect(_ref, outerRef) {
  let {
    dataKey,
    textField,
    autoFocus,
    id,
    value,
    defaultValue = [],
    onChange,
    open,
    defaultOpen = false,
    onToggle,
    focusFirstItem = false,
    searchTerm,
    defaultSearchTerm = '',
    onSearch,
    filter = 'startsWith',
    allowCreate = false,
    className,
    containerClassName,
    placeholder,
    busy,
    disabled,
    readOnly,
    selectIcon,
    clearTagIcon = times,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    showPlaceholderWithValues = false,
    showSelectedItemsInList = false,
    onSelect,
    onCreate,
    onKeyDown,
    onBlur,
    onFocus,
    inputProps,
    listProps,
    popupProps,
    renderListItem,
    renderListGroup,
    renderTagValue,
    optionComponent,
    tagOptionComponent,
    groupBy,
    listComponent: ListComponent = List,
    popupComponent: Popup = BasePopup,
    tagListComponent: TagList = MultiselectTagList,
    data: rawData = [],
    messages: userMessages
  } = _ref,
      elementProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  let [currentValue, handleChange] = useUncontrolledProp(value, defaultValue, onChange);
  const [currentOpen, handleOpen] = useUncontrolledProp(open, defaultOpen, onToggle);
  const [currentSearch, handleSearch] = useUncontrolledProp(searchTerm, defaultSearchTerm, onSearch);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const inputId = useInstanceId(id, '_input');
  const tagsId = useInstanceId(id, '_taglist');
  const listId = useInstanceId(id, '_listbox');
  const createId = useInstanceId(id, '_createlist_option');
  const activeTagId = useInstanceId(id, '_taglist_active_tag');
  const activeOptionId = useInstanceId(id, '_listbox_active_option');
  const accessors = useAccessors(textField, dataKey);
  const messages = useMessagesWithDefaults(userMessages);
  const toggle = useDropdownToggle(currentOpen, handleOpen);
  const isDisabled = disabled === true;
  const isReadOnly = !!readOnly;
  const [focusEvents, focused] = useFocusManager(ref, {
    disabled: isDisabled,
    onBlur,
    onFocus
  }, {
    didHandle(focused, event) {
      if (focused) return focus();
      toggle.close();
      clearSearch(event);
      tagList.focus(null);
    }

  });
  const dataItems = useMemo(() => currentValue.map(item => accessors.findOrSelf(rawData, item)), [rawData, currentValue, accessors]);
  const [data, lengthWithoutValues] = useMultiselectData(dataItems, rawData, accessors, currentOpen ? filter : false, currentSearch, showSelectedItemsInList);
  const list = useFocusList({
    scope: ref,
    scopeSelector: '.rw-popup',
    focusFirstItem,
    activeId: activeOptionId,
    anchorItem: currentOpen ? dataItems[dataItems.length - 1] : undefined
  });
  const tagList = useFocusList({
    scope: ref,
    scopeSelector: '.rw-multiselect-taglist',
    activeId: activeTagId
  });
  const showCreateOption = canShowCreate(allowCreate, {
    searchTerm: currentSearch,
    data,
    dataItems,
    accessors
  });
  /**
   * Update aria when it changes on update
   */

  const focusedTag = tagList.getFocused();
  useEffect(() => {
    if (currentOpen) return;
    setActiveDescendant(inputRef.current, focusedTag ? activeTagId : '');
  }, [activeTagId, currentOpen, focusedTag]);
  const focusedItem = list.getFocused();
  useEffect(() => {
    if (!currentOpen) return; // if (focusedItem) tagList.focus(null)

    setActiveDescendant(inputRef.current, focusedItem ? activeOptionId : '');
  }, [activeOptionId, currentOpen, focusedItem]);
  /**
   * Event Handlers
   */

  const handleDelete = (dataItem, event) => {
    if (isDisabled || readOnly || tagList.size() === 0) return;
    focus();
    change(dataItem, event, REMOVE);
  };

  const deletingRef = useRef(false);

  const handleSearchKeyDown = e => {
    if (e.key === 'Backspace' && e.currentTarget.value && !deletingRef.current) deletingRef.current = true;
  };

  const handleSearchKeyUp = e => {
    if (e.key === 'Backspace' && deletingRef.current) {
      deletingRef.current = false;
    }
  };

  const handleInputChange = e => {
    search(e.target.value, e, 'input');
    toggle.open();
  };

  const handleClick = e => {
    if (isDisabled || readOnly) return; // prevents double clicks when in a <label>

    e.preventDefault();
    focus();

    if (closest(e.target, '.rw-select') && currentOpen) {
      toggle.close();
    } else toggle.open();
  };

  const handleDoubleClick = () => {
    if (isDisabled || !inputRef.current) return;
    focus();
    if (inputRef.current) inputRef.current.select();
  };

  const handleSelect = (dataItem, originalEvent) => {
    if (dataItem === undefined) return;
    originalEvent.preventDefault();

    if (dataItem === CREATE_OPTION) {
      handleCreate(originalEvent);
      return;
    }

    notify(onSelect, [dataItem, {
      originalEvent
    }]);

    if (!showSelectedItemsInList || !dataItems.includes(dataItem)) {
      change(dataItem, originalEvent, INSERT);
    } else {
      change(dataItem, originalEvent, REMOVE);
    }

    focus();
  };

  const handleCreate = event => {
    notify(onCreate, [currentSearch]);
    clearSearch(event);
    focus();
  };

  const handleKeyDown = event => {
    if (readOnly) {
      event.preventDefault();
      return;
    }

    let {
      key,
      keyCode,
      altKey,
      ctrlKey
    } = event;
    notify(onKeyDown, [event]);
    if (event.defaultPrevented) return;

    if (key === 'ArrowDown') {
      event.preventDefault();

      if (!currentOpen) {
        toggle.open();
        return;
      }

      list.focus(list.next());
      tagList.focus(null);
    } else if (key === 'ArrowUp' && (currentOpen || altKey)) {
      event.preventDefault();

      if (altKey) {
        toggle.close();
        return;
      }

      list.focus(list.prev());
      tagList.focus(null);
    } else if (key === 'End') {
      event.preventDefault();

      if (currentOpen) {
        list.focus(list.last());
        tagList.focus(null);
      } else {
        tagList.focus(tagList.last());
        list.focus(null);
      }
    } else if (key === 'Home') {
      event.preventDefault();
      if (currentOpen) list.focus(list.first());else list.focus(tagList.first());
    } else if (currentOpen && keyCode === ENTER) {
      // using keyCode to ignore enter for japanese IME
      event.preventDefault();

      if (ctrlKey && showCreateOption) {
        return handleCreate(event);
      }

      handleSelect(list.getFocused(), event);
    } else if (key === 'Escape') {
      if (currentOpen) toggle.close();else tagList.focus(null); //
    } else if (!currentSearch && !deletingRef.current) {
      //
      if (key === 'ArrowLeft') {
        tagList.focus(tagList.prev({
          behavior: 'loop'
        }));
      } else if (key === 'ArrowRight') {
        tagList.focus(tagList.next({
          behavior: 'loop'
        })); //
      } else if (key === 'Delete' && tagList.getFocused()) {
        handleDelete(tagList.getFocused(), event); //
      } else if (key === 'Backspace') {
        handleDelete(tagList.toDataItem(tagList.last()), event);
      } else if (key === ' ' && !currentOpen) {
        event.preventDefault();
        toggle.open();
      }
    }
  };
  /**
   * Methods
   */


  function change(dataItem, originalEvent, action) {
    let nextDataItems = dataItems;

    switch (action) {
      case INSERT:
        nextDataItems = nextDataItems.concat(dataItem);
        break;

      case REMOVE:
        nextDataItems = nextDataItems.filter(d => d !== dataItem);
        break;
    }

    handleChange(nextDataItems, {
      action,
      dataItem,
      originalEvent,
      searchTerm: currentSearch,
      lastValue: currentValue
    });
    clearSearch(originalEvent);
  }

  function clearSearch(originalEvent) {
    search('', originalEvent, 'clear');
  }

  function search(nextSearchTerm, originalEvent, action = 'input') {
    if (nextSearchTerm !== currentSearch) handleSearch(nextSearchTerm, {
      action,
      originalEvent,
      lastSearchTerm: currentSearch
    });
  }

  function focus() {
    if (inputRef.current) inputRef.current.focus();
  }
  /**
   * Render
   */


  useImperativeHandle(outerRef, () => ({
    focus
  }));
  let shouldRenderPopup = useFirstFocusedRender(focused, currentOpen);
  let shouldRenderTags = !!dataItems.length;
  let inputOwns = `${listId} ` + (shouldRenderTags ? tagsId : '') + (showCreateOption ? createId : '');
  return /*#__PURE__*/React.createElement(Widget, _extends({}, elementProps, {
    ref: ref,
    open: currentOpen,
    dropUp: dropUp,
    focused: focused,
    disabled: isDisabled,
    readOnly: isReadOnly,
    onKeyDown: handleKeyDown
  }, focusEvents, {
    className: cn(className, 'rw-multiselect')
  }), /*#__PURE__*/React.createElement(WidgetPicker, {
    onClick: handleClick,
    onTouchEnd: handleClick,
    onDoubleClick: handleDoubleClick,
    className: cn(containerClassName, 'rw-widget-input')
  }, /*#__PURE__*/React.createElement(FocusListContext.Provider, {
    value: tagList.context
  }, /*#__PURE__*/React.createElement(TagList, {
    id: tagsId,
    textAccessor: accessors.text,
    clearTagIcon: clearTagIcon,
    label: messages.tagsLabel(),
    value: dataItems,
    readOnly: isReadOnly,
    disabled: disabled,
    onDelete: handleDelete,
    tagOptionComponent: tagOptionComponent,
    renderTagValue: renderTagValue
  }, /*#__PURE__*/React.createElement(MultiselectInput, _extends({}, inputProps, {
    role: "combobox",
    autoFocus: autoFocus,
    tabIndex: tabIndex || 0,
    "aria-expanded": !!currentOpen,
    "aria-busy": !!busy,
    "aria-owns": inputOwns,
    "aria-controls": listId,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    value: currentSearch,
    disabled: isDisabled,
    readOnly: isReadOnly,
    placeholder: (currentValue.length && !showPlaceholderWithValues ? '' : placeholder) || '',
    onKeyDown: handleSearchKeyDown,
    onKeyUp: handleSearchKeyUp,
    onChange: handleInputChange,
    ref: inputRef
  })))), /*#__PURE__*/React.createElement(DropdownCaret, {
    busy: busy,
    spinner: busySpinner,
    icon: selectIcon,
    visible: focused
  })), /*#__PURE__*/React.createElement(FocusListContext.Provider, {
    value: list.context
  }, shouldRenderPopup && /*#__PURE__*/React.createElement(Popup, _extends({}, popupProps, {
    dropUp: dropUp,
    open: currentOpen,
    transition: popupTransition,
    onEntering: () => listRef.current.scrollIntoView()
  }), /*#__PURE__*/React.createElement(ListComponent, _extends({}, listProps, {
    id: listId,
    data: data,
    tabIndex: -1,
    disabled: disabled,
    searchTerm: currentSearch,
    accessors: accessors,
    renderItem: renderListItem,
    renderGroup: renderListGroup,
    value: dataItems,
    groupBy: groupBy,
    optionComponent: optionComponent,
    onChange: (d, meta) => handleSelect(d, meta.originalEvent),
    "aria-live": "polite",
    "aria-labelledby": inputId,
    "aria-hidden": !currentOpen,
    ref: listRef,
    messages: {
      emptyList: lengthWithoutValues ? messages.emptyFilter : messages.emptyList
    }
  })), showCreateOption && /*#__PURE__*/React.createElement(AddToListOption, {
    onSelect: handleCreate
  }, messages.createOption(currentValue, currentSearch)))));
});
Multiselect.displayName = 'Multiselect';
Multiselect.propTypes = propTypes;
export default Multiselect;