import * as React from 'react'
import './index.less'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import logo from './img/logo.png'
import Config from '@config/index'
const SubMenu = Menu.SubMenu
import LoginModal from '@components/LoginModal'
import LoginUtils from '@utils/Login'
import { FaSignInAlt, FaSignOutAlt, FaUserCircle, FaCog } from 'react-icons/fa'
interface IState {
  /**
   *  当前tab页
   */
  current?: string,
  /**
   * 用户是否已登录
   */
  isLogin?: boolean,
  /**
   * 登录modal是否可见
   */
  isLoginModalVisible?: boolean
}
export interface IProps {
  empty?: any
  height?: string
  theme?: any
}


export default class NavBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      current: 'home',
      isLoginModalVisible: false,
      isLogin: false
    }
  }
  componentDidMount() {
    const loginStatus = LoginUtils.GetToken()
    this.setState({
      isLogin: loginStatus ? true : false
    })
  }

  handleLogout = () => {
    LoginUtils.DeleteToken().then(() => {
      this.setState({
        isLogin: false
      })
    })
  }
  /**
   * 渲染登录有的用户按钮
   *
   * @memberof NavBar
   */
  renderLoginMenu = () => {
    return (
      <SubMenu className='loginNav' key='13' title={<span><Icon type='mail' /><span>用户中心</span></span>}>
        <Menu.Item key='14'>
          <NavLink to='/admin'>
            <Icon type='home' />
            后台管理
          </NavLink>
        </Menu.Item>
        <Menu.Item key='14'>
          <NavLink to='/' onClick={this.handleLogout}>
            <Icon type='home' />
            退出
          </NavLink>
        </Menu.Item>
      </SubMenu>
    )
  }
  handleLogin = () => {
    this.setState({
      isLoginModalVisible: true
    })
  }
  handleLoginStatus = (isLogin: boolean) => {
    this.setState({
      isLogin,
      isLoginModalVisible: !isLogin
    })
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    })
  }

  renderUserMenu = () => {
    return(
      <SubMenu className='loginNav' key='13' title={<span><FaUserCircle className='icon'/><span>个人中心</span></span>}>
        <Menu.Item key='14'>
          <NavLink to='/admin'>
            <FaCog className='icon' />
              后台管理
              </NavLink>
        </Menu.Item>
        <Menu.Item key='15'>
          <NavLink to='/' onClick={this.handleLogout}>
            <FaSignOutAlt className='icon' />
            退出
          </NavLink>
        </Menu.Item>
      </SubMenu>
    )
  }

  render() {
    const menuStyle = {
      height: this.props.height!,       // 自定义导航栏高度
      lineHeight: this.props.height!    // 确保在自定义高度下导航内容保持在导航条内部上下居中
    }
    const userMenu = this.renderUserMenu()
    return (
      <Menu theme={this.props.theme} style={menuStyle} onClick={this.handleClick} selectedKeys={[this.state.current!]} mode='horizontal'>
        <Menu.Item key='home1'>
          <NavLink to='/'>
            <img className='logo' src={logo} alt={Config.projectName} />
          </NavLink>
        </Menu.Item>
        <Menu.Item key='home'>
          <NavLink to='/'>
            <Icon type='home' />
            主页
            </NavLink>
        </Menu.Item>
        <Menu.Item key='map'>
          <NavLink to='/map'>
            <Icon type='environment' />
            地图
            </NavLink>
        </Menu.Item>
        <Menu.Item key='demo'>
          <NavLink to='/demo'>
            <Icon type='appstore-o' />
            Demo示例
            </NavLink>
        </Menu.Item>
        <Menu.Item key='admin' >
          <NavLink to='/admin'>
            <Icon type='smile-o' />
            Admin
            </NavLink>
        </Menu.Item>
        <Menu.Item key='11'>
          <NavLink to='/test'>
            <Icon type='smile-o' />
            404
            </NavLink>
        </Menu.Item>
        {this.state.isLogin ? userMenu : <Menu.Item key='12' className='loginNav' onClick={this.handleLogin}>
          <FaSignInAlt className='icon'/>
          登录
        </Menu.Item>}
        <LoginModal isVisible={this.state.isLoginModalVisible} onLogin={this.handleLoginStatus} />
      </Menu>
    )
  }
}