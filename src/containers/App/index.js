import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { interceptor } from 'utils/interceptor';
import HomeContainer from 'containers/Home/homeContainer';

export default function App() {
  interceptor();
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
      </Routes>
    </Fragment>
  );
}
