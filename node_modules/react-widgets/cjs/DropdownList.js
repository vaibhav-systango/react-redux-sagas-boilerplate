"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = require("uncontrollable");

var _useTimeout = _interopRequireDefault(require("@restart/hooks/useTimeout"));

var _AddToListOption = _interopRequireWildcard(require("./AddToListOption"));

var _DropdownListInput = _interopRequireDefault(require("./DropdownListInput"));

var _Icon = require("./Icon");

var _List = _interopRequireDefault(require("./List"));

var _FocusListContext = require("./FocusListContext");

var _Popup = _interopRequireDefault(require("./Popup"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _A11y = require("./A11y");

var _Filter = require("./Filter");

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

var _canShowCreate = _interopRequireDefault(require("./canShowCreate"));

var _Accessors = require("./Accessors");

var _useAutoFocus = _interopRequireDefault(require("./useAutoFocus"));

var _useDropdownToggle = _interopRequireDefault(require("./useDropdownToggle"));

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

var _Localization = require("./Localization");

var _WidgetHelpers = require("./WidgetHelpers");

var _PickerCaret = _interopRequireDefault(require("./PickerCaret"));

const _excluded = ["id", "autoFocus", "textField", "dataKey", "value", "defaultValue", "onChange", "open", "defaultOpen", "onToggle", "searchTerm", "defaultSearchTerm", "onSearch", "filter", "allowCreate", "delay", "focusFirstItem", "className", "containerClassName", "placeholder", "busy", "disabled", "readOnly", "selectIcon", "busySpinner", "dropUp", "tabIndex", "popupTransition", "name", "autoComplete", "onSelect", "onCreate", "onKeyPress", "onKeyDown", "onClick", "inputProps", "listProps", "popupProps", "renderListItem", "renderListGroup", "optionComponent", "renderValue", "groupBy", "onBlur", "onFocus", "listComponent", "popupComponent", "data", "messages"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const propTypes = {
  value: _propTypes.default.any,

  /**
   * @type {function (
   *  dataItems: ?any,
   *  metadata: {
   *    lastValue: ?any,
   *    searchTerm: ?string
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onChange: _propTypes.default.func,
  open: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  data: _propTypes.default.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  allowCreate: _propTypes.default.oneOf([true, false, 'onFilter']),

  /**
   * A React render prop for customizing the rendering of the DropdownList
   * value
   */
  renderValue: _propTypes.default.func,
  renderListItem: _propTypes.default.func,
  listComponent: CustomPropTypes.elementType,
  optionComponent: CustomPropTypes.elementType,
  renderPopup: _propTypes.default.func,
  renderListGroup: _propTypes.default.func,
  groupBy: CustomPropTypes.accessor,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: _propTypes.default.func,
  onCreate: _propTypes.default.func,

  /**
   * @type function(searchTerm: string, metadata: { action, lastSearchTerm, originalEvent? })
   */
  onSearch: _propTypes.default.func,
  searchTerm: _propTypes.default.string,
  busy: _propTypes.default.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: _propTypes.default.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: _propTypes.default.node,
  placeholder: _propTypes.default.string,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  listProps: _propTypes.default.object,
  messages: _propTypes.default.shape({
    open: _propTypes.default.string,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createOption: CustomPropTypes.message
  })
};

function useSearchWordBuilder(delay) {
  const timeout = (0, _useTimeout.default)();
  const wordRef = (0, _react.useRef)('');

  function search(character, cb) {
    let word = (wordRef.current + character).toLowerCase();
    if (!character) return;
    wordRef.current = word;
    timeout.set(() => {
      wordRef.current = '';
      cb(word);
    }, delay);
  }

  return search;
}

/**
 * A `<select>` replacement for single value lists.
 * @public
 */
const DropdownListImpl = /*#__PURE__*/_react.default.forwardRef(function DropdownList(_ref, outerRef) {
  let {
    id,
    autoFocus,
    textField,
    dataKey,
    value,
    defaultValue,
    onChange,
    open,
    defaultOpen = false,
    onToggle,
    searchTerm,
    defaultSearchTerm = '',
    onSearch,
    filter = true,
    allowCreate = false,
    delay = 500,
    focusFirstItem,
    className,
    containerClassName,
    placeholder,
    busy,
    disabled,
    readOnly,
    selectIcon = _Icon.caretDown,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    name,
    autoComplete,
    onSelect,
    onCreate,
    onKeyPress,
    onKeyDown,
    onClick,
    inputProps,
    listProps,
    popupProps,
    renderListItem,
    renderListGroup,
    optionComponent,
    renderValue,
    groupBy,
    onBlur,
    onFocus,
    listComponent: ListComponent = _List.default,
    popupComponent: Popup = _Popup.default,
    data: rawData = [],
    messages: userMessages
  } = _ref,
      elementProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  const [currentValue, handleChange] = (0, _uncontrollable.useUncontrolledProp)(value, defaultValue, onChange);
  const [currentOpen, handleOpen] = (0, _uncontrollable.useUncontrolledProp)(open, defaultOpen, onToggle);
  const [currentSearch, handleSearch] = (0, _uncontrollable.useUncontrolledProp)(searchTerm, defaultSearchTerm, onSearch);
  const ref = (0, _react.useRef)(null);
  const filterRef = (0, _react.useRef)(null);
  const listRef = (0, _react.useRef)(null);
  const inputId = (0, _WidgetHelpers.useInstanceId)(id, '_input');
  const listId = (0, _WidgetHelpers.useInstanceId)(id, '_listbox');
  const activeId = (0, _WidgetHelpers.useInstanceId)(id, '_listbox_active_option');
  const accessors = (0, _Accessors.useAccessors)(textField, dataKey);
  const localizer = (0, _Localization.useLocalizer)(userMessages);
  (0, _useAutoFocus.default)(!!autoFocus, ref);
  const toggle = (0, _useDropdownToggle.default)(currentOpen, handleOpen);
  const isDisabled = disabled === true; // const disabledItems = toItemArray(disabled)

  const isReadOnly = !!readOnly;
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref, {
    disabled: isDisabled,
    onBlur,
    onFocus
  }, {
    didHandle(focused) {
      if (focused) {
        if (filter) focus();
        return;
      }

      toggle.close();
      clearSearch();
    }

  });
  const data = (0, _Filter.useFilteredData)(rawData, currentOpen ? filter : false, currentSearch, accessors.text);
  const selectedItem = (0, _react.useMemo)(() => data[accessors.indexOf(data, currentValue)], [data, currentValue, accessors]);
  const list = (0, _FocusListContext.useFocusList)({
    activeId,
    scope: ref,
    focusFirstItem,
    anchorItem: currentOpen ? selectedItem : undefined
  });
  const [autofilling, setAutofilling] = (0, _react.useState)(false);
  const nextSearchChar = useSearchWordBuilder(delay);
  const focusedItem = list.getFocused();
  (0, _A11y.useActiveDescendant)(ref, activeId, focusedItem && currentOpen, [focusedItem]);
  const showCreateOption = (0, _canShowCreate.default)(allowCreate, {
    searchTerm: currentSearch,
    data,
    accessors
  });

  const handleCreate = event => {
    (0, _WidgetHelpers.notify)(onCreate, [currentSearch]);
    clearSearch(event);
    toggle.close();
    focus();
  };

  const handleSelect = (dataItem, originalEvent) => {
    if (readOnly || isDisabled) return;
    if (dataItem === undefined) return;
    originalEvent == null ? void 0 : originalEvent.preventDefault();

    if (dataItem === _AddToListOption.CREATE_OPTION) {
      handleCreate(originalEvent);
      return;
    }

    (0, _WidgetHelpers.notify)(onSelect, [dataItem, {
      originalEvent
    }]);
    change(dataItem, originalEvent, true);
    toggle.close();
    focus();
  };

  const handleClick = e => {
    if (readOnly || isDisabled) return; // prevents double clicks when in a <label>

    e.preventDefault();
    focus();
    toggle();
    (0, _WidgetHelpers.notify)(onClick, [e]);
  };

  const handleKeyDown = e => {
    if (readOnly || isDisabled) return;
    let {
      key,
      altKey,
      ctrlKey,
      shiftKey
    } = e;
    (0, _WidgetHelpers.notify)(onKeyDown, [e]);

    let closeWithFocus = () => {
      clearSearch();
      toggle.close();
      if (currentOpen) setTimeout(focus);
    };

    if (e.defaultPrevented) return;

    if (key === 'End' && currentOpen && !shiftKey) {
      e.preventDefault();
      list.focus(list.last());
    } else if (key === 'Home' && currentOpen && !shiftKey) {
      e.preventDefault();
      list.focus(list.first());
    } else if (key === 'Escape' && (currentOpen || currentSearch)) {
      e.preventDefault();
      closeWithFocus();
    } else if (key === 'Enter' && currentOpen && ctrlKey && showCreateOption) {
      e.preventDefault();
      handleCreate(e);
    } else if ((key === 'Enter' || key === ' ' && !filter) && currentOpen) {
      e.preventDefault();
      if (list.hasFocused()) handleSelect(list.getFocused(), e);
    } else if (key === 'ArrowDown') {
      e.preventDefault();

      if (!currentOpen) {
        toggle.open();
        return;
      }

      list.focus(list.next());
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      if (altKey) return closeWithFocus();
      list.focus(list.prev());
    }
  };

  const handleKeyPress = e => {
    if (readOnly || isDisabled) return;
    (0, _WidgetHelpers.notify)(onKeyPress, [e]);
    if (e.defaultPrevented || filter) return;
    nextSearchChar(String.fromCharCode(e.which), word => {
      if (!currentOpen) return;

      let isValid = item => _Filter.presets.startsWith(accessors.text(item).toLowerCase(), word.toLowerCase());

      const [items, focusedItem] = list.get();
      const len = items.length;
      const startIdx = items.indexOf(focusedItem) + 1;
      const offset = startIdx >= len ? 0 : startIdx;
      let idx = 0;
      let pointer = offset;

      while (idx < len) {
        pointer = (idx + offset) % len;
        let item = items[pointer];
        if (isValid(list.toDataItem(item))) break;
        idx++;
      }

      if (idx === len) return;
      list.focus(items[pointer]);
    });
  };

  const handleInputChange = e => {
    // hitting space to open
    if (!currentOpen && !e.target.value.trim()) {
      e.preventDefault();
    } else {
      search(e.target.value, e, 'input');
    }

    toggle.open();
  };

  const handleAutofillChange = e => {
    let filledValue = e.target.value.toLowerCase();
    if (filledValue === '') return void change(null);

    for (const item of rawData) {
      if (String(accessors.value(item)).toLowerCase() === filledValue || accessors.text(item).toLowerCase() === filledValue) {
        change(item, e);
        break;
      }
    }
  };

  function change(nextValue, originalEvent, selected = false) {
    if (!accessors.matches(nextValue, currentValue)) {
      (0, _WidgetHelpers.notify)(handleChange, [nextValue, {
        originalEvent,
        source: selected ? 'listbox' : 'input',
        lastValue: currentValue,
        searchTerm: currentSearch
      }]);
      clearSearch(originalEvent);
      toggle.close();
    }
  }

  function focus() {
    if (filter) filterRef.current.focus();else ref.current.focus();
  }

  function clearSearch(originalEvent) {
    search('', originalEvent, 'clear');
  }

  function search(nextSearchTerm, originalEvent, action = 'input') {
    if (currentSearch !== nextSearchTerm) handleSearch(nextSearchTerm, {
      action,
      originalEvent,
      lastSearchTerm: currentSearch
    });
  }
  /**
   * Render
   */


  (0, _react.useImperativeHandle)(outerRef, () => ({
    focus
  }));
  let valueItem = accessors.findOrSelf(data, currentValue);
  let shouldRenderPopup = (0, _WidgetHelpers.useFirstFocusedRender)(focused, currentOpen);
  const widgetProps = Object.assign({}, elementProps, {
    role: 'combobox',
    id: inputId,
    //tab index when there is no filter input to take focus
    tabIndex: filter ? -1 : tabIndex || 0,
    // FIXME: only when item exists
    'aria-owns': elementProps['aria-owns'] ? `${listId} ${elementProps['aria-owns']}` : listId,
    'aria-controls': elementProps['aria-controls'] ? `${listId} ${elementProps['aria-controls']}` : listId,
    'aria-expanded': !!currentOpen,
    'aria-haspopup': 'listbox',
    'aria-busy': !!busy,
    'aria-live': currentOpen ? 'polite' : undefined,
    'aria-autocomplete': 'list',
    'aria-disabled': isDisabled,
    'aria-readonly': isReadOnly
  });
  return /*#__PURE__*/_react.default.createElement(_FocusListContext.FocusListContext.Provider, {
    value: list.context
  }, /*#__PURE__*/_react.default.createElement(_Widget.default, _extends({}, widgetProps, {
    open: !!currentOpen,
    dropUp: !!dropUp,
    focused: !!focused,
    disabled: isDisabled,
    readOnly: isReadOnly,
    autofilling: autofilling
  }, focusEvents, {
    onKeyDown: handleKeyDown,
    onKeyPress: handleKeyPress,
    className: (0, _classnames.default)(className, 'rw-dropdown-list'),
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_WidgetPicker.default, {
    onClick: handleClick,
    tabIndex: filter ? -1 : 0,
    className: (0, _classnames.default)(containerClassName, 'rw-widget-input')
  }, /*#__PURE__*/_react.default.createElement(_DropdownListInput.default, _extends({}, inputProps, {
    value: valueItem,
    dataKeyAccessor: accessors.value,
    textAccessor: accessors.text,
    name: name,
    readOnly: readOnly,
    disabled: isDisabled,
    allowSearch: !!filter,
    searchTerm: currentSearch,
    ref: filterRef,
    autoComplete: autoComplete,
    onSearch: handleInputChange,
    onAutofill: setAutofilling,
    onAutofillChange: handleAutofillChange,
    placeholder: placeholder,
    renderValue: renderValue
  })), /*#__PURE__*/_react.default.createElement(_PickerCaret.default, {
    visible: true,
    busy: busy,
    icon: selectIcon,
    spinner: busySpinner
  })), shouldRenderPopup && /*#__PURE__*/_react.default.createElement(Popup, _extends({}, popupProps, {
    dropUp: dropUp,
    open: currentOpen,
    transition: popupTransition,
    onEntered: focus,
    onEntering: () => listRef.current.scrollIntoView()
  }), /*#__PURE__*/_react.default.createElement(ListComponent, _extends({}, listProps, {
    id: listId,
    data: data,
    tabIndex: -1,
    disabled: disabled,
    groupBy: groupBy,
    searchTerm: currentSearch,
    accessors: accessors,
    renderItem: renderListItem,
    renderGroup: renderListGroup,
    optionComponent: optionComponent,
    value: selectedItem,
    onChange: (d, meta) => handleSelect(d, meta.originalEvent),
    "aria-live": currentOpen ? 'polite' : undefined,
    "aria-labelledby": inputId,
    "aria-hidden": !currentOpen,
    ref: listRef,
    messages: {
      emptyList: rawData.length ? localizer.messages.emptyFilter : localizer.messages.emptyList
    }
  })), showCreateOption && /*#__PURE__*/_react.default.createElement(_AddToListOption.default, {
    onSelect: handleCreate
  }, localizer.messages.createOption(currentValue, currentSearch || '')))));
});

DropdownListImpl.displayName = 'DropdownList';
DropdownListImpl.propTypes = propTypes;
var _default = DropdownListImpl;
exports.default = _default;