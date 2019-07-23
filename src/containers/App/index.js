import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { interceptor } from 'utils/interceptor'
import HomeContainer from 'containers/Home/homeContainer'

export default function App() {
  interceptor()
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
      </Switch>
    </Fragment>
  )
}
