import * as React from 'react'
import './index.less'
import { Menu, Icon, Modal } from 'antd'
import { NavLink, Redirect } from 'react-router-dom'
import logo from './img/logo.png'
import Config from '@config/index'
import LoginUtils from '@utils/Login'
const SubMenu = Menu.SubMenu

interface IState {
  current?: string,
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
  // style?: any
}


export default class NavBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      current: 'home',
      isLogin: false,
      isLoginModalVisible: false
    }
  }

  componentDidMount() {
    const loginState = LoginUtils.GetLoginState()
    this.setState({
      isLogin: loginState ? true : false
    })
  }
  handleLoginCancel = () => {
    console.log('cancel')
    this.setState({
      isLoginModalVisible: false
    })

  }
  handleLoginOK = () => {
    console.log('ok')
    this.setState({
      isLogin: true,
      isLoginModalVisible: false
    })
  }
  handleLogin = () => {
    this.setState({
      isLoginModalVisible: true
    })
  }
  renderLoginMenu = () => {
    return (
      <SubMenu className='loginNav' key='13' title={<span><Icon type='mail' /><span>用户中心</span></span>}>
        <Menu.Item key='14'><Redirect to='/admin' /></Menu.Item>
      </SubMenu>
    )
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    })
  }
  render() {
    const menuStyle = {
      height: this.props.height!,       // 自定义导航栏高度
      lineHeight: this.props.height!    // 确保在自定义高度下导航内容保持在导航条内部上下居中
    }
    const loginMenu = this.renderLoginMenu()
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
        {this.state.isLogin ? loginMenu : <Menu.Item key='12' className='loginNav' onClick={this.handleLogin}>
          <Icon type='smile-o' />
          登录
        </Menu.Item>}
        <Modal title='用户登录'
          visible={this.state.isLoginModalVisible}
          onOk={this.handleLoginOK}
          onCancel={this.handleLoginCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Menu>
    )
  }
}