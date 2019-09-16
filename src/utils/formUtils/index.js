/* eslint-disable react/prop-types */
/*
 * Collection of form fields
 * With some validations over these fields
*/
import React from 'react'
import { Form, Radio } from 'semantic-ui-react'

const InputBox = ({ type, value, label, width, icon, autoComplete, name, placeholder, onChange, errorMessage, onBlur, maxLength }) => (
  <React.Fragment>
    <Form.Input
      error={errorMessage ? true : false}
      fluid
      label={label || null}
      placeholder={placeholder || ''}
      type={type || 'text'}
      name={name}
      width={width || null}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      value={value}
      maxLength={maxLength}
      autoComplete={autoComplete || 'new-password'}
    />
    {errorMessage &&
      <span>
        {errorMessage}
      </span>}
  </React.Fragment>

)

const InputCheckBox = ({ value, label, name, width, onClick, errorMessage }) => (
  <React.Fragment>
    <Form.Checkbox
      label={label || null}
      error={errorMessage ? true : false}
      checked={value}
      name={name}
      width={width || null}
      onChange={() => onClick()}
    />
    {errorMessage &&
      <span>
        {errorMessage}
      </span>}
  </React.Fragment>
)

const InputRadio = ({ label, name, value, onChange, checked }) => (
  <Form.Field>
    <Radio
      label={label}
      name={name}
      value={value}
      checked={checked}
      onChange={(e, { value }) => onChange(value)}
    />
  </Form.Field>
)

export {
  InputBox,
  InputCheckBox,
  InputRadio
}

