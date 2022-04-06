"use strict";

exports.__esModule = true;
exports.presets = void 0;
exports.useFilteredData = useFilteredData;

var _Accessors = require("./Accessors");

var _react = require("react");

const presets = {
  eq: (a, b) => a === b,
  contains: (a, b) => a.indexOf(b) !== -1,
  startsWith: (a, b) => a.lastIndexOf(b, 0) === 0
};
exports.presets = presets;

function normalizeFilter(filter, textField) {
  if (filter === false) return null;
  if (typeof filter === 'function') return filter;
  const filterPreset = presets[filter === true ? 'startsWith' : filter || 'eq'];
  return (item, searchTerm) => {
    let textValue = (0, _Accessors.dataText)(item, textField);
    return filterPreset(textValue.toLowerCase(), searchTerm.toLowerCase());
  };
}

function useFilteredData(data, filterer, searchTerm = '', textAccessor) {
  return (0, _react.useMemo)(() => {
    const filter = normalizeFilter(filterer, textAccessor);
    if (!filter || !searchTerm.trim()) return data;
    return data.filter((item, idx) => filter(item, searchTerm, idx));
  }, [data, filterer, searchTerm, textAccessor]);
}