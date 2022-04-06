"use strict";

exports.__esModule = true;
exports.message = exports.elementType = exports.disabled = exports.accessor = void 0;

var PropTypes = _interopRequireWildcard(require("prop-types"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const elementType = PropTypes.elementType;
exports.elementType = elementType;
let disabled = Object.assign((...args) => PropTypes.bool(...args), {
  acceptsArray: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
});
exports.disabled = disabled;
const accessor = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);
exports.accessor = accessor;
const message = PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func]);
exports.message = message;