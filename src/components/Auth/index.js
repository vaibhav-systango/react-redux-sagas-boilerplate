import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import { Grid } from 'semantic-ui-react'
import textContent from 'constants/staticText'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import { Helmet } from 'react-helmet'

const AuthComponent = (props) => {
  const pathType = props.match.path === '/login' ? 'login' : 'register'
  console.log(props, 'props in login')
  const handleSignIn = (data) => {
    const { login } = props
    login(data)
  }

  const handleRegister = (data) => {
    const { signup } = props
    signup(data)
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pathType === 'login' ?
          'Login'
          :
          'SignUp'
        }
        </title>
      </Helmet>
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <p>
                {pathType === 'login' ?
                  textContent.LOGIN_TITLE
                  :
                  textContent.REGISTER_TITLE
                }
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <h2>
                {pathType === 'login' ?
                  textContent.LOGIN_HEADING
                  :
                  textContent.REGISTER_HEADING
                }
              </h2>
              <p>
                {pathType === 'login' ?
                  textContent.LOGIN_SUB_HEADING
                  :
                  textContent.REGISTER_SUB_HEADING
                }
              </p>
            </Grid.Column>
            <Grid.Column width={8}>
              {pathType === 'login' ?
                <LoginForm {...props} handleSignIn={handleSignIn} />
                :
                <RegisterForm {...props} handleRegister={handleRegister} />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    </React.Fragment>
  )
}

AuthComponent.propTypes = {
  match: PropTypes.object,
  login: PropTypes.func,
  signup: PropTypes.func
}

export default AuthComponent
