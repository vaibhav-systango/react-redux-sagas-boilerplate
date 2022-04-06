import * as React from 'react';
import { useMemo } from 'react';
const messages = {
  moveToday: 'Today',
  moveBack: 'Navigate back',
  moveForward: 'Navigate forward',
  dateButton: 'Select date',
  openCombobox: 'open combobox',
  emptyList: 'There are no items in this list',
  emptyFilter: 'The filter returned no results',
  createOption: (_value, searchTerm) => [' Create option', searchTerm && ' ', searchTerm && /*#__PURE__*/React.createElement("strong", {
    key: "_"
  }, `"${searchTerm}"`)],
  tagsLabel: 'Selected items',
  removeLabel: 'Remove selected item',
  noneSelected: 'no selected items',
  selectedItems: labels => `Selected items: ${labels.join(', ')}`,
  // number
  increment: 'Increment value',
  decrement: 'Decrement value'
};
const DEFAULTS = {};
export function getMessages(defaults = DEFAULTS) {
  let processed = {};
  Object.keys(messages).forEach(message => {
    let value = defaults[message];
    if (value == null) value = messages[message];
    processed[message] = typeof value === 'function' ? value : () => value;
  });
  return processed;
}
export const useMessagesWithDefaults = defaults => useMemo(() => getMessages(defaults), [defaults]);