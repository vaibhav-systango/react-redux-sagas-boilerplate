import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import Layout from 'containers/Layout'
// import Texts from 'constants/staticText'

const Home = (props) => {

  return (
    <Layout>
      <Container>
      Hello
      </Container>
    </Layout>
  )
}

Home.propTypes = {
  home: PropTypes.object
}

export default Home
