"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
  text: _propTypes.default.string,
  searchTerm: _propTypes.default.string
};

function AutocompleteListItem({
  text,
  searchTerm
}) {
  if (!text || !searchTerm) return text;
  let idx = text.indexOf(searchTerm);
  if (idx === -1) idx = text.toLowerCase().indexOf(searchTerm);
  if (idx === -1 || searchTerm.length >= text.length) return text;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, text.slice(0, idx), /*#__PURE__*/_react.default.createElement("strong", null, text.slice(idx, idx + searchTerm.length)), text.slice(idx + searchTerm.length));
}

AutocompleteListItem.propTypes = propTypes;
var _default = AutocompleteListItem;
exports.default = _default;