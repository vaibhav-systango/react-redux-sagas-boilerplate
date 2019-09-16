import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import textContent from 'constants/staticText'
import { InputBox, InputCheckBox } from 'utils/formUtils'
import { setInLocalStorage, removeFromLocalStorage, retrieveFromLocalStorage } from 'utils/helpers'
import Validator from 'utils/validator'

const LoginForm = (props) => {

  // state manupulation
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRemember] = useState(false)
  const [error, setErrors] = useState({})

  useEffect(() => {
    const userData = retrieveFromLocalStorage('remember')
    if (userData) {
      const user = JSON.parse(userData)
      if (user.rememberMe) {
        setEmail(user.email)
        setPassword(user.password)
        setRemember(true)
      }
    }
  }, [])

  // For login form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        email: ['required'],
        password: ['required', 'minLength|4']
      },
      {
        email: email,
        password: password
      },
      field,
      {
        email: '',
        password: ''
      }
    )

    return validate
  }


  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    setErrors({ ...error, [name]: errors[name] })
  }

  const handleSignUpClick = () => {
    const { history } = props
    history.push('/register')
  }

  const handleSignInClick = () => {
    const { handleSignIn } = props
    const { isValid } = _isValid()
    if (isValid) {
      if (rememberMe) {
        const data = {
          email,
          password,
          rememberMe
        }
        setInLocalStorage('remember', JSON.stringify(data))
      } else {
        removeFromLocalStorage('remember')
      }
      const data = {
        email,
        password
      }
      handleSignIn(data)
    }
  }

  const { auth: { isLoggingIn } } = props
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
        <Grid.Row columns={2}>
          <Grid.Column>
            <InputCheckBox
              label={'Remember Me'}
              value={rememberMe}
              name={'remember'}
              onClick={() => setRemember(!rememberMe)}
            />
          </Grid.Column>
          <Grid.Column>
            <a href="/forgot-password">Forgot Password?</a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button disabled={isLoggingIn} loading={isLoggingIn} onClick={handleSignInClick}>Sign In</Button>
          </Grid.Column>
          <Grid.Column>
            <Button disabled={isLoggingIn} onClick={handleSignUpClick}>Sign Up</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

LoginForm.propTypes = {
  history: PropTypes.object,
  handleSignIn: PropTypes.func,
  auth: PropTypes.object
}

export default LoginForm
