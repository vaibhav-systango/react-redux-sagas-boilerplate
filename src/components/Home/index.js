import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

import Layout from 'common/Layout';
import { pushNotification } from 'utils/notifications';
import Texts from 'constants/staticText';

import { getList } from 'actions/Auth';

const Home = (props) => {
  const dispatch = useDispatch();

  // use redux store state like mentioned below.
  // const authState = useSelector((state) => state.auth);

  return (
    <Layout>
      <Button
        onClick={() => dispatch(getList())}
        style={{ marginTop: '250px' }}
      >
        {Texts.CHECK_API_CALL}
      </Button>
      <Button
        onClick={() => pushNotification('test', 'success')}
        style={{ marginTop: '250px' }}
      >
        {Texts.GET_NOTIFCATION}
      </Button>
    </Layout>
  );
};

Home.propTypes = {
  getList: PropTypes.func,
};

export default Home;
