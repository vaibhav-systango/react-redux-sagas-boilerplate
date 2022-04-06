"use strict";

exports.__esModule = true;
exports.isNullOrInvalid = exports.default = void 0;

var dateMath = _interopRequireWildcard(require("date-arithmetic"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let isNullOrInvalid = dte => dte == null || isNaN(+dte);

exports.isNullOrInvalid = isNullOrInvalid;
let dates = Object.assign({}, dateMath, {
  merge(date, time, defaultDate) {
    if (isNullOrInvalid(time) && isNullOrInvalid(date) == null) return null;
    if (isNullOrInvalid(time)) time = defaultDate || new Date();
    if (isNullOrInvalid(date)) date = defaultDate || new Date();
    date = dates.startOf(date, 'day');
    date = dates.hours(date, dates.hours(time));
    date = dates.minutes(date, dates.minutes(time));
    date = dates.seconds(date, dates.seconds(time));
    return dates.milliseconds(date, dates.milliseconds(time));
  }

});
var _default = dates;
exports.default = _default;