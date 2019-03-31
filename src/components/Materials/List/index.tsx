import React from 'react'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

/**
 * 子路由中套子路由
 * @param param0
 */
export default ({ match }) => {
  return (
    <React.Fragment>
      <div>{`team iD: ${match.params.detail}`}</div>
      <h3><Link to={`${match.url}/guzhongren`}>Show Leader</Link></h3>
      <Switch>
        <Route path={`${match.url}/:name`} component={ShowLeader} />
        {/* <Redirect to={`${match.url}`} /> */}
      </Switch>
    </React.Fragment>
  )
}
const ShowLeader = ({ match }) => (
  <div>Leader Name: {match.params.name}</div>
)