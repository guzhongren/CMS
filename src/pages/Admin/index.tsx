import * as React from 'react'
import './index.less'
import { AdminHeader, Footer } from '@layouts/index'
import { Icon, Layout, Menu } from 'antd'
const { Sider, Content } = Layout
const SubMenu = Menu.SubMenu
import logo from './img/logo.png'
import AdminContent from './AdminContent'
import Statistic from './System'
import LoginUtils from '@utils/Login'
import {
  NavLink,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const Admin = ({ match }) => {
  const currentUser = LoginUtils.GetUserInfo()
  const isAdmin = currentUser.role === 'admin'
  return (
    <Layout>
      <Sider className={'layout-sider'} theme='dark' width='256px'>
        <NavLink to='/admin' className={'logoContainer'}>
          <img className='logo' src={logo} />
        </NavLink>
        <Menu theme='dark' defaultSelectedKeys={[match.url]} mode='inline'>
          <SubMenu
            key='sub1'
            title={<span><Icon type='users' /><span>成员</span></span>}
          >
            <Menu.Item key='all'><Link to={`${match.url}/users`}>所有成员</Link ></Menu.Item>
            {isAdmin && <Menu.Item key='add'><Link to={`${match.url}/users/add`}>新增成员</Link ></Menu.Item>}
            <Menu.Item key='resetPassword'><Link to={`${match.url}/resetPassword`}>修改密码</Link ></Menu.Item>
          </SubMenu>
          <SubMenu
            key='sub2'
            title={<span><Icon type='materials' /><span>物料</span></span>}
          >
            <Menu.Item key='team1'><Link to={`${match.url}/materials`}>所有物料</Link></Menu.Item>
            <Menu.Item key='team2'><Link to={`${match.url}/materials/add`}>新增物料</Link></Menu.Item>
          </SubMenu>
          {/* <Menu.Item key='9'>
            <Icon type='file' />
            <span>其他信息</span>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <AdminHeader />
        <Content>
          <Switch>
            <Route path={`${match.url}/:type`} component={AdminContent} />
            <Route exact path={`${match.url}`} component={Index} />
            <Redirect to={`${match.url}`} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}
const Index = () => (
  <Statistic />
)

export default Admin