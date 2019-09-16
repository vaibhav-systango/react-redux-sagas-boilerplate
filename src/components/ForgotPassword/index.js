import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import { Grid } from 'semantic-ui-react'
// import textContent from 'constants/staticText'
import ForgotPasswordForm from './forgotPasswordForm'
import ResetPasswordForm from './resetPasswordForm'
import { Helmet } from 'react-helmet'

const ForgotPasswordComponent = (props) => {
  const pathType = props.match.path === '/forgot-password' ? 'forgot' : 'reset'
  console.log(props, 'props in FP')

  const handleForgotPassword = (data) => {
    const { initiateForgotPassword } = props
    initiateForgotPassword(data)
  }

  const handleResetPassword = (data) => {
    const { resetPassword } = props
    resetPassword(data)
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pathType === 'forgot' ?
          'Forgot Password'
          :
          'Reset Password'
        }
        </title>
      </Helmet>
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              {pathType === 'forgot' ?
                <ForgotPasswordForm {...props} handleForgotPassword={handleForgotPassword} />
                :
                <ResetPasswordForm {...props} handleResetPassword={handleResetPassword} />
              }
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>
        </Grid>
      </Layout>
    </React.Fragment>
  )
}

ForgotPasswordComponent.propTypes = {
  match: PropTypes.object,
  forgotPassword: PropTypes.object,
  initiateForgotPassword: PropTypes.func,
  resetPassword: PropTypes.func
}

export default ForgotPasswordComponent
