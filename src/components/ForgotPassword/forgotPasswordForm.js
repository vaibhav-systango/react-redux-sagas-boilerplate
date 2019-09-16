import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import textContent from 'constants/staticText'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'

const ForgotPasswordForm = (props) => {

  // state manupulation
  const [email, setEmail] = useState('')
  const [error, setErrors] = useState({})


  // For forgot password form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        email: ['required']
      },
      {
        email: email
      },
      field,
      {
        email: ''
      }
    )

    return validate
  }


  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    setErrors({ ...error, [name]: errors[name] })
  }

  const handleLoginClick = () => {
    const { history } = props
    history.push('/login')
  }

  const handleSubmitClick = () => {
    const { handleForgotPassword } = props
    const { isValid } = _isValid()
    if (isValid) {
      handleForgotPassword(email)
    }
  }

  const { forgotPassword: { forgotPasswordLoading } } = props
  console.log(props)
  return (
    <Form autoComplete="off">
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
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button disabled={forgotPasswordLoading} loading={forgotPasswordLoading} onClick={handleSubmitClick}>Submit</Button>
          </Grid.Column>
          <Grid.Column>
            <Button disabled={forgotPasswordLoading} onClick={handleLoginClick}>Login</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

ForgotPasswordForm.propTypes = {
  history: PropTypes.object,
  handleForgotPassword: PropTypes.func,
  forgotPassword: PropTypes.object
}

export default ForgotPasswordForm
