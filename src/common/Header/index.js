import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import history from 'utils/history'
import { Logo, FixHeader, Button, HeaderAction } from './style'
import authService from 'utils/authService'
import { removeFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import messages from 'constants/messages'
const Header = (props) => {

  const navigateToPage = (type) => {
    if (type === 'login') {
      history.push('/login')
    } else if (type === 'register') {
      history.push('/register')
    }
  }

  const handleSignOutClick = () => {
    const { resetAuthState } = props
    removeFromLocalStorage('token')
    resetAuthState()
    navigateToRespectivePage('/')
    pushNotification(messages.LOGOUT_SUCCESS, 'success', 'TOP_CENTER', 2000)
  }

  const renderHeaderActionButtons = () => {
    if (!authService.isLoggedIn()) {
      return (
        <>
          <Button onClick={() => navigateToPage('register')}>
            SIGN UP
          </Button>
          <Button onClick={() => navigateToPage('login')}>
            SIGN IN
          </Button>
        </>
      )
    } else {
      return (
        <Button onClick={() => handleSignOutClick()}>
          SIGN OUT
        </Button>
      )
    }
  }

  return (
    <Fragment>
      <FixHeader>
        <Logo onClick={() => navigateToRespectivePage('/')}>
          <strong>React Login SignUp Flow</strong>
        </Logo>
        <HeaderAction>
          {renderHeaderActionButtons()}
        </HeaderAction>
      </FixHeader>
    </Fragment>
  )
}

Header.propTypes = {
  // showBackground: PropTypes.bool,
  resetAuthState: PropTypes.func
}

export default Header
