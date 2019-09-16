import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import textContent from 'constants/staticText'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'

const ResetPasswordForm = (props) => {
  // state manupulation
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setErrors] = useState({})

  // For reset form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        password: ['required', 'minLength|4'],
        confirmPassword: ['required', 'match|password']
      },
      {
        password,
        confirmPassword
      },
      field,
      {
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

  // handle reset password
  const handleSaveClick = () => {
    const { handleResetPassword, match: { params: { reset_token } } } = props
    console.log(props)
    if (reset_token) {
      const { isValid } = _isValid()
      if (isValid) {
        const data = {
          token: reset_token,
          password
        }
        handleResetPassword(data)
      } else {
        const { errors } = _isValid()
        setErrors({ ...errors })
      }
    }
  }
  const { forgotPassword: { resetPasswordLoading } } = props
  return (
    <Form>
      <Grid>
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
              placeholder={textContent.PASSWORD_FIELD_PLACEHOLDER}
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
            <Button disabled={resetPasswordLoading} loading={resetPasswordLoading} onClick={handleSaveClick}>Save</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

ResetPasswordForm.propTypes = {
  handleResetPassword: PropTypes.func,
  forgotPassword: PropTypes.object,
  match: PropTypes.object
}

export default ResetPasswordForm
