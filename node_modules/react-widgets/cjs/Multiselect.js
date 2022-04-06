"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _closest = _interopRequireDefault(require("dom-helpers/closest"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = require("uncontrollable");

var _AddToListOption = _interopRequireWildcard(require("./AddToListOption"));

var _Icon = require("./Icon");

var _List = _interopRequireDefault(require("./List"));

var _FocusListContext = require("./FocusListContext");

var _MultiselectInput = _interopRequireDefault(require("./MultiselectInput"));

var _MultiselectTagList = _interopRequireDefault(require("./MultiselectTagList"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _messages = require("./messages");

var _A11y = require("./A11y");

var _Filter = require("./Filter");

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

var _canShowCreate = _interopRequireDefault(require("./canShowCreate"));

var _Accessors = require("./Accessors");

var _useDropdownToggle = _interopRequireDefault(require("./useDropdownToggle"));

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

var _WidgetHelpers = require("./WidgetHelpers");

var _PickerCaret = _interopRequireDefault(require("./PickerCaret"));

const _excluded = ["dataKey", "textField", "autoFocus", "id", "value", "defaultValue", "onChange", "open", "defaultOpen", "onToggle", "focusFirstItem", "searchTerm", "defaultSearchTerm", "onSearch", "filter", "allowCreate", "className", "containerClassName", "placeholder", "busy", "disabled", "readOnly", "selectIcon", "clearTagIcon", "busySpinner", "dropUp", "tabIndex", "popupTransition", "showPlaceholderWithValues", "showSelectedItemsInList", "onSelect", "onCreate", "onKeyDown", "onBlur", "onFocus", "inputProps", "listProps", "popupProps", "renderListItem", "renderListGroup", "renderTagValue", "optionComponent", "tagOptionComponent", "groupBy", "listComponent", "popupComponent", "tagListComponent", "data", "messages"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const ENTER = 13;
const INSERT = 'insert';
const REMOVE = 'remove';
let propTypes = {
  data: _propTypes.default.array,
  //-- controlled props --
  value: _propTypes.default.array,

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
  onChange: _propTypes.default.func,
  searchTerm: _propTypes.default.string,

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
  onSearch: _propTypes.default.func,
  open: _propTypes.default.bool,
  handleOpen: _propTypes.default.func,
  //-------------------------------------------
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  renderTagValue: _propTypes.default.func,
  renderListItem: _propTypes.default.func,
  renderListGroup: _propTypes.default.func,
  groupBy: CustomPropTypes.accessor,
  allowCreate: _propTypes.default.oneOf([true, false, 'onFilter']),

  /**
   *
   * @type { (dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void }
   */
  onSelect: _propTypes.default.func,

  /**
   * @type { (searchTerm: string) => void }
   */
  onCreate: _propTypes.default.func,
  busy: _propTypes.default.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: _propTypes.default.node,

  /** Specify the element used to render tag clear icons. */
  clearTagIcon: _propTypes.default.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: _propTypes.default.node,
  dropUp: _propTypes.default.bool,
  popupTransition: _propTypes.default.elementType,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  listProps: _propTypes.default.object,
  autoFocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,

  /** Continue to show the input placeholder even if tags are selected */
  showPlaceholderWithValues: _propTypes.default.bool,

  /** Continue to show the selected items in the dropdown list */
  showSelectedItemsInList: _propTypes.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  messages: _propTypes.default.shape({
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
  data = (0, _react.useMemo)(() => showSelectedItemsInList ? data : data.filter(i => !value.some(v => accessors.matches(i, v))), [data, showSelectedItemsInList, value, accessors]);
  return [(0, _Filter.useFilteredData)(data, filter || false, searchTerm, accessors.text), data.length];
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
const Multiselect = /*#__PURE__*/_react.default.forwardRef(function Multiselect(_ref, outerRef) {
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
    clearTagIcon = _Icon.times,
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
    listComponent: ListComponent = _List.default,
    popupComponent: Popup = _Popup.default,
    tagListComponent: TagList = _MultiselectTagList.default,
    data: rawData = [],
    messages: userMessages
  } = _ref,
      elementProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  let [currentValue, handleChange] = (0, _uncontrollable.useUncontrolledProp)(value, defaultValue, onChange);
  const [currentOpen, handleOpen] = (0, _uncontrollable.useUncontrolledProp)(open, defaultOpen, onToggle);
  const [currentSearch, handleSearch] = (0, _uncontrollable.useUncontrolledProp)(searchTerm, defaultSearchTerm, onSearch);
  const ref = (0, _react.useRef)(null);
  const inputRef = (0, _react.useRef)(null);
  const listRef = (0, _react.useRef)(null);
  const inputId = (0, _WidgetHelpers.useInstanceId)(id, '_input');
  const tagsId = (0, _WidgetHelpers.useInstanceId)(id, '_taglist');
  const listId = (0, _WidgetHelpers.useInstanceId)(id, '_listbox');
  const createId = (0, _WidgetHelpers.useInstanceId)(id, '_createlist_option');
  const activeTagId = (0, _WidgetHelpers.useInstanceId)(id, '_taglist_active_tag');
  const activeOptionId = (0, _WidgetHelpers.useInstanceId)(id, '_listbox_active_option');
  const accessors = (0, _Accessors.useAccessors)(textField, dataKey);
  const messages = (0, _messages.useMessagesWithDefaults)(userMessages);
  const toggle = (0, _useDropdownToggle.default)(currentOpen, handleOpen);
  const isDisabled = disabled === true;
  const isReadOnly = !!readOnly;
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref, {
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
  const dataItems = (0, _react.useMemo)(() => currentValue.map(item => accessors.findOrSelf(rawData, item)), [rawData, currentValue, accessors]);
  const [data, lengthWithoutValues] = useMultiselectData(dataItems, rawData, accessors, currentOpen ? filter : false, currentSearch, showSelectedItemsInList);
  const list = (0, _FocusListContext.useFocusList)({
    scope: ref,
    scopeSelector: '.rw-popup',
    focusFirstItem,
    activeId: activeOptionId,
    anchorItem: currentOpen ? dataItems[dataItems.length - 1] : undefined
  });
  const tagList = (0, _FocusListContext.useFocusList)({
    scope: ref,
    scopeSelector: '.rw-multiselect-taglist',
    activeId: activeTagId
  });
  const showCreateOption = (0, _canShowCreate.default)(allowCreate, {
    searchTerm: currentSearch,
    data,
    dataItems,
    accessors
  });
  /**
   * Update aria when it changes on update
   */

  const focusedTag = tagList.getFocused();
  (0, _react.useEffect)(() => {
    if (currentOpen) return;
    (0, _A11y.setActiveDescendant)(inputRef.current, focusedTag ? activeTagId : '');
  }, [activeTagId, currentOpen, focusedTag]);
  const focusedItem = list.getFocused();
  (0, _react.useEffect)(() => {
    if (!currentOpen) return; // if (focusedItem) tagList.focus(null)

    (0, _A11y.setActiveDescendant)(inputRef.current, focusedItem ? activeOptionId : '');
  }, [activeOptionId, currentOpen, focusedItem]);
  /**
   * Event Handlers
   */

  const handleDelete = (dataItem, event) => {
    if (isDisabled || readOnly || tagList.size() === 0) return;
    focus();
    change(dataItem, event, REMOVE);
  };

  const deletingRef = (0, _react.useRef)(false);

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

    if ((0, _closest.default)(e.target, '.rw-select') && currentOpen) {
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

    if (dataItem === _AddToListOption.CREATE_OPTION) {
      handleCreate(originalEvent);
      return;
    }

    (0, _WidgetHelpers.notify)(onSelect, [dataItem, {
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
    (0, _WidgetHelpers.notify)(onCreate, [currentSearch]);
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
    (0, _WidgetHelpers.notify)(onKeyDown, [event]);
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


  (0, _react.useImperativeHandle)(outerRef, () => ({
    focus
  }));
  let shouldRenderPopup = (0, _WidgetHelpers.useFirstFocusedRender)(focused, currentOpen);
  let shouldRenderTags = !!dataItems.length;
  let inputOwns = `${listId} ` + (shouldRenderTags ? tagsId : '') + (showCreateOption ? createId : '');
  return /*#__PURE__*/_react.default.createElement(_Widget.default, _extends({}, elementProps, {
    ref: ref,
    open: currentOpen,
    dropUp: dropUp,
    focused: focused,
    disabled: isDisabled,
    readOnly: isReadOnly,
    onKeyDown: handleKeyDown
  }, focusEvents, {
    className: (0, _classnames.default)(className, 'rw-multiselect')
  }), /*#__PURE__*/_react.default.createElement(_WidgetPicker.default, {
    onClick: handleClick,
    onTouchEnd: handleClick,
    onDoubleClick: handleDoubleClick,
    className: (0, _classnames.default)(containerClassName, 'rw-widget-input')
  }, /*#__PURE__*/_react.default.createElement(_FocusListContext.FocusListContext.Provider, {
    value: tagList.context
  }, /*#__PURE__*/_react.default.createElement(TagList, {
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
  }, /*#__PURE__*/_react.default.createElement(_MultiselectInput.default, _extends({}, inputProps, {
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
  })))), /*#__PURE__*/_react.default.createElement(_PickerCaret.default, {
    busy: busy,
    spinner: busySpinner,
    icon: selectIcon,
    visible: focused
  })), /*#__PURE__*/_react.default.createElement(_FocusListContext.FocusListContext.Provider, {
    value: list.context
  }, shouldRenderPopup && /*#__PURE__*/_react.default.createElement(Popup, _extends({}, popupProps, {
    dropUp: dropUp,
    open: currentOpen,
    transition: popupTransition,
    onEntering: () => listRef.current.scrollIntoView()
  }), /*#__PURE__*/_react.default.createElement(ListComponent, _extends({}, listProps, {
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
  })), showCreateOption && /*#__PURE__*/_react.default.createElement(_AddToListOption.default, {
    onSelect: handleCreate
  }, messages.createOption(currentValue, currentSearch)))));
});

Multiselect.displayName = 'Multiselect';
Multiselect.propTypes = propTypes;
var _default = Multiselect;
exports.default = _default;