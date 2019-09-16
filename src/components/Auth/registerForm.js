import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import textContent from 'constants/staticText'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'

const RegisterForm = (props) => {
  // state manupulation
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setErrors] = useState({})

  // For login form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        email: ['required'],
        password: ['required', 'minLength|4'],
        confirmPassword: ['required', 'match|password']
      },
      {
        email,
        password,
        confirmPassword
      },
      field,
      {
        email: '',
        password: '',
        confirmPassword: ''
      }
    )

    return validate
  }


  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    setErrors({ ...error, [name]: errors[name] })
  }

  // handle sign up
  const handleSignUpClick = () => {
    const { handleRegister } = props
    const { isValid } = _isValid()
    if (isValid) {
      const data = {
        email,
        password
      }
      handleRegister(data)
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }
  const { auth: { isRegistering } } = props
  return (
    <Form>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <InputBox
              errorMessage={error.email}
              label={textContent.EMAIL_FIELD_LABEL}
              placeholder={textContent.EMAIL_FIELD_PLACEHOLDER}
              type={'text'}
              name={'email'}
              onChange={setEmail}
              onBlur={(e) => validateOnBlur(e.target.name)}
              value={email}
              maxLength={30}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <InputBox
              errorMessage={error.password}
              label={textContent.PASSWORD_FIELD_LABEL}
              placeholder={textContent.PASSWORD_FIELD_PLACEHOLDER}
              type={'password'}
              onChange={setPassword}
              name={'password'}
              onBlur={(e) => validateOnBlur(e.target.name)}
              value={password}
              maxLength={30}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <InputBox
              errorMessage={error.confirmPassword}
              label={textContent.CONFIRM_PASSWORD_FIELD_LABEL}
              placeholder={textContent.CONFIRM_PASSWORD_FIELD_PLACEHOLDER}
              type={'password'}
              onChange={setConfirmPassword}
              name={'confirmPassword'}
              onBlur={(e) => validateOnBlur(e.target.name)}
              value={confirmPassword}
              maxLength={30}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button disabled={isRegistering} loading={isRegistering} onClick={handleSignUpClick}>Sign up</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

RegisterForm.propTypes = {
  handleRegister: PropTypes.func,
  auth: PropTypes.object
}

export default RegisterForm
