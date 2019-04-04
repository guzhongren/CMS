import React from 'react'
import UserList from '@components/Users/List'
import MaterialList from '@components/Materials/List'
import UserResetPassword from '@components/Users/ResetPassword'
import UserDetail from '@components/Users/Detail'
import MaterialDetail from '@components/Materials/Detail'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

const AdminContent = ({ match }) => {
  let willLoadingComponent: any
  let adminContentDetail: any
  switch (match.params.type) {
    case 'users':
      willLoadingComponent = UserList
      adminContentDetail = UserDetail
      break
    case 'materials':
      willLoadingComponent = MaterialList
      adminContentDetail = MaterialDetail
      break
    case 'resetPassword':
      willLoadingComponent = UserResetPassword
      break
    default:
      willLoadingComponent = UserList
      adminContentDetail = UserDetail
      break
  }
  return (
    <Switch>
      <Route exact path={`${match.url}/add`} component={adminContentDetail} />
      <Route exact path={`${match.url}`} component={willLoadingComponent} />
      <Redirect to={`${match.url}`} />
    </Switch>
  )
}

export default AdminContent