/* eslint-disable @typescript-eslint/consistent-type-assertions */
import warning from 'tiny-warning';
export function toItemArray(a) {
  if (Array.isArray(a)) return a;
  return [];
}
export const makeArray = (obj, excludeNull = true) => {
  const result = [];
  return excludeNull ? obj == null ? result : result.concat(obj) : result.concat(obj);
};
export const has = (o, key) => o ? Object.prototype.hasOwnProperty.call(o, key) : false;
export function chunk(array, chunkSize) {
  let index = 0;
  let length = array ? array.length : 0;
  let result = [];
  chunkSize = Math.max(+chunkSize || 1, 1);

  while (index < length) result.push(array.slice(index, index += chunkSize));

  return result;
}
export function groupBySortedKeys(groupBy, data, _keys = []) {
  const iter = typeof groupBy === 'function' ? groupBy : item => item[groupBy];
  warning(typeof groupBy !== 'string' || !data.length || has(data[0], groupBy), `[React Widgets] You seem to be trying to group this list by a ` + `property \`${groupBy}\` that doesn't exist in the dataset items, this may be a typo`);
  const groups = new Map();
  data.forEach(item => {
    let group = iter(item);
    if (groups.has(group)) groups.get(group).push(item);else groups.set(group, [item]);
  });
  return Array.from(groups);
}