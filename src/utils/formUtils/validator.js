import _ from 'lodash';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const required = (value) => (value ? undefined : 'Required');

const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

// eslint-disable-next-line no-restricted-globals
const number = (value) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const minValue = (min) => (value) =>
  value && value < min ? `Must be at least ${min}` : undefined;

const maxValue = (max) => (value) =>
  value && value > max ? `Must be at least ${max}` : undefined;

const email = (value) =>
  EMAIL_REGEX.test(value) ? undefined : 'Email is invalid';

const mustMatch = (field) => (value, allValues) => {
  const data = allValues.toJS();
  return !_.isEmpty(data) && data[field] === value
    ? undefined
    : 'Fields Must Match';
};

const errorToFields = (data = {}) => {
  const errors = {};
  if (data) {
    _.forEach(data.errors, (error) => {
      const key = error.source.pointer.replace('/data/attributes/', '');
      const fieldName = _.upperFirst(key.replace('_', ' '));
      errors[key] = `${fieldName} ${error.detail}`;
    });
  }

  return errors;
};

export {
  errorToFields,
  maxValue,
  maxLength,
  minValue,
  number,
  required,
  email,
  mustMatch,
};
