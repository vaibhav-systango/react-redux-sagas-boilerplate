"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useHandleSelect = useHandleSelect;
exports.useScrollFocusedIntoView = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _ListOption = _interopRequireDefault(require("./ListOption"));

var _ListOptionGroup = _interopRequireDefault(require("./ListOptionGroup"));

var _messages = require("./messages");

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

var _ = require("./_");

var _WidgetHelpers = require("./WidgetHelpers");

var _useMutationObserver = _interopRequireDefault(require("@restart/hooks/useMutationObserver"));

var _useCallbackRef = _interopRequireDefault(require("@restart/hooks/useCallbackRef"));

var _useMergedRefs = _interopRequireDefault(require("@restart/hooks/useMergedRefs"));

const _excluded = ["multiple", "data", "value", "onChange", "accessors", "className", "messages", "disabled", "renderItem", "renderGroup", "searchTerm", "groupBy", "elementRef", "optionComponent", "renderList"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
  data: _propTypes.default.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  onSelect: _propTypes.default.func,
  onMove: _propTypes.default.func,
  onHoverOption: _propTypes.default.func,
  optionComponent: _propTypes.default.elementType,
  renderItem: _propTypes.default.func,
  renderGroup: _propTypes.default.func,
  focusedItem: _propTypes.default.any,
  selectedItem: _propTypes.default.any,
  searchTerm: _propTypes.default.string,
  disabled: CustomPropTypes.disabled.acceptsArray,
  messages: _propTypes.default.shape({
    emptyList: _propTypes.default.func.isRequired
  })
};

const useScrollFocusedIntoView = (element, observeChanges = false) => {
  const scrollIntoView = (0, _react.useCallback)(() => {
    if (!element) return;
    let selectedItem = element.querySelector('[data-rw-focused]');

    if (selectedItem && selectedItem.scrollIntoView) {
      selectedItem.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [element]);
  (0, _useMutationObserver.default)(observeChanges ? element : null, {
    subtree: true,
    attributes: true,
    attributeFilter: ['data-rw-focused']
  }, scrollIntoView);
  return scrollIntoView;
};

exports.useScrollFocusedIntoView = useScrollFocusedIntoView;

function useHandleSelect(multiple, dataItems, onChange) {
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

const List = /*#__PURE__*/_react.default.forwardRef(function List(_ref, outerRef) {
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
    optionComponent: Option = _ListOption.default,
    renderList
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const id = (0, _WidgetHelpers.useInstanceId)();
  const dataItems = (0, _.makeArray)(value, multiple);
  const groupedData = (0, _react.useMemo)(() => groupBy ? (0, _.groupBySortedKeys)(groupBy, data) : undefined, [data, groupBy]);
  const [element, ref] = (0, _useCallbackRef.default)();
  const disabledItems = (0, _.toItemArray)(disabled);
  const {
    emptyList
  } = (0, _messages.useMessagesWithDefaults)(messages);
  const divRef = (0, _useMergedRefs.default)(ref, elementRef);
  const handleSelect = useHandleSelect(multiple, dataItems, onChange);
  const scrollIntoView = useScrollFocusedIntoView(element, true);
  let elementProps = pickElementProps(props);
  (0, _react.useImperativeHandle)(outerRef, () => ({
    scrollIntoView
  }), [scrollIntoView]);

  function renderOption(item, idx) {
    const textValue = accessors.text(item);
    const itemIsDisabled = disabledItems.includes(item);
    const itemIsSelected = dataItems.includes(item);
    return /*#__PURE__*/_react.default.createElement(Option, {
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

  const items = groupedData ? groupedData.map(([group, items], idx) => /*#__PURE__*/_react.default.createElement("div", {
    role: "group",
    key: `group_${idx}`
  }, /*#__PURE__*/_react.default.createElement(_ListOptionGroup.default, null, renderGroup ? renderGroup({
    group
  }) : group), items.map(renderOption))) : data.map(renderOption);
  const rootProps = Object.assign({
    id,
    tabIndex: 0,
    ref: divRef
  }, elementProps, {
    'aria-multiselectable': !!multiple,
    className: (0, _classnames.default)(className, 'rw-list'),
    role: (_elementProps$role = elementProps.role) != null ? _elementProps$role : 'listbox',
    children: _react.default.Children.count(items) ? items : /*#__PURE__*/_react.default.createElement("div", {
      className: "rw-list-empty"
    }, emptyList())
  });
  return renderList ? renderList(rootProps) : /*#__PURE__*/_react.default.createElement("div", rootProps);
});

List.displayName = 'List';
List.propTypes = propTypes;
var _default = List;
exports.default = _default;