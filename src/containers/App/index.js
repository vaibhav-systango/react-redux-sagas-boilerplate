import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import PrivateRoute from 'utils/privateRoute'
import { interceptor } from 'utils/interceptor'
import HomeContainer from 'containers/Home'
import AuthContainer from 'containers/Auth'
import ForgotPasswordContainer from 'containers/ForgotPassword'

export default function App() {
  interceptor()
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" name="Login" render={(props) => (
          localStorage.getItem('token') ? (<Redirect to={{ pathname: '/' }} />) : (<AuthContainer {...props} />)
        )}
        />
        <Route exact path="/register" name="Register" render={(props) => (
          localStorage.getItem('token') ? (<Redirect to={{ pathname: '/' }} />) : (<AuthContainer {...props} />)
        )}
        />
        <Route exact path="/forgot-password" name="Forgot Password" render={(props) => (
          localStorage.getItem('token') ? (<Redirect to={{ pathname: '/' }} />) : (<ForgotPasswordContainer {...props} />)
        )}
        />
        <Route exact path="/reset-password/:reset_token" name="Reset Password" render={(props) => (
          localStorage.getItem('token') ? (<Redirect to={{ pathname: '/' }} />) : (<ForgotPasswordContainer {...props} />)
        )}
        />
        <Route name="404 Not found" render={(props) => (
          <div>Page Not Found</div>
        )}
        />
      </Switch>
    </Fragment>
  )
}
