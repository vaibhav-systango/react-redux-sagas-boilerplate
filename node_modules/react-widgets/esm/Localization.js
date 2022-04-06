import React, { useContext, useMemo } from 'react';
import * as IntlLocalizers from './IntlLocalizer';
import { getMessages } from './messages';

function mergeWithDefaults(date, number, messages, formatOverrides = {}) {
  if (!date && !number) throw new Error('This component requires a Localizer but none was provided');
  return {
    formatOverrides,
    messages: getMessages(messages),

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

const LocalizerContext = /*#__PURE__*/React.createContext(mergeWithDefaults(new IntlLocalizers.DateLocalizer(), new IntlLocalizers.NumberLocalizer()));

const Localization = ({
  date: _date = new IntlLocalizers.DateLocalizer(),
  number: _number = new IntlLocalizers.NumberLocalizer(),
  messages,
  children
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localizer = useMemo(() => mergeWithDefaults(_date, _number, messages), [_date, _number, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(messages)]);
  return /*#__PURE__*/React.createElement(LocalizerContext.Provider, {
    value: localizer
  }, children);
};

export const useLocalizer = (messages, formats) => {
  const localizer = useContext(LocalizerContext);
  return useMemo(() => {
    if (!messages && !formats) return localizer;
    return Object.assign({}, localizer, {
      messages: getMessages(Object.assign({}, localizer.messages, messages)),
      formatOverrides: Object.assign({}, localizer.formatOverrides, formats)
    });
  }, [messages, formats, localizer]);
};
Localization.useLocalizer = useLocalizer;
export default Localization;