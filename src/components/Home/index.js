import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Layout from 'common/Layout';
import { pushNotification } from 'utils/notifications';
import Texts from 'constants/staticText';
import { useFormik } from 'formik';

const Home = (props) => {
  const { getList } = props;
  const formArray = [{
    type: 'text', label: 'First Name', id: 'firstName', name: 'firstName',
  },
  {
    type: 'text', label: 'Last Name', id: 'lastName', name: 'lastName',
  },
  {
    type: 'email', label: 'Email', id: 'email', name: 'email',
  },
  {
    type: 'number', label: 'Age', id: 'GE', name: 'age',
  },
  {
    type: 'number', label: 'Contact', id: 'contact', name: 'contact',
  },
  ];
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      age: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const renderField = (id, name, label, type) => {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <div>
          <input
            id={id}
            name={name}
            type={type}
            onChange={formik.handleChange}
            value={formik.values[name]}
            required
          />
        </div>
      </div>
    );
  };
  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        {formArray.map((data) => {
          return (renderField(data.id, data.name, data.label, data.type));
        })}
        <button type="submit">
          Submit
        </button>
      </form>
      <Button onClick={() => getList()} style={{ marginTop: '250px' }}>
        {Texts.CHECK_API_CALL}
      </Button>
      <Button onClick={() => pushNotification('test', 'success')} style={{ marginTop: '250px' }}>
        {Texts.GET_NOTIFCATION}
      </Button>
    </Layout>
  );
};

Home.propTypes = {
  getList: PropTypes.func,
};
Home.defaultProps = {
  getList: null,
};
export default Home;
