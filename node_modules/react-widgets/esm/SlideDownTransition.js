const _excluded = ["children", "className", "dropUp"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cn from 'classnames';
import css from 'dom-helpers/css';
import getHeight from 'dom-helpers/height';
import transitionEnd from 'dom-helpers/transitionEnd';
import PropTypes from 'prop-types';
import React from 'react';
import Transition, { ENTERING, EXITED, EXITING } from 'react-transition-group/Transition';
const transitionClasses = {
  [ENTERING]: 'rw-slide-transition-entering',
  [EXITING]: 'rw-slide-transition-exiting',
  [EXITED]: 'rw-slide-transition-exited'
};

class SlideDownTransition extends React.Component {
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
      transitionEnd(el.firstChild, done);
    };
  }

  getHeight(container) {
    let content = container.firstChild;
    let margin = parseInt(css(content, 'margin-top'), 10) + parseInt(css(content, 'margin-bottom'), 10);
    let old = container.style.display;
    let height;
    container.style.display = 'block';
    height = (getHeight(content) || 0) + (isNaN(margin) ? 0 : margin);
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

    return /*#__PURE__*/React.createElement(Transition, _extends({}, props, {
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

    }), (status, innerProps) => /*#__PURE__*/React.createElement("div", _extends({}, innerProps, {
      className: cn(className, dropUp && 'rw-dropup', transitionClasses[status])
    }), /*#__PURE__*/React.cloneElement(children, {
      className: cn('rw-slide-transition', children.props.className)
    })));
  }

}

SlideDownTransition.propTypes = {
  in: PropTypes.bool.isRequired,
  innerClassName: PropTypes.string,
  dropUp: PropTypes.bool,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func
};
export default SlideDownTransition;