const _excluded = ["disabled", "readOnly", "placeholder", "innerRef", "min", "max", "localizer", "editing"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import activeElement from 'dom-helpers/activeElement';
import canUseDOM from 'dom-helpers/canUseDOM';
import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import Input from './Input';
import * as CustomPropTypes from './PropTypes';

let isSign = val => (val || '').trim() === '-';

function isPaddedZeros(str, localizer) {
  let localeChar = localizer.decimalCharacter();
  let [_, decimals] = str.split(localeChar);
  return !!(decimals && decimals.match(/0+$/));
}

function isAtDelimiter(str, localizer) {
  let localeChar = localizer.decimalCharacter();
  let lastIndex = str.length - 1;
  if (str.length < 1) return false;
  let char = str[lastIndex];
  return !!(char === localeChar && str.indexOf(char) === lastIndex);
}

class NumberPickerInput extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};

    this.handleBlur = event => {
      let str = this.state.stringValue;
      let number = this.parseNumber(str); // if number is below the min
      // we need to flush low values and decimal stops, onBlur means i'm done inputing

      if (this.isIntermediateValue(number, str)) {
        if (isNaN(number)) {
          number = null;
        }

        this.props.onChange(number, event);
      }
    };

    this.handleChange = event => {
      let {
        value,
        onChange
      } = this.props;
      let stringValue = event.target.value,
          numberValue = this.parseNumber(stringValue);
      let isIntermediate = this.isIntermediateValue(numberValue, stringValue);

      if (stringValue == null || stringValue.trim() === '') {
        this.setStringValue('');
        onChange(null, event);
        return;
      } // order here matters a lot


      if (isIntermediate) {
        this.setStringValue(stringValue);
      } else if (numberValue !== value) {
        onChange(numberValue, event);
      } else if (stringValue != this.state.stringValue) {
        this.setStringValue(stringValue);
      }
    };
  }

  getSnapshotBeforeUpdate({
    editing
  }) {
    return {
      reselectText: !editing && this.props.editing && this.isSelectingAllText()
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {
      value,
      editing,
      localizer
    } = nextProps;
    let decimal = localizer.decimalCharacter();
    const stringValue = value == null || isNaN(value) ? '' : editing ? ('' + value).replace('.', decimal) : localizer.formatNumber(value
    /*, 'default'*/
    );
    if (prevState.lastValueFromProps !== stringValue) return {
      stringValue,
      lastValueFromProps: stringValue
    };
    return null;
  }

  componentDidUpdate(_, __, {
    reselectText
  }) {
    if (reselectText) findDOMNode(this).select();
  } // this intermediate state is for when one runs into
  // the decimal or are typing the number


  setStringValue(stringValue) {
    this.setState({
      stringValue
    });
  }

  isIntermediateValue(num, str) {
    let {
      localizer,
      min
    } = this.props;
    return !!(num < min || isSign(str) || isAtDelimiter(str, localizer) || isPaddedZeros(str, localizer));
  }

  isSelectingAllText() {
    const node = canUseDOM && findDOMNode(this);
    return canUseDOM && activeElement() === node && node.selectionStart === 0 && node.selectionEnd === node.value.length;
  }

  parseNumber(strVal) {
    let {
      localizer,
      parse: userParse
    } = this.props;
    if (userParse) return userParse(strVal, localizer);
    return localizer.parseNumber(strVal);
  }

  render() {
    let _this$props = this.props,
        {
      disabled,
      readOnly,
      placeholder,
      // eslint-disable-next-line react/prop-types
      innerRef,
      min,
      max
    } = _this$props,
        props = _objectWithoutPropertiesLoose(_this$props, _excluded);

    let value = this.state.stringValue;
    return /*#__PURE__*/React.createElement(Input, _extends({}, props, {
      ref: innerRef,
      inputMode: "numeric",
      className: "rw-widget-input",
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      "aria-valuenow": value
      /*HACK*/
      ,
      "aria-valuemin": isFinite(min) ? min : undefined,
      "aria-valuemax": isFinite(max) ? max : undefined,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: placeholder,
      value: value
    }));
  }

}

NumberPickerInput.defaultProps = {
  value: null,
  editing: false
};
NumberPickerInput.propTypes = {
  value: PropTypes.number,
  editing: PropTypes.bool,
  placeholder: PropTypes.string,
  localizer: PropTypes.object.isRequired,
  parse: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,
  onChange: PropTypes.func.isRequired
};
export default NumberPickerInput;