import React, { Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from '@pages/NoMatch'
import Loading from '@components/Loading'
// import { Login } from '@api/LogAction'
import DynamicImport from '@components/DynamicImport'
const Pages = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={Index} />
            <Route path='/map' component={Map} />
            <Route path='/admin' component={Admin} />
            <Route path='/login' component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </React.Fragment>
      </Suspense>
    </Router>
  )
}

export default Pages

const Index = (props) => {
  return <DynamicImport load={() => import(`@pages/Index/index`)}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
}
const Admin = (props) => {
  return <DynamicImport load={() => import(`@pages/Admin/index`)}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
}
const Map = (props) => {
  return <DynamicImport load={() => import(`@pages/Map/index`)}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
}
const Login = (props) => {
  return <DynamicImport load={() => import(`@pages/Login/index`)}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
}