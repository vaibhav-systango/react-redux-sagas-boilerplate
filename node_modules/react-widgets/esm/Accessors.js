import { useMemo } from 'react';
export const dataValue = (dataItem, field) => {
  if (typeof field === 'function') return field(dataItem);
  if (dataItem == null) return dataItem;
  if (typeof field === 'string' && typeof dataItem === 'object' && field in dataItem) return dataItem[field];
  return dataItem;
};
export const dataText = (dataItem, textField) => {
  const value = dataValue(dataItem, textField);
  return value == null ? '' : String(value);
};
/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */

export function valueMatcher(a, b, dataKey) {
  return dataValue(a, dataKey) === dataValue(b, dataKey);
}
export function dataIndexOf(data, value, dataKey) {
  const valueDataKey = dataValue(value, dataKey);
  let idx = -1;

  while (++idx < data.length) {
    const datum = data[idx];
    if (datum === value || dataValue(datum, dataKey) === valueDataKey) return idx;
  }

  return -1;
}
export function dataItem(data, value, dataKey) {
  const idx = dataIndexOf(data, value, dataKey); // This isn't strictly safe, but we want to allow items that aren't in the list

  return idx !== -1 ? data[idx] : value;
}
export const useAccessors = (textField, dataKey) => {
  return useMemo(() => ({
    text: item => dataText(item, textField),
    value: item => dataValue(item, dataKey),
    indexOf: (data, value) => dataIndexOf(data, value, dataKey),
    matches: (a, b) => valueMatcher(a, b, dataKey),
    findOrSelf: (data, value) => dataItem(data, value, dataKey),
    includes: (data, value) => dataIndexOf(data, value, dataKey) !== -1
  }), [textField, dataKey]);
};