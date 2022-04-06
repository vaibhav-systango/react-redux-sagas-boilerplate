"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _css = _interopRequireDefault(require("dom-helpers/css"));

var _height = _interopRequireDefault(require("dom-helpers/height"));

var _transitionEnd = _interopRequireDefault(require("dom-helpers/transitionEnd"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Transition = _interopRequireWildcard(require("react-transition-group/Transition"));

const _excluded = ["children", "className", "dropUp"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const transitionClasses = {
  [_Transition.ENTERING]: 'rw-slide-transition-entering',
  [_Transition.EXITING]: 'rw-slide-transition-exiting',
  [_Transition.EXITED]: 'rw-slide-transition-exited'
};

class SlideDownTransition extends _react.default.Component {
  constructor(...args) {
    super(...args);

    this.setContainerHeight = elem => {
      elem.style.height = this.getHeight(elem) + 'px';
    };

    this.clearContainerHeight = elem => {
      elem.style.height = '';
    };

    this.handleEntered = elem => {
      this.clearContainerHeight(elem);
      if (this.props.onEntered) this.props.onEntered();
    };

    this.handleEntering = () => {
      if (this.props.onEntering) this.props.onEntering();
    };

    this.handleExit = elem => {
      this.setContainerHeight(elem);
      if (this.props.onExit) this.props.onExit();
    };

    this.handleExited = elem => {
      this.clearContainerHeight(elem);
      if (this.props.onExited) this.props.onExited();
    };

    this.handleTransitionEnd = (el, done) => {
      (0, _transitionEnd.default)(el.firstChild, done);
    };
  }

  getHeight(container) {
    let content = container.firstChild;
    let margin = parseInt((0, _css.default)(content, 'margin-top'), 10) + parseInt((0, _css.default)(content, 'margin-bottom'), 10);
    let old = container.style.display;
    let height;
    container.style.display = 'block';
    height = ((0, _height.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
    container.style.display = old;
    return height;
  }

  render() {
    const _this$props = this.props,
          {
      children,
      className,
      dropUp
    } = _this$props,
          props = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return /*#__PURE__*/_react.default.createElement(_Transition.default, _extends({}, props, {
      appear: true,
      in: this.props.in,
      onEnter: this.setContainerHeight,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered,
      onExit: this.handleExit,
      onExited: this.handleExited,
      addEndListener: this.handleTransitionEnd,
      timeout: undefined
      /*hack*/

    }), (status, innerProps) => /*#__PURE__*/_react.default.createElement("div", _extends({}, innerProps, {
      className: (0, _classnames.default)(className, dropUp && 'rw-dropup', transitionClasses[status])
    }), /*#__PURE__*/_react.default.cloneElement(children, {
      className: (0, _classnames.default)('rw-slide-transition', children.props.className)
    })));
  }

}

SlideDownTransition.propTypes = {
  in: _propTypes.default.bool.isRequired,
  innerClassName: _propTypes.default.string,
  dropUp: _propTypes.default.bool,
  onExit: _propTypes.default.func,
  onExited: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func
};
var _default = SlideDownTransition;
exports.default = _default;