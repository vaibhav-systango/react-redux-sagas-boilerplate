"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _transitionEnd = _interopRequireDefault(require("dom-helpers/transitionEnd"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

const _excluded = ["direction", "children", "onTransitionEnd"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const DirectionPropType = _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']);

const prefix = 'rw-calendar-transition';
const active = 'rw-calendar-transition-active';
const next = 'rw-calendar-transition-next';
const prev = 'rw-calendar-transition-prev';

const clone = (el, cls) => el && /*#__PURE__*/_react.default.cloneElement(el, {
  className: (0, _classnames.default)(el.props.className, prefix, cls)
});

class SlideTransitionGroup extends _react.default.Component {
  constructor(args) {
    super(args);

    this.handleTransitionEnd = hadFocus => {
      this.isTransitioning = false;
      let current = this.container.current.lastChild;
      if (this.props.onTransitionEnd) this.props.onTransitionEnd(current, hadFocus);
    };

    this.current = this.props.children;
    this.container = /*#__PURE__*/_react.default.createRef();
    this.state = {
      prevClasses: '',
      currentClasses: ''
    };
  }

  componentDidUpdate() {
    if (!this.flush || this.isTransitioning) return;
    this.flush = false;
    this.isTransitioning = true;
    let previous = this.container.current.firstChild;
    const hadFocus = document.activeElement && previous.contains(document.activeElement);
    this.setState({
      prevClasses: '',
      currentClasses: next
    }, () => {
      let current = this.container.current.lastChild;
      current.clientHeight; // eslint-disable-line

      this.setState({
        prevClasses: prev,
        currentClasses: (0, _classnames.default)(next, active)
      }, () => {
        (0, _transitionEnd.default)(current, () => {
          this.prev = null;

          if (this.current.key !== this.props.children.key) {
            this.current = this.props.children;
          }

          this.setState({
            prevClasses: '',
            currentClasses: ''
          }, () => this.handleTransitionEnd(hadFocus));
        });
      });
    });
  }

  render() {
    let _this$props = this.props,
        {
      direction,
      children
    } = _this$props,
        props = _objectWithoutPropertiesLoose(_this$props, _excluded);

    if (!this.isTransitioning) {
      if (this.current.key !== children.key) {
        this.prev = this.current;
        this.flush = true;
      }

      this.current = children;
    }

    let {
      prevClasses,
      currentClasses
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
      ref: this.container,
      className: (0, _classnames.default)(`rw-calendar-transition-group`, direction === 'top' && 'rw-calendar-transition-top', direction === 'right' && 'rw-calendar-transition-right', direction === 'bottom' && 'rw-calendar-transition-bottom', direction === 'left' && 'rw-calendar-transition-left')
    }), clone(this.prev, prevClasses), clone(this.current, currentClasses));
  }

}

SlideTransitionGroup.defaultProps = {
  direction: 'left'
};
SlideTransitionGroup.propTypes = {
  direction: DirectionPropType,
  onTransitionEnd: _propTypes.default.func
};
var _default = SlideTransitionGroup;
exports.default = _default;