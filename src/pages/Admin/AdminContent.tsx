import React from 'react'
import UserList from '@components/Users/List'
import MaterialList from '@components/Materials/List'
import UserResetPassword from '@components/Users/ResetPassword'
import AddUser from '@components/Users/Add'
import AddMaterial from '@components/Materials/Add'
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
      adminContentDetail = AddUser
      break
    case 'materials':
      willLoadingComponent = MaterialList
      adminContentDetail = AddMaterial
      break
    case 'resetPassword':
      willLoadingComponent = UserResetPassword
      break
    default:
      willLoadingComponent = UserList
      adminContentDetail = AddUser
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