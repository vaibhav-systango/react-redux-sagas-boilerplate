import { dataText } from './Accessors';
import { useMemo } from 'react';
export const presets = {
  eq: (a, b) => a === b,
  contains: (a, b) => a.indexOf(b) !== -1,
  startsWith: (a, b) => a.lastIndexOf(b, 0) === 0
};

function normalizeFilter(filter, textField) {
  if (filter === false) return null;
  if (typeof filter === 'function') return filter;
  const filterPreset = presets[filter === true ? 'startsWith' : filter || 'eq'];
  return (item, searchTerm) => {
    let textValue = dataText(item, textField);
    return filterPreset(textValue.toLowerCase(), searchTerm.toLowerCase());
  };
}

export function useFilteredData(data, filterer, searchTerm = '', textAccessor) {
  return useMemo(() => {
    const filter = normalizeFilter(filterer, textAccessor);
    if (!filter || !searchTerm.trim()) return data;
    return data.filter((item, idx) => filter(item, searchTerm, idx));
  }, [data, filterer, searchTerm, textAccessor]);
}