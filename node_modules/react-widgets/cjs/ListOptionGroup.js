"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
  className: _propTypes.default.string,
  component: _propTypes.default.string
};

function ListOptionGroup({
  children,
  className,
  component = 'div'
}) {
  let Tag = component;
  return /*#__PURE__*/_react.default.createElement(Tag, {
    tabIndex: "-1",
    role: "separator",
    className: (0, _classnames.default)(className, 'rw-list-optgroup')
  }, children);
}

ListOptionGroup.propTypes = propTypes;
var _default = ListOptionGroup;
exports.default = _default;