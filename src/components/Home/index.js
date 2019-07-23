import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Layout from 'common/Layout'
import { pushNotification } from 'utils/notifications'
import Texts from 'constants/staticText'

const Home = (props) => {
  const { getList } = props
  return (
    <Layout>
      <Button onClick={() => getList()} style={{ marginTop: '250px' }}>
        {Texts.CHECK_API_CALL}
      </Button>
      <Button onClick={() => pushNotification('test', 'success')} style={{ marginTop: '250px' }}>
        {Texts.GET_NOTIFCATION}
      </Button>
    </Layout>
  )
}

Home.propTypes = {
  getList: PropTypes.func
}

export default Home
