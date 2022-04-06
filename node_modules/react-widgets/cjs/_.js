"use strict";

exports.__esModule = true;
exports.chunk = chunk;
exports.groupBySortedKeys = groupBySortedKeys;
exports.makeArray = exports.has = void 0;
exports.toItemArray = toItemArray;

var _tinyWarning = _interopRequireDefault(require("tiny-warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/consistent-type-assertions */
function toItemArray(a) {
  if (Array.isArray(a)) return a;
  return [];
}

const makeArray = (obj, excludeNull = true) => {
  const result = [];
  return excludeNull ? obj == null ? result : result.concat(obj) : result.concat(obj);
};

exports.makeArray = makeArray;

const has = (o, key) => o ? Object.prototype.hasOwnProperty.call(o, key) : false;

exports.has = has;

function chunk(array, chunkSize) {
  let index = 0;
  let length = array ? array.length : 0;
  let result = [];
  chunkSize = Math.max(+chunkSize || 1, 1);

  while (index < length) result.push(array.slice(index, index += chunkSize));

  return result;
}

function groupBySortedKeys(groupBy, data, _keys = []) {
  const iter = typeof groupBy === 'function' ? groupBy : item => item[groupBy];
  (0, _tinyWarning.default)(typeof groupBy !== 'string' || !data.length || has(data[0], groupBy), `[React Widgets] You seem to be trying to group this list by a ` + `property \`${groupBy}\` that doesn't exist in the dataset items, this may be a typo`);
  const groups = new Map();
  data.forEach(item => {
    let group = iter(item);
    if (groups.has(group)) groups.get(group).push(item);else groups.set(group, [item]);
  });
  return Array.from(groups);
}