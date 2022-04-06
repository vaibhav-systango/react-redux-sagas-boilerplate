"use strict";

exports.__esModule = true;
exports.useLocalizer = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var IntlLocalizers = _interopRequireWildcard(require("./IntlLocalizer"));

var _messages = require("./messages");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function mergeWithDefaults(date, number, messages, formatOverrides = {}) {
  if (!date && !number) throw new Error('This component requires a Localizer but none was provided');
  return {
    formatOverrides,
    messages: (0, _messages.getMessages)(messages),

    formatDate(value, format, userFormat) {
      return date[format](value, userFormat != null ? userFormat : this.formatOverrides[format]);
    },

    formatNumber(value, userFormat) {
      return number.format(value, userFormat != null ? userFormat : this.formatOverrides.number);
    },

    parseDate: date.parse.bind(date),
    parseNumber: number.parse.bind(number),
    decimalCharacter: number.decimalCharacter.bind(number),
    firstOfWeek: date.firstOfWeek.bind(date)
  };
}

const LocalizerContext = /*#__PURE__*/_react.default.createContext(mergeWithDefaults(new IntlLocalizers.DateLocalizer(), new IntlLocalizers.NumberLocalizer()));

const Localization = ({
  date: _date = new IntlLocalizers.DateLocalizer(),
  number: _number = new IntlLocalizers.NumberLocalizer(),
  messages,
  children
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localizer = (0, _react.useMemo)(() => mergeWithDefaults(_date, _number, messages), [_date, _number, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(messages)]);
  return /*#__PURE__*/_react.default.createElement(LocalizerContext.Provider, {
    value: localizer
  }, children);
};

const useLocalizer = (messages, formats) => {
  const localizer = (0, _react.useContext)(LocalizerContext);
  return (0, _react.useMemo)(() => {
    if (!messages && !formats) return localizer;
    return Object.assign({}, localizer, {
      messages: (0, _messages.getMessages)(Object.assign({}, localizer.messages, messages)),
      formatOverrides: Object.assign({}, localizer.formatOverrides, formats)
    });
  }, [messages, formats, localizer]);
};

exports.useLocalizer = useLocalizer;
Localization.useLocalizer = useLocalizer;
var _default = Localization;
exports.default = _default;