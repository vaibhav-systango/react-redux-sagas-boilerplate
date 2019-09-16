import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Footer from '../Footer'
import { MainContent } from './style'

const Layout = (props) => {
  const [isScrolled, setScroll] = useState(window.scrollY > 30)
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    const Y = window.scrollY
    setScroll(Y > 30)
  }

  const { resetAuthState } = props

  return (
    <Fragment>
      <Header class="pt-10" showBackground={isScrolled} resetAuthState={resetAuthState} />
      <MainContent>
        {props.children}
      </MainContent>
      <Footer />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
  resetAuthState: PropTypes.func
}

export default Layout
